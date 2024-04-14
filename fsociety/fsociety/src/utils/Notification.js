import React from 'react';

export const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const style = {
    color: type === 'error' ? 'red' : 'green',
    position: 'fixed',
    top: 20,
    right: 20,
    zIndex: 1000,
    border: '1px solid',
    borderColor: type === 'error' ? 'red' : 'green',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
  };

  return (
    <div style={style}>
      {message}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
