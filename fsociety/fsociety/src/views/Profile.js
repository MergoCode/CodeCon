import React, { useState, useEffect, createContext, useContext } from 'react';
import { useAuth } from '../components/AuthContext';
import '../components/Profile.css';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../utils/Notification'; // Assuming a Notification component is implemented
import { validateEmail, validatePassword } from '../utils/validation'; // Placeholder for validation functions
import axios from 'axios';


const Profile = () => {
  const { currentUser, updateProfile, updatePassword, updateProfilePicture, removeProfilePicture, logout } = useAuth();
  const [userData, setUserData] = useState({ displayName: '', email: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', passwordStrength: null });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const AuthContext = createContext();
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    // Initialize the form with current user data
    if (currentUser) {
      setUserData({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
      });
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData(prev => ({ ...prev, [name]: value }));

    if (name === 'email' && value && !validateEmail(value)) {
      setNotification({ message: 'Invalid email format', type: 'error' });
    } else {
      setNotification({ message: '', type: '' });
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
      passwordStrength: name === 'newPassword' ? validatePassword(value) : prev.passwordStrength
    }));
  };

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleUpdate = async (data, updateFunc, clearFields = {}) => {
    try {
      await updateFunc(data);
      setNotification({ message: 'Update successful!', type: 'success' });
      if (clearFields) {
        setPasswordData(clearFields);
      }
    } catch (error) {
      setNotification({ message: `Update failed: ${error.message}`, type: 'error' });
    }
  };



 const handleLogout = async () => {
  try {
    await axios.post('/logout'); // Викликати маршрут /logout на бекенді
    navigate('/login'); // Перенаправлення на головну сторінку
  } catch (error) {
    setNotification({ message: `Logout failed: ${error.message}`, type: 'error' });
  }
};

  const confirmAndExecute = async (action, message) => {
    if (window.confirm('Are you sure you want to perform this action?')) {
      try {
        await action();
        setNotification({ message, type: 'success' });
      } catch (error) {
        setNotification({ message: `Action failed: ${error.message}`, type: 'error' });
      }
    }
  };

  return (
    <div className="profile-container">
      <Notification message={notification.message} type={notification.type} />
      <div className="profile-card">
        <h2 className="profile-header">Profile Settings</h2>
        {currentUser?.photoURL && (
          <div className="profile-picture-section">
            <img src={currentUser.photoURL} alt="Profile" className="profile-picture" />
            <div className="picture-buttons">
              <label htmlFor="profilePictureUpload" className="upload-button">
                Upload New Photo
                <input type="file" id="profilePictureUpload" name="profilePicture" onChange={handleFileChange} style={{ display: 'none' }} />
              </label>
              <button onClick={() => confirmAndExecute(() => removeProfilePicture(), 'Profile picture removed successfully.')}>
                Remove
              </button>
            </div>
          </div>
        )}
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(userData, updateProfile); }} className="profile-form">
          <div className="form-group">
            <label htmlFor="displayName">Display Name:</label>
            <input type="text" id="displayName" name="displayName" value={userData.displayName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} />
          </div>
          <button type="submit" className="profile-form-button">Update Profile</button>
        </form>
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate({ ...passwordData }, () => updatePassword(passwordData.currentPassword, passwordData.newPassword), { currentPassword: '', newPassword: '', passwordStrength: null }); }} className="profile-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password:</label>
            <input type="password" id="currentPassword" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required />
            {passwordData.passwordStrength && <div className="password-strength">Strength: {passwordData.passwordStrength}</div>}
          </div>
          <button type="submit" className="profile-form-button">Change Password</button>
        </form>
        <button onClick={handleLogout} className="logout-button">Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
