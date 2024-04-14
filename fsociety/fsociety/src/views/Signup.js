import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Signup.css'

const Signup = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/register', signupData);
      console.log(response.data);
      // Додаткова обробка успішної реєстрації
    } catch (error) {
      console.error('Error registering:', error);
      // Обробка помилки реєстрації
    }
  };

  return (
    <div className='backgr'>
      <div className="login-container">
        <h2>Реєстрація</h2>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="username" placeholder="Ім'я користувача" required onChange={handleInputChange}/>
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Е-пошта" required onChange={handleInputChange}/>
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Пароль" required onChange={handleInputChange}/>
          </div>
          <div className="form-group">
            <input type="password" name="confirm_password" placeholder="Підтвердіть пароль" required onChange={handleInputChange}/>
          </div>
          <br></br>
          <button type="submit" className="btn">Зареєструватись</button>
        </form>
        <button><Link to="/login">Увійти</Link></button>
      </div>
    </div>
  );
};

export default Signup;
