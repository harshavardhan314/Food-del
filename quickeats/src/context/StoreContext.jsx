import React, { useState, createContext, useEffect } from "react";
// Import both 'food_list' and 'assets' from the assets file
import { food_list, assets } from "../assets/assets"; 

// Step 1: Create context
export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

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

  const contextValue = {
    
    food_list, 
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount, 
    getTotalCartItems
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