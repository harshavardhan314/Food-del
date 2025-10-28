import React, { useState, createContext, useEffect } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [signin, setSignin] = useState(false);
  const [user, setUser] = useState(null);

  const url = "http://localhost:5000";

  // ✅ Add to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId });
      } catch (err) {
        console.error("Error adding to cart:", err);
      }
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId] -= 1;
      else delete updated[itemId];
      return updated;
    });

    if (token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { itemId });
      } catch (err) {
        console.error("Error removing from cart:", err);
      }
    }
  };

  // ✅ Restore user + token after refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
      setSignin(true);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ Automatically attach token to axios
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // ✅ Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      if (token) {
        try {
          const res = await axios.get(`${url}/api/cart/get`);
          if (res.data.success) {
            setCartItems(res.data.cartData || {});
          }
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      }
    };
    fetchCart();
  }, [token]);

  // 🧮 Total amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // 🧾 Total items
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) totalItem += cartItems[item];
    }
    return totalItem;
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount,
    getTotalCartItems,
    token,
    setToken,
    signin,
    setSignin,
    user,
    setUser,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
