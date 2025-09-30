import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="Footer">
        <div className="main-heading">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vel
            corrupti quaerat, soluta eos veniam ea iste et accusantium,
            similique, necessitatibus voluptatibus optio sunt nostrum
            dignissimos mollitia repudiandae quidem iure!
          </p>
          <div className="images">
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
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
            <li>contact @Tomato.com</li>
          </ul>
        </div>
       
      </div>
      <hr />
      <p>© 2025 Tomato Food Delivery. All Rights Reserved.</p>
       
    </div>
  );
};

export default Footer;
