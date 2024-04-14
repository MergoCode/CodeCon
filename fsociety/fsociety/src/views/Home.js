import React, { useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

  const [formData, setFormData] = useState({
    name: '',
    helpType: ''
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Заявка успішно відправлена. ID заявки: ' + result.id);
     
        setFormData({ name: '', helpType: '' });
      } else {
      
        alert('Помилка при відправленні заявки: ' + response.statusText);
      }
    } catch (error) {
     
      alert('Помилка мережі при відправленні заявки: ' + error);
    }
  };


  return (
    <div>
         <div className="home-container">
            <div className='container-q'>
            <div className="support-ukraine-section">
        <div className="hashtag-button">
          <button className="stop-war-button">#StopWar</button>
          <button className="donate-button">Donate</button>
        </div>
        <h1 className="support-ukraine-title">SUPPORT</h1>
        <h1 className="support-ukraine-title">FOR </h1>
        <h1 className="support-ukraine-title">UKRAINE</h1>
        
        <div className="icons-container">
      <h1 className="home-title">Вітаємо на нашій сторінці</h1>
    
      <h1>Платформа Допомоги</h1>
      <p>Ласкаво просимо до платформи, що забезпечує допомогу постраждалим від війни.</p>
      <p>Тут ви можете знайти ресурси, отримати консультації та підтримку.</p>
      <p className="home-subtitle">Знайдіть необхідну інформацію та ресурси тут</p>
      <nav className='NavHome'>
    <form action="/register">
      <Link to="/signup" className="start-button"><button>Почати</button></Link>
  </form>
     </nav>
     
      </div> 
    </div>
    </div>
    </div>
    </div>
  );
};

export default Home;
