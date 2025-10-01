import React, { useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'

const Loginpopup = ({ setLogin }) => {

    const [currstate,setCurrstate]=useState("Signup")
  return (
    <div className="login-popup">
        <form action="" >
            <div className="popup-content">
              <h2 className='curr-state'>{currstate}</h2>
                <img src={assets.cross_icon} alt="" onClick={()=>{setLogin(false)}} />
                
            </div>

        
        <div className="sign-up-content">
            {currstate==="Login" ? <></>:<input type="text" placeholder="Your name" />}

          <input type="email" placeholder="Your email" />
          <input type="password" placeholder="Password" />

          <div className="create-acc-btn">
            <button>Create account</button>
          </div>

        </div>

          <div className='check-box'>
            <input type="checkbox" />
            <span> By continuing, I agree to Terms of Use & Privacy Policy.</span>
          </div>

          {currstate ==='Signup'?  <p>Already have an account? <span onClick={()=>{(setCurrstate("Login"))}} >Login here</span></p>:
           <p>Create a new account ? <span onClick={()=>(setCurrstate("Signup"))}>Click here</span> </p>}



        </form>
      
    </div>
  )
}

export default Loginpopup
