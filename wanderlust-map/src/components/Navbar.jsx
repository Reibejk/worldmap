// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ user, onLogout, onToggleList, isMobileMenuOpen, onToggleMobileMenu }) => {

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        WanderlustMap
      </div>

      {/* --- DESKTOP MENU --- */}
      <div className="navbar-menu desktop">
        <button className="menu-button" onClick={onToggleList}>My Trips</button>
      </div>
      <div className="navbar-user desktop">
        <span>{user.email}</span>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>

      {/* --- HAMBURGER ICON (Mobile Only) --- */}
      <div className="hamburger-icon" onClick={onToggleMobileMenu}>
        &#9776; {/* This is the hamburger character */}
      </div>

      {/* --- MOBILE MENU (Dropdown) --- */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-user-info">
            Signed in as: {user.email}
          </div>
          <button className="menu-button" onClick={() => { onToggleList(); onToggleMobileMenu(); }}>
            My Trips
          </button>
          <button onClick={() => { onLogout(); onToggleMobileMenu(); }} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;