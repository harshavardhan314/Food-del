import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import Loginpopup from "./components/Loginpopup/Loginpopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/Myorders/Myorders";
const App = () => {
  const [login, setLogin] = useState(false);
  const [cartpage, setCartpage] = useState(false);

  return (
    <>
      <div className="app">
        {login && <Loginpopup setLogin={setLogin} />}
        <Navbar setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart setCartpage={setCartpage} />} />
          <Route path="cart/placeorder" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/orders" element={<MyOrders/>}/>

        </Routes>
      </div>
      <Footer id="contact" />
    </>
  );
};

export default App;
