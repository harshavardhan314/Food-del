import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from "react-router-dom";

const Navbar = ({setLogin}) => {
  const navigate = useNavigate();
  const { getTotalCartItems} =useContext(StoreContext)
  
  // NEW: State to control the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [cartpage,Setcartpage]=useState(false)
  const [searchIcon, setSearchIcon] = useState(false);
  
  // Helper function to handle navigation to the Home route, then smooth scroll
  const scrollToSection = (targetId) => {
      // Navigate to the Home route (/) if not already there
      navigate("/"); 
      // Close the menu after clicking a link
      setIsMenuOpen(false); 

      // Wait a moment for the navigation and component rendering, then scroll
      setTimeout(() => {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
          }
      }, 100); 
  };

  const handleHomeClick = () => scrollToSection('top');
  const handleMenuClick = () => scrollToSection('menu');
  const handleContactClick = () => scrollToSection('contact');
  const handleMobileAppClick = () => scrollToSection('mobile-app');

  // SVG for a simple hamburger icon
  const HamburgerIcon = (
      <svg 
          onClick={() => setIsMenuOpen(prev => !prev)}
          className='hamburger-icon' 
          viewBox="0 0 24 24" 
          width="30" 
          height="30"
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
      >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
  );

  // SVG for a simple close icon (X)
  const CloseIcon = (
      <svg 
          onClick={() => setIsMenuOpen(prev => !prev)}
          className='close-icon' 
          viewBox="0 0 24 24" 
          width="30" 
          height="30"
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
      >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
  );


  return (
    <div className='navbar'>
      <Link to='/'>
       <img src={assets.logo} alt="logo" className='logo'/>
      </Link>
        
      {/* 1. Conditionally apply the 'show-menu' class */}
      <ul className={`nav-items ${isMenuOpen ? 'show-menu' : ''}`}>
        {/* Updated list items to use the new click handlers that close the menu */}
        <li onClick={handleHomeClick}>Home</li>
        <li onClick={handleMenuClick}>Menu</li>
        <li onClick={handleContactClick}>Contact Us</li>
        <li onClick={handleMobileAppClick}>Mobile App</li>
      </ul>
      
      <div className="nav-right">
        <div className="search-container">
          <img 
            src={assets.search_icon} 
            alt="search" 
            className='nav-icon' 
            onClick={() => setSearchIcon(prev => !prev)} // Toggles the search box
          />
          {searchIcon ? (
            <div className="search-box">
              <input type="text" placeholder='Search for restaurant...'/>
            </div>
          ) : null}
        </div>
          
        <div className="cart-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="cart" className='nav-icon' onClick={()=>Setcartpage(true)}/>
          </Link>
          {getTotalCartItems() > 0 && 
            <div className="dot">{getTotalCartItems()}</div>
          }
        </div>
        <button className='sign-in' onClick={()=>setLogin(true)}>sign in</button>
        
        {/* 2. Toggle Icon Container: Displays the Hamburger or Close icon */}
        <div className='mobile-menu-toggle'>
            {isMenuOpen ? CloseIcon : HamburgerIcon}
        </div>
      </div>
    </div>
  )
}

export default Navbar
