import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import Login from "../Login/Login";
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
  const { showLogin, setShowLogin } = useContext(StoreContext);
  const {islogin,setIslogin}=useContext(StoreContext);
  return (
    <div className="Navbar">
      <img src={assets.logo} alt="Logo" className="logo" />

      <div className="navbar-right">
        <button
          className="login-btn"
          onClick={() => setShowLogin((prev) => !prev)} // toggle popup
        >
          {islogin ? "Logout" : "Login"}
        </button>
      </div>

      {/* Login Popup */}
      {showLogin && <Login />}
    </div>
  );
};

export default Navbar;
