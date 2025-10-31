import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import Login from '../Login/Login';

const Navbar = () => {
  // State to control showing the Login popup
  const [showLogin, setShowLogin] = useState(false);

  // Function to open the popup
  const openPopup = () => setShowLogin(true);

  // Function to close the popup
  const closePopup = () => setShowLogin(false);

  return (
    <div className="Navbar">
      <img src={assets.logo} alt="Logo" className="logo" />

      <div className="navbar-right">
        <button className="login-btn" onClick={openPopup}>
          Login
        </button>
      </div>

      {/* Render Login popup when showLogin is true */}
      {showLogin && <Login closePopup={closePopup} />}
    </div>
  );
};

export default Navbar;
