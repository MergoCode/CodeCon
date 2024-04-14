export const validateEmail = (email) => {
    // Simple regex for demonstration; adjust as necessary for more strict validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  export const validatePassword = (password) => {
    // Example: Validate password length
    return password.length >= 8;
  };
  