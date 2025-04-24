import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = localStorage.getItem("access_token");

  return token ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

export default PublicRoute;
