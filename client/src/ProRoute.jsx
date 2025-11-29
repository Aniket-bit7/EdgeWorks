import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const ProRoute = ({ children }) => {
  const { user } = useAuth();
  const isPro = user?.plan === "pro";

  if (!isPro) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
};

export default ProRoute;
