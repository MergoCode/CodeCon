from flask import Flask, request, jsonify, session, flash, redirect, url_for, render_template
from werkzeug.security import check_password_hash, generate_password_hash
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_sqlalchemy import SQLAlchemy
from flask import send_from_directory

app = Flask(__name__, static_folder='fsociety')
app.secret_key = '55a5bac6d1b643319b4845244bebdb7c'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/varta'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    passw = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.login

class Request(db.Model):
    __tablename__ = 'requests'
    category = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000))
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(100), unique=True, nullable=False)
    moderated = db.Column(db.Boolean, default=False)
    authorname = db.Column(db.String(50), nullable=False)
    def __repr__(self):
        return '<Request %r>' % self.title

class RequestModelView(ModelView):
    column_editable_list = ['moderated']  # Дозволяє редагувати поле 'moderated'

admin = Admin(app)
admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(Request, db.session))

@app.route('/')
def users_page():
    text = 'heheheha'
    return render_template('users.html', text=text)

@app.route('/fsociety/fsociety/<path:path>')
def serve_react(path):
    return send_from_directory('../fsociety/fsociety/', path)

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    confirm_password = request.json.get('confirm_password')
    print(username, email, password, confirm_password)
    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    existing_user = User.query.filter((User.login == username) | (User.email == email)).first()
    if existing_user:
        flash('User with that login or email already exists', 'error')
        return jsonify({"message": 'User already exists'}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(login=username, email=email, passw=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    flash('Registration successful!', 'success')
    return jsonify({"message": 'Registration successful'}), 201

@app.route('/login', methods=['POST'])
def login():
    login = request.json.get('login')
    password = request.json.get('password')

    user = User.query.filter_by(login=login).first()
    if user and check_password_hash(user.passw, password):
        session['user_id'] = user.id
        session['logged_in'] = True
        flash('Login successful!', 'success')
        return jsonify({"message": 'Login successful'}), 200
    else:
        flash('Invalid username or password', 'error')
        return jsonify({"message": "Invalid username or password"}), 401

@app.route('/dashboard', methods=['GET'])
def dashboard():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        return render_template('dashboard.html', user=user)
    else:
        return "You need to login first"

@app.route('/logout', methods=['GET', 'POST'])
def logout_user():
    session.pop('user_id', None)
    session.pop('logged_in', None)
    flash('Logged out successfully', 'success')
    return redirect(url_for('users_page'))


@app.route('/request-list', methods=['GET', 'POST'])
def request_list():
    if request.method == 'GET':
        requests = Request.query.filter(Request.moderated == True).all()
        requests_support_list = [
            {'category': req.category, 'description': req.description, 'title': req.title, 'moderated': req.moderated}
            for req in requests]
        print(requests_support_list)
        return jsonify(requests_support_list)
    elif request.method == 'POST':
        request_data = request.json
        request_title = request_data.get('title')
        request_description = request_data.get('description')
        request_category = request_data.get('category')

        existing_request = Request.query.filter_by(title=request_title).first()
        if existing_request:
            return jsonify({"error": "Request with that title already exists"}), 409
        else:
            new_request = Request(title=request_title, description=request_description, category=request_category)
            db.session.add(new_request)
            db.session.commit()
            return jsonify({"message": "Request added successfully"}), 201




@app.route('/request-id<int:request_id>')
def request_page(request_id):
    request_item = Request.query.get(request_id)
    return render_template('request-id.html', request_item=request_item)

@app.route('/create-request', methods=['GET', 'POST'])
def create_request():
    user_logged = session['logged_in']
    if user_logged:
        request_title = request.json.get('title')
        request_description = request.json.get('description')
        request_category = request.json.get('category')
        request_authorname_id = session['user_id']
        request_authorname = User.query.filter(User.id == request_authorname_id).first()
        print(request_title, request_description, request_category, request_authorname)
        existing_request = Request.query.filter_by(title=request_title).first()
        if existing_request:
            return jsonify({"error": "Request with that title already exists"}), 409
        else:
            new_request = Request(title=request_title, description=request_description, category=request_category, authorname=request_authorname)  # Замініть "John Doe" на ім'я користувача, якщо ви маєте інформацію про користувача
            db.session.add(new_request)
            db.session.commit()
            return jsonify({"message": "Request added successfully"}), 201
    else:
        return jsonify({"error": "You are not logged in!"}), 500

@app.route('/profile-page', methods=['GET'])
def profile_page():
    if 'user_id' in session:
        user_id = session['user_id']
        user = User.query.filter_by(id=user_id).first()
        if user:
            return render_template('Profile-page.html', user=user)
        else:
            return "User not found"
    else:
        return redirect(url_for('users_page'))

@app.route('/change-pass', methods=['POST'])
def change_pass():
    data = request.json
    current_password = data.get('currentPassword')
    new_password = data.get('newPassword')
    user_id = session.get('user_id')

    user = User.query.get(user_id)

    if user:
        if check_password_hash(user.passw, current_password):
            user.passw = generate_password_hash(new_password)
            db.session.commit()
            return jsonify({"message": "Password updated successfully"}), 200
        else:
            return jsonify({"error": "Incorrect current password"}), 401
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/request-details-data/<int:request_id>', methods=['GET'])
def request_details_data(request_id):
    request_item = Request.query.get(request_id)
    if request_item:
        return jsonify({
            'title': request_item.title,
            'category': request_item.category,
            'description': request_item.description,
            'authorname': request_item.authorname
        })
    else:
        return jsonify({'error': 'Request not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
