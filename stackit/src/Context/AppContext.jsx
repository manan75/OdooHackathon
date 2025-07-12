import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // ✅ Fetch user data on app load
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/data`, {
        withCredentials: true, // 🔑 important for cookie-based auth
      });

      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
      } else {
        setUserData(null);
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      setUserData(null);
      setIsLoggedIn(false);
    }
  };

  // 🔁 Load user data on refresh
  useEffect(() => {
    getUserData();
  }, []);

  const value = {
    backendURL,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
