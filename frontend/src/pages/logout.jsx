import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { deleteToken } from "../util/auth";

const LogOut = () => {
  let { logout } = useAuth();
  logout();
  deleteToken();
  return <Navigate to="/" />;
};

export default LogOut;
