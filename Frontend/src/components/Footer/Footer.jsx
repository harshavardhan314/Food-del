import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer-container" id="contact">
      <div className="Footer">
        <div className="main-heading">
          <img src={assets.logo} alt="Tomato Logo" />
          <p>
            At <strong>Tomato</strong>, we don’t just deliver food — we deliver
            happiness (and maybe a little extra cheese 🧀). Whether you’re
            hangry, lazy, or just avoiding cooking again, we’ve got you covered
            faster than you can say “extra toppings, please!” 🍕🍔🍟
          </p>
          <div className="images">
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="company">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="get-in-touch">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1 (555) 123-4567</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p>© 2025 Tomato Food Delivery. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
