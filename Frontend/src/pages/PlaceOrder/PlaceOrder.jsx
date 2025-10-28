import React from 'react'
import './PlaceOrder.css'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
const PlaceOrder = () => {
    const { getTotalCartAmount}=useContext(StoreContext);

    let subtotal = getTotalCartAmount();
    const deliveryFee = 2; 
    const total = subtotal > 0 ? subtotal + deliveryFee : 0;
  return (

    
    <form action="" className="placeorder">

       <div className="order-left">
                    <h2 className="title">Delivery Information</h2>
                    
                    {/* Full Name */}
                    <div className="input-group">
                        <input type="text" placeholder="First Name" required />
                        <input type="text" placeholder="Last Name" required />
                    </div>
                    
                    {/* Email */}
                    <input type="email" placeholder="Email Address" required />
                    
                    {/* Street Address */}
                    <input type="text" placeholder="Street Address" required />

                    {/* City & State */}
                    <div className="input-group">
                        <input type="text" placeholder="City" required />
                        <input type="text" placeholder="State/Province" required />
                    </div>
                    
                    {/* Zip & Country */}
                    <div className="input-group">
                        <input type="text" placeholder="Zip/Postal Code" required />
                        <input type="text" placeholder="Country" required />
                    </div>

                    {/* Phone Number */}
                    <input type="number" placeholder="Phone Number" required />
                </div>
                 <div className="order-right">
                    <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div className="total-detail">
                            <p>Subtotal: <span className='amount'>${subtotal}</span></p>

                        </div>
                        <div className="total-detail">
                            <p>Delivery Fee : <span className='amount'>${deliveryFee}</span></p>

                        </div>
                        <div className="total-detail total-final">
                            <p>Total : ${total}</p>

                        </div>
                    </div>
                    
                    <button type="submit" className="payment-button">
                        Proceed To Payment
                    </button>
                </div>


    </form>
  )
}

export default PlaceOrder