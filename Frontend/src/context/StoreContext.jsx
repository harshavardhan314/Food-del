import React, { useState, createContext, useEffect } from "react";
// Import both 'food_list' and 'assets' from the assets file
import { food_list, assets } from "../assets/assets";

// Step 1: Create context
export const StoreContext = createContext();

// Helper to get stored user from localStorage
const getStoredUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(getStoredUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getStoredUser());

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
  };

  // New function to calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // Find the food item object in food_list by its _id
        let itemInfo = food_list.find((product) => product._id === item);
        // Add the price multiplied by the quantity to the total
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  // Auth methods
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    setCartItems({}); // Clear cart on logout
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount,
    getTotalCartItems,
    // Auth context
    user,
    isAuthenticated,
    login,
    logout,
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  // Step 2: Provide context to children
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
