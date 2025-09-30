import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = ({setLogin}) => {
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="logo" className='logo'/>
        <ul className='nav-items'>
            <li>Home</li>
            <li>Menu</li>
            <li>Contact us</li>
            <li>Mobile app</li>
        </ul>
        <div className="nav-right">
            <img src={assets.search_icon} alt="search" className='nav-icon'/>
            <div className="cart-icon">
                <img src={assets.basket_icon} alt="cart" className='nav-icon'/>
            </div>
             <button className='sign-in' onClick={()=>setLogin(true)}>sign in</button>
        </div>
    </div>
  )
}

export default Navbar