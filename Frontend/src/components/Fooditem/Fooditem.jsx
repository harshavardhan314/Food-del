import React, { useContext } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'   

const Fooditem = ({ id, name, image, price, description }) => {
  const { removeFromCart, addToCart, cartItems } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-img-container">
        <img src={image} alt={name} className="food-img" />

        {
          !cartItems[id] ? (
            <img
              className="add-icon"
              src={assets.add_icon_white}
              onClick={() => addToCart(id)}   
              alt="add to cart"
            />
          ) : (
            <div className="increase-count">
              <img
                src={assets.remove_icon_red}
                onClick={() => removeFromCart(id)}   
                alt="remove"
              />
              <p>{cartItems[id]}</p>
              <img
                src={assets.add_icon_green}
                onClick={() => addToCart(id)}   
                alt="add"
              />
            </div>
          )
        }
      </div>

      <div className="food-details">
        <div className="food-item-name-rating">
          <p className="food-item-name">{name}</p>
          <img src={assets.rating_starts} alt="rating" className="food-item-rating" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">$ {price}</p>
      </div>
    </div>
  )
}

export default Fooditem
