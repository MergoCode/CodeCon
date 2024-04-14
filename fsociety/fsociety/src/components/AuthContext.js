import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
  currentUser: null,
  updateProfile: () => {},
  updatePassword: () => {},
  updateProfilePicture: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const updateProfile = async (updatedUserData) => {
   
    console.log('Updating profile with data:', updatedUserData);
  };

  const updatePassword = async (currentPassword, newPassword) => {
  
    console.log('Updating password...');
  };

  const updateProfilePicture = async (imageFile) => {
    
    console.log('Updating profile picture...');
  };

  return (
    <AuthContext.Provider value={{ currentUser, updateProfile, updatePassword, updateProfilePicture }}>
      {children}
    </AuthContext.Provider>
  );
};
