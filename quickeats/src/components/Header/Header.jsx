import React from 'react'
import './Header.css'
const Header = () => {
   // Function to handle the smooth scroll to the menu section
    const handleMenuClick = () => {
        const menuSection = document.getElementById('menu');
        
        if (menuSection) {
            menuSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    };
  return (
    <div>
        <div className="Header">

            <div className="Header-content">
                    <h2>Order Your Favorite Food here.</h2>
                    <p>Choose from a diverse menu of restaurants and cuisines, delivered straight to your doorstep
                    our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                    <button className='explore-menu' onClick={handleMenuClick} >View menu</button>
            </div>
        </div>

    </div>
  )
}

export default Header