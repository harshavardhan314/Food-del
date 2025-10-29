import React, { useState, useContext } from "react";
import "./Loginpopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";
const Loginpopup = ({ setLogin }) => {
  const [currstate, setCurrstate] = useState("Signup");
  const { url, setToken, setSignin, setUser } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        currstate === "Signup"
          ? `${url}/api/user/signup`
          : `${url}/api/user/login`;

      const res = await axios.post(endpoint, data);

      if (res.data.success) {
        if (currstate === "Signup") {
         toast.success("signup Successful");
          setCurrstate("Login");
        } else {
          toast.success("Login Successful");

          
          const { token, user } = res.data;
          if (token && user) {
            setToken(token);
            setSignin(true);
            setUser(user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
          }

          setLogin(false); // Close popup
        }
      } else {
        toast.error(res.data.message || "Invalid Credentials");
      }
    } catch (err) {
     
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit}>
        <div className="popup-content">
          <h2>{currstate}</h2>
          <img
            src={assets.cross_icon}
            alt="close"
            onClick={() => setLogin(false)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="sign-up-content">
          {currstate === "Signup" && (
            <input
              value={data.name}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Your name"
              required
            />
          )}

          <input
            value={data.email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Your email"
            required
          />
          <input
            value={data.password}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <div className="create-acc-btn">
            <button type="submit">
              {currstate === "Login" ? "Login" : "Create Account"}
            </button>
          </div>
        </div>

        <div className="check-box">
          <input type="checkbox" required />
          <span>By continuing, I agree to Terms of Use & Privacy Policy.</span>
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
      </form>
    </div>
  );
};

export default Loginpopup;
