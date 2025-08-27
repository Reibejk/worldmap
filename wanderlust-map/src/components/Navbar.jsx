// src/components/Navbar.jsx
import React from 'react';

// Props will be functions and data passed from the App component
const Navbar = ({ user, onLogout, onToggleList }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        WanderlustMap
      </div>
      <div className="navbar-menu">
        <button className="menu-button" onClick={onToggleList}>
          My Trips
        </button>
        {/* Add more buttons for future features here */}
      </div>
      <div className="navbar-user">
        <span>{user.email}</span>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;