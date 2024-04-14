import React from 'react';
import { Link } from 'react-router-dom';  // Add this line to import Link
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-background">
    <div className="dashboard-container">
      <h2 className="dashboard-header">Панель Керування</h2>
      <p>Тут ви можете управляти вашими запитами на допомогу, відстежувати статус заявок та управляти профілем.</p>
      
      <div className="dashboard-cards">
        <div className="card">
          <h3>Manage Requests</h3>
          <p>Review and update your pending and past support requests.</p>
          <button onClick={() => { /* logic to navigate or open requests */ }}>View Requests</button>
        </div>
        <div className="card">
          <h3>Track Status</h3>
          <p>Check the status of your current support activities.</p>
          <button onClick={() => { /* logic to navigate or track status */ }}>Track Status</button>
        </div>
        <div className="card">
          <h3>Profile Settings</h3>
          <p>Update your profile settings and preferences.</p>
          <Link to="/profile"><button>Edit Profile</button></Link> {/* Correct the path if necessary */}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
