import React from 'react'
import './Cart.css'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
const Cart = ({setCartpage}) => {
   const { removeFromCart, addToCart, cartItems ,food_list} = useContext(StoreContext);
  return (
    <div className="cart">

      <div className="cart-items">

        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br></br>
        <hr/>
        {
          food_list.map((item,idx)=>{
            if(cartItems[item._id]>0)
            {
              return(
                <>
                <div className="cart-items-list cart-items-title">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price*cartItems[item._id]}</p>
                  <p className='cross' onClick={()=>removeFromCart(item._id)}>×</p>
                </div>
                <hr></hr>
                </>
                
              )

            }

          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="car-total-details">
              <p>Subtotal</p>
              <p>{0}</p>
            </div>
            <div className="car-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <div className="car-total-details">
              <p>Total</p>
              <p>{0}</p>
            </div>

          </div>

        </div>
      </div>


    </div>
  )
}

export default Cart