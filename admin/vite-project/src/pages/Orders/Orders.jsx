import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/api/order/allOrders`);
        if (response.data.success) {
          setOrders(response.data.data); // save all orders
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [url]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="orders-container">
      <h2>All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p><strong>User ID:</strong> {order.userId}</p>
            <p><strong>Total Amount:</strong> ${order.amount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment:</strong> {order.payment ? "Paid ✅" : "Not Paid ❌"}</p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>

            <h4>🛒 Items:</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item._id} className="order-item">
                  <img src={item.image} alt={item.name} width="50" height="50" />
                  <div>
                    <p><strong>{item.name}</strong> — {item.category}</p>
                    <p>Price: ${item.price} | Qty: {item.quantity}</p>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <h4>📦 Address:</h4>
            <p>
              {order.address.firstname} {order.address.lastname} <br />
              {order.address.street}, {order.address.city}, {order.address.state} <br />
              {order.address.country} - {order.address.zipcode} <br />
              📧 {order.address.email} | ☎️ {order.address.phone}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
