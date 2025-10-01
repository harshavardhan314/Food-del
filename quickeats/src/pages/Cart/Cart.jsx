import React from 'react'
import './Cart.css'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
const Cart = () => {
   const { removeFromCart, addToCart, cartItems } = useContext(StoreContext);
  return (
    <div className="cart">
      console.log({addToCart})


    </div>
  )
}

export default Cart