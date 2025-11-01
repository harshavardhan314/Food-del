import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import Login from "../Login/Login";
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
  const { showLogin, setShowLogin, isLogin, setIsLogin } = useContext(StoreContext);

  const handleButtonClick = () => {
    if (isLogin) {
      // Logout flow
      setIsLogin(false);
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");
      alert("Logged out successfully");
    } else {
      // Open login popup
      setShowLogin(true);
    }
  };

  return (
    <>
      <div className="Navbar">
        <div className="navbar-left">
          <img src={assets.logo} alt="Logo" className="logo" />
        </div>

        <div className="navbar-right">
          <button className="login-btn" onClick={handleButtonClick}>
            {isLogin ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* Popup login form */}
      {showLogin && <Login />}

      {/* Welcome message */}
      {isLogin && (
        <div className="login-title">
          <h2 className="admin">Welcome Admin</h2>
        </div>
      )}
    </>
  );
};

export default Navbar;
