import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/requestcreate">Create</Link></li>
        <li><Link to="/requests/:requestId">Requests</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>

      </ul>
    </nav>
  );
};

export default NavBar;