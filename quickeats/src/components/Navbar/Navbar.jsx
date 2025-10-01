import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from "react-router-dom";
const Navbar = ({setLogin}) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/"); // Go to Home route if not already there
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    }, 50);
  };

  const { getTotalCartItems} =useContext(StoreContext)
  const [cartpage,Setcartpage]=useState(false)
  const [searchIcon, setSearchIcon] = useState(false);
  return (
    <div className='navbar'>


      <Link to='/'>
       <img src={assets.logo} alt="logo" className='logo'/>

      </Link>
       
        <ul className='nav-items'>
         <li onClick={handleHomeClick}>Home</li>
           
           <li><a href="#menu">Menu</a></li>
      <li><a href="#contact">Contact Us</a></li>
      <li><a href="#mobile-app">Mobile App</a></li>
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
        </div>
    </div>
  )
}

export default Navbar