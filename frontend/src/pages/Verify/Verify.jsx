import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.post(`${url}/api/order/verify`, {
          success,
          orderId,
        });

        if (res.data.success) {
          setStatus("success");
          toast.success("✅ Payment Successful!");
          setTimeout(() => navigate("/orders"), 3000);
        } else {
          setStatus("failed");
          toast.error("❌ Payment Verification Failed!");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("failed");
        toast.error("⚠️ Something went wrong during verification!");
      }
    };

    verifyPayment();
  }, [success, orderId, url, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {status === "verifying" && (
        <>
          <h2>Verifying your payment...</h2>
          <p>Order ID: {orderId}</p>
        </>
      )}

      {status === "success" && (
        <>
          <h2 style={{ color: "green" }}>✅ Payment Successful!</h2>
          <p>Your order has been verified successfully.</p>
          <p>Order ID: {orderId}</p>
          <p>Redirecting to your orders page...</p>
        </>
      )}

      {status === "failed" && (
        <>
          <h2 style={{ color: "red" }}>❌ Payment Failed</h2>
          <p>Something went wrong while verifying your payment.</p>
          <p>Please contact support with Order ID: {orderId}</p>
        </>
      )}
    </div>
  );
};

export default Verify;
