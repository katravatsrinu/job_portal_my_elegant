// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a Context
const UserContext = createContext();

// Custom hook to use UserContext
export const useUserContext = () => useContext(UserContext);

// UserProvider component to wrap your app with context values
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // You can change this logic based on your app's authentication
  const [userSkills, setUserSkills] = useState(""); // This can be set dynamically when the user logs in

  return (
    <UserContext.Provider value={{ isLoggedIn, userSkills }}>
      {children}
    </UserContext.Provider>
  );
};
