import React, { useState } from "react";
import "./Loginpopup.css";
import { assets } from "../../assets/assets";
import axios from "axios"; // Make sure axios is installed

const Loginpopup = ({ setLogin }) => {
  const [currstate, setCurrstate] = useState("Signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission
    setError("");
    setLoading(true);

    try {
      const payload = { email, password };
      if (currstate === "Signup") payload.name = name;

      // Call your backend API
      const response = await axios.post(
        "http://localhost:5000/api/user/create-user",
        payload
      );

      console.log("User created:", response.data);
      alert("Account created successfully!");

      // Close the popup
      setLogin(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
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
            alt=""
            onClick={() => {
              setLogin(false);
            }}
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
              {loading ? "Processing..." : "Create account"}
            </button>
          </div>
        </div>

        <div className="check-box">
          <input type="checkbox" />
          <span> By continuing, I agree to Terms of Use & Privacy Policy.</span>
        </div>

        {currstate === "Signup" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setCurrstate("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account ?{" "}
            <span onClick={() => setCurrstate("Signup")}>Click here</span>{" "}
          </p>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Loginpopup;
