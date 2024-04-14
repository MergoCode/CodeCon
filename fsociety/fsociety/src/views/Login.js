import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { login, password });
      console.log(response.data);
      if (response.status === 200) {
        navigate('/');
      } else {
        console.log('Failed to login:', response.data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='backgr'>
      <div className="login-container">
        <h2>Вхід</h2>
        <br></br>
        <form onSubmit={handleSubmit} class="login-form">
          <div className="form-group">
            <input type="text" id="user-login" name="user-login" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Ім'я користувача" required/>
          </div>
          <div className="form-group">
            <input type="password" id="user-password" name="user-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" required/>
          </div>
          <div className="checkbox">
            <label className="checkbox">
              <input type="checkbox" name="remember"/>

            </label>
          </div>

          <br></br>
          <button type="submit" className="btn">Вхід</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
