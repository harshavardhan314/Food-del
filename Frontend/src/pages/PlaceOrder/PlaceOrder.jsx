import React, { useState, useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, url, cartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please log in before placing an order.");
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    console.log(" Final orderItems array:", orderItems);

    const orderData = {
      userId: user.id, 
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    console.log(" Final orderData to send:", orderData);

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      console.log("Stripe order response:", response.data);

      if (response.data.success) {
        window.location.href = response.data.session_url; 
        
      } else {
        alert("Error creating payment session.");
      }
    } catch (error) {
      console.error(" Order error:", error);
      alert("Something went wrong while placing order.");
    }
  };

  const subtotal = getTotalCartAmount();
  const deliveryFee = 2;
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;

  return (
    <form onSubmit={onSubmitHandler} className="placeorder">
      <div className="order-left">
        <h2 className="title">Delivery Information</h2>

        <div className="input-group">
          <input
            type="text"
            name="firstname"
            value={data.firstname}
            onChange={onChangeHandler}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastname"
            value={data.lastname}
            onChange={onChangeHandler}
            placeholder="Last Name"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Email Address"
          required
        />

        <input
          type="text"
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          placeholder="Street Address"
          required
        />

        <div className="input-group">
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            placeholder="State/Province"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            placeholder="Zip/Postal Code"
            required
          />
          <input
            type="text"
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            placeholder="Country"
            required
          />
        </div>

        <input
          type="number"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          placeholder="Phone Number"
          required
        />
      </div>

      <div className="order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="total-detail">
            <p>
              Subtotal: <span className="amount">${subtotal}</span>
            </p>
          </div>
          <div className="total-detail">
            <p>
              Delivery Fee : <span className="amount">${deliveryFee}</span>
            </p>
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
  );
};

export default PlaceOrder;
