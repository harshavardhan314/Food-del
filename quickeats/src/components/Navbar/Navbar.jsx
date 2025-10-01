import React, { useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'
const Navbar = ({setLogin}) => {
  const [cartpage,Setcartpage]=useState(false)
  return (
    <div className='navbar'>
      <Link to='/'>
       <img src={assets.logo} alt="logo" className='logo'/>
      </Link>
       
        <ul className='nav-items'>
          <Link to='/'>  <li>Home</li></Link>
           
            <li>Menu</li>
            <li>Contact us</li>
            <li>Mobile app</li>
        </ul>
        <div className="nav-right">
            <img src={assets.search_icon} alt="search" className='nav-icon'/>
            <div className="cart-icon">
              <Link to='/cart'>
                <img src={assets.basket_icon} alt="cart" className='nav-icon' onClick={()=>Setcartpage(true)}/>
              
              </Link>
              
            </div>
             <button className='sign-in' onClick={()=>setLogin(true)}>sign in</button>
        </div>
    </div>
  )
}

export default Navbar