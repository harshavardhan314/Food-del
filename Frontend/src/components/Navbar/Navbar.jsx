import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setLogin, setCartpage }) => {
  const navigate = useNavigate();
  const { getTotalCartItems } = useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (targetId) => {
    navigate("/");
    setIsMenuOpen(false);
    setTimeout(() => {
      const target = document.getElementById(targetId);
      target ? target.scrollIntoView({ behavior: "smooth" }) : window.scrollTo({ top: 0 });
    }, 100);
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="logo" className='logo'/></Link>

      <ul className={`nav-items ${isMenuOpen ? 'show-menu' : ''}`}>
        <li onClick={() => scrollToSection('top')}>Home</li>
        <li onClick={() => scrollToSection('menu')}>Menu</li>
        <li onClick={() => scrollToSection('contact')}>Contact Us</li>
        <li onClick={() => scrollToSection('mobile-app')}>Mobile App</li>
      </ul>

      <div className="nav-right">
        <div className="main-search">
          <input type="text" placeholder='Search for restaurant...' />
        </div>

        <div className="cart-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="cart" className='nav-icon' onClick={() => setCartpage(true)} />
          </Link>
          {getTotalCartItems() > 0 && <div className="dot">{getTotalCartItems()}</div>}
        </div>

        <button className='sign-in' onClick={() => setLogin(true)}>Sign in</button>

        <div className='mobile-menu-toggle' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </div>
      </div>
    </div>
  )
}

export default Navbar
