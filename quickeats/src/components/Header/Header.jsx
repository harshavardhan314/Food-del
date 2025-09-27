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
        <div className="menu">
              <h3>Explore Our Menu</h3>
              <p>Choose from a diverse menu of restaurants and cuisines, delivered straight to your doorstep
                    our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        </div>
        <div className="menu-items">

          {
          menu_list.map((item, idx) => (

            <div key={idx} className="menu-item">
              <img src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>

        ))}
        </div>

          <div className="Food-list">

          <h2>Top dishes near You</h2>
          <p>Discover the most popular dishes in your area, handpicked by our food experts to satisfy your cravings and delight your taste buds.</p>

          <div className="food-list-grid">
                {
                food_list.map((item, idx) => 
                (
                  <div key={idx} className="food-item">
                    <img src={item.image} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <h2>${item.price}</h2>
                  </div>
                ))
                }
          </div>
          
        </div>

    </div>
  )
}

export default Header