import React, { useState } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
  
  });

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();
  
    alert('Профіль оновлено!');
  };

  return (
    <div>
      <h1>Профіль Користувача</h1>
      <form onSubmit={handleProfileSubmit}>
        <div>
          <label htmlFor="fullName">Повне Ім'я:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={profileData.fullName}
            onChange={handleProfileChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Телефон:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={profileData.phone}
            onChange={handleProfileChange}
            required
          />
        </div>
        <button type="submit">Оновити Профіль</button>
      </form>
    </div>
  );
};

export default Profile;
