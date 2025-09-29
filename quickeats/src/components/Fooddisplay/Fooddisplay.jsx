import React from 'react'
import './Fooddisplay.css'
import { assets, food_list  } from '../../assets/assets'
import Fooditem from '../Fooditem/Fooditem'
const Fooddisplay = () => {
  return (
    <div className="food-display-container">
        <div className="food-display-header">
            <h2 className="food-display-title">Popular Dishes</h2>
        </div>
        <div className="Food-list-items">
            {
                food_list.map((item)=>{
                    return(
                      <Fooditem  
                       key={item._id}
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        description={item.description}
                      />
                    )
                })
            }
        </div>
      
    </div>
  )
}

export default Fooddisplay