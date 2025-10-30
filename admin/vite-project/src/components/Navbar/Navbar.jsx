import React from 'react'
import { assets } from "../../assets/assets";
import './Navbar.css'

const Navbar = () => {
  return (
    <>
        <div className='Navbar'>
           
                <img src={assets.logo} alt=""  className='logo'/>
                <img src={assets.profile_image}  className="profile"alt=""  />
        </div>
    </>
    
  )
}

export default Navbar
