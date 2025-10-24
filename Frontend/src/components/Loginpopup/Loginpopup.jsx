import React, { useState, useContext } from "react";
import "./Loginpopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const Loginpopup = ({ setLogin }) => {
  const { login: contextLogin } = useContext(StoreContext);
  const [currstate, setCurrstate] = useState("Signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url =
        currstate === "Signup"
          ? "http://localhost:5000/api/user/create-user"
          : "http://localhost:5000/api/user/login-user";

      const payload =
        currstate === "Signup"
          ? { name, email, password }
          : { email, password };

      const response = await axios.post(url, payload);

      if (response.data.success) {
        // ✅ use backend’s user object
        const userData = response.data.user;

        // ✅ update global auth state and localStorage
        contextLogin(userData);

        alert(response.data.message);

        // ✅ close popup
        setLogin(false);
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit}>
        <div className="popup-content">
          <h2 className="curr-state">{currstate}</h2>
          <img
            src={assets.cross_icon}
            alt="close"
            onClick={() => setLogin(false)}
          />
        </div>

        <div className="sign-up-content">
          {currstate === "Login" ? null : (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="create-acc-btn">
            <button type="submit" disabled={loading}>
              {loading
                ? "Processing..."
                : currstate === "Signup"
                ? "Create Account"
                : "Login"}
            </button>
          </div>
        </div>

        <div className="check-box">
          <input type="checkbox" />
          <span>
            By continuing, I agree to Terms of Use & Privacy Policy.
          </span>
        </div>

        {currstate === "Signup" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrstate("Login")}>Login here</span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrstate("Signup")}>Click here</span>
          </p>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Loginpopup;
