import { isAuthenticated } from "../context/authCookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = isAuthenticated();
  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
