import React, { useState } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
const Fooditem = ({ id, name, image, price ,description}) => {

  const [count,setCount]=useState(0);
  return (
    <div className="food-item">

     

        <div className="food-img-container">
            <img src={image} alt={name} className="food-img" />
            {
              !count? <img src={assets.add_icon_white}  onClick={()=>setCount(prev=>prev+1)} alt="" />:
              <div className="increase-count">
              <img src={assets.remove_icon_red} onClick={()=>setCount(prev=>prev-1)}></img>
                <p>{count}</p>
                  <img src={assets.add_icon_green} onClick={()=>setCount(prev=>prev+1)}></img>
              </div>
              
            }
            {console.log(count)}
        </div>
        <div className="food-details">
         
             
          
            <div className="food-item-name-rating">
                <p className="food-item-name">{name}</p>
                
                <img src={assets.rating_starts} alt="rating" className="food-item-rating" />
               
            </div>
            <p className='food-item-description'>{description}</p>
            <p className="food-item-price">$ {price}</p>
            
        </div>
    </div>
  )
}

export default Fooditem
