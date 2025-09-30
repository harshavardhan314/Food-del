import React, { useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'

const Loginpopup = ({ setLogin }) => {

    const [currstate,setCurrstate]=useState("Login")
  return (
    <div className="login-popup">
        <form action="">
            <div className="popup-content">
                <img src={assets.cross_icon} alt="" onClick={()=>{setLogin(false)}} />
                <h2>{currstate}</h2>

        
        <div className="sign-up-content">
            {currstate==="Login" ? <></>:<input type="text" placeholder="Your name" />}

          <input type="email" placeholder="Your email" />
          <input type="password" placeholder="Password" />

          <div className="button">
            <button>Create account</button>
          </div>

          <label>
            <input type="checkbox" />
            <span> By continuing, I agree to Terms of Use & Privacy Policy.</span>
          </label>

          <p>Already have an account? <a href="#">Login here</a></p>
        </div>
      </div>

        </form>
      
    </div>
  )
}

export default Loginpopup
