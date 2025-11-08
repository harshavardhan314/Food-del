import React from 'react';
import './Header.css';

const Header = () => {
  // Function to handle the smooth scroll to the menu section
  const handleMenuClick = () => {
    const menuSection = document.getElementById('menu');

    if (menuSection) {
      menuSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="Header">
      <div className="Header-content">
        <h2>Order Your Favorite Food Here 🍕</h2>
        <p>
          Choose from a diverse menu of restaurants and cuisines, delivered
          straight to your doorstep. Our mission is to satisfy your cravings and
          elevate your dining experience, one delicious meal at a time.
        </p>

        
        <h1 className="tagline">
          Life’s too short to cook —<span> let Tomato handle it! 😎</span>
        </h1>

        <button className="explore-menu" onClick={handleMenuClick}>
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
