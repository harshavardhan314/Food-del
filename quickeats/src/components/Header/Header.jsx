import React from 'react'
import './Header.css'
import {assets,food_list,menu_list} from '../../assets/assets'
const Header = () => {
  return (
    <div>
        <div className="Header">

            <div className="Header-content">
                    <h2>Order Your Favorite Food here.</h2>
                    <p>Choose from a diverse menu of restaurants and cuisines, delivered straight to your doorstep
                    our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                    <button className='explore-menu'>View menu</button>
            </div>
        </div>

          <div className="Food-list">

          <h2>Top dishes near You</h2>
          <p>Discover the most popular dishes in your area, handpicked by our food experts to satisfy your cravings and delight your taste buds.</p>
          
        </div>

    </div>
  )
}

export default Header