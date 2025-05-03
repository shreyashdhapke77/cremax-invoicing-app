import { Navigate } from "react-router-dom";
import { useAuth } from "../common/context/auth-context";

export const RedirectIfAuthenticated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};
