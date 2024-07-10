import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { getToken } from "../util/auth";

const Protected = ({ element: Component }) => {
  const token = getToken();
  let { isAuthenticated, logIn } = useAuth();
  if (!isAuthenticated && token) {
    logIn();
    isAuthenticated = true;
  }

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default Protected;
