import React from 'react'
import './Cart.css'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = ({setCartpage}) => {
  const navigate=useNavigate();
   const { removeFromCart, addToCart, cartItems ,food_list, getTotalCartAmount} = useContext(StoreContext);
   
   
   const deliveryFee = 2; 
   
  
   const subtotal = getTotalCartAmount();
   const total = subtotal > 0 ? subtotal + deliveryFee : 0;
   
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
                <React.Fragment key={item._id}> 
          
                <div className="cart-items-list cart-items-title">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price*cartItems[item._id]}</p>
                  <p className='cross' onClick={()=>removeFromCart(item._id)}>×</p>
                </div>
                <hr/>
                </React.Fragment>
              )
            }
            return null; 
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="car-total-details">
              <p>Subtotal</p>
             
              <p>${subtotal}</p>
            </div>
            <div className="car-total-details">
              <p>Delivery Fee</p>
              
              <p>${subtotal === 0 ? 0 : deliveryFee}</p> 
            </div>
            <div className="car-total-details">
              <p>Total</p>
             
              <p>${total}</p> 
            </div>
            
            <button onClick={()=>navigate('./placeorder')}>PROCEED TO CHECKOUT</button>

          </div>

        </div>
        
       
        <div className="cart-promocode">
            <div>
              <p>If you have a promocode, Enter it here</p>
              <div className="promocode">
                <input type="text" placeholder='Promo code'/>
                <button>Submit</button>
              </div>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Cart;