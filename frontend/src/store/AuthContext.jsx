import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  logIn: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const logIn = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const value = { logIn, logout, isAuthenticated };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
