import React, { useContext, useState } from "react";
import "./Login.css";
import { StoreContext } from "../../context/StoreContext";

const Login = () => {
  const { setShowLogin, setIsLogin, setToken } = useContext(StoreContext);
  const [data, setData] = useState({ email: "", password: "" });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", data);

    // ✅ Mock login success
    localStorage.setItem("adminToken", "dummy-token");
    localStorage.setItem("admin", "true");

    setToken("dummy-token");
    setIsLogin(true);
    setShowLogin(false);
    alert("Login successful!");
  };

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <button className="close-btn" onClick={() => setShowLogin(false)}>
          ✖
        </button>

        <h2>Login</h2>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
