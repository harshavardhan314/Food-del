import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const[islogin,setIslogin]=useState(false);

  useEffect(() => {
    const loadData = () => {
      const savedToken = localStorage.getItem("adminToken");
      const savedAdmin = localStorage.getItem("admin");

      if (savedToken) {
        setToken(savedToken);
        console.log("✅ Admin token found");
      }

      if (savedAdmin) {
        setAdmin(savedAdmin === "true");
      }
    };

    loadData();
  }, []);

  const contextValue = {
    token,
    setToken,
    admin,
    setAdmin,
    showLogin,
    setShowLogin,
    islogin,setIslogin
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
