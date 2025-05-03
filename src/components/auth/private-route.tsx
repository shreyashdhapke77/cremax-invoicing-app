import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../common/context/auth-context";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // 👈 Show loader until auth status is checked
  }

  if (!isLoggedIn) {
    window.dispatchEvent(new Event("authChanged"));
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
