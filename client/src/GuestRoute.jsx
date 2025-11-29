import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const GuestRoute = ({ children }) => {
  const { isLogged } = useAuth();

  if (isLogged) {
    return <Navigate to="/ai" replace />;
  }

  return children;
};

export default GuestRoute;
