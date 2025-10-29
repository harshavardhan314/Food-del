import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";
const Navbar = ({ setLogin }) => {
  const navigate = useNavigate();
  const { getTotalCartItems, signin, setSignin, setToken } =
    useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Smooth scroll for homepage sections
  const scrollToSection = (targetId) => {
    navigate("/"); // navigate to home first
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setSignin(false);
     toast.success("Logout Successful");
    navigate("/");
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      {/* Navigation Links */}
      <ul className={`nav-items ${isMenuOpen ? "show-menu" : ""}`}>
        <li onClick={() => scrollToSection("top")}>Home</li>
        <li onClick={() => scrollToSection("menu")}>Menu</li>
        <li onClick={() => scrollToSection("contact")}>Contact Us</li>
        <li onClick={() => scrollToSection("mobile-app")}>Mobile App</li>
      </ul>

      {/* Right-side section */}
      <div className="nav-right">
        {/* Search bar */}
        <div className="main-search">
          <input type="text" placeholder="Search for restaurant..." />
        </div>

        {/* Cart icon */}
        <div className="cart-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" className="nav-icon" />
          </Link>
          {getTotalCartItems() > 0 && (
            <div className="dot">{getTotalCartItems()}</div>
          )}
        </div>

        {/* Profile / Sign in */}
        {signin ? (
          <div className="profile-container">
            <img
              src={assets.profile_icon}
              alt="user"
              className="nav-icon user-icon"
              onClick={() => setShowProfileMenu((prev) => !prev)}
            />

            {/* Profile dropdown */}
            {showProfileMenu && (
              <div className="profile-dropdown">
                {/* ✅ Navigate to /orders (matches App.jsx route) */}
                <p
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/orders");
                  }}
                >
                  My Orders
                </p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <button className="sign-in" onClick={() => setLogin(true)}>
            Sign in
          </button>
        )}

        {/* Mobile menu toggle */}
        <div
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen((p) => !p)}
        >
          {isMenuOpen ? (
            // Close icon
            <svg
              viewBox="0 0 24 24"
              width="30"
              height="30"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            // Hamburger menu icon
            <svg
              viewBox="0 0 24 24"
              width="30"
              height="30"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
