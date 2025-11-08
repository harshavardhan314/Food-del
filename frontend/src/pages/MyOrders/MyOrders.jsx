import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Myorders.css";
import { Toaster } from "react-hot-toast";
const MyOrders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${url}/api/order/userorders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setOrders(res.data.data);
        } else {
          toast.error("Error fetching orders");
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
        toast.error("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [url]);

  if (loading) return <p className="loading">Loading your orders...</p>;

 return (
  <div className="orders-container">
    <h2 className="orders-title">Past Orders</h2>

    {orders.length === 0 ? (
      <p>No orders found.</p>
    ) : (
      orders.map((order) => (
        <div key={order._id} className="order-card">
          {/* Order Header */}
          <div className="order-header">
            <div className="order-restaurant">
              <h3>{order.restaurantName || "Your Order"}</h3>
              <p className="order-date">
                Delivered on {new Date(order.date).toLocaleString()}
              </p>
            </div>
            <div className="order-status">
              {order.payment === true ? (
                <span className="status-success">✔ Delivered</span>
              ) : (
                <span className="status-pending">⏳ Not Delivered</span>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="order-items">
            {order.items.map((item, idx) => (
              <div key={idx} className="order-item">
                <img src={item.image} alt={item.name} className="item-img" />
                <div className="item-info">
                  <p className="item-name">
                    {item.name} × {item.quantity}
                  </p>
                  <p className="item-price">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Footer */}
          <div className="order-footer">
            <div>
              <p className="total">Total Paid: ₹{order.amount}</p>
              <p
                className={`payment-status ${
                  order.payment
                    ? "payment-paid"
                    : order.paymentMethod === "COD"
                    ? "payment-cod"
                    : "payment-Failed"
                }`}
              >
                {order.payment
                  ? "✅ Payment Successful"
                  : order.paymentMethod === "COD"
                  ? "💵 Cash on Delivery"
                  : "❌ Payment Failed"}
              </p>
            </div>

            <div className="order-buttons">
              <button className="reorder-btn">REORDER</button>
              <button className="help-btn">HELP</button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);



};

export default MyOrders;
