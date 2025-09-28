import React from 'react'
import { food_list } from '../../assets/assets'
import './Fooditems.css'
const Fooditems = () => {
  return (

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

  )
}

export default Fooditems