import { createContext, useContext, useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useSnackbar } from "./snackbar-context";

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface JwtPayload {
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const logoutTimer = useRef<NodeJS.Timeout | null>(null);
  const {showMessage } = useSnackbar()

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        setIsLoggedIn(true);
        scheduleAutoLogout(decoded.exp);
      } else {
        localStorage.removeItem("accessToken");
      }
    }
    setLoading(false);
  }, []);

  const scheduleAutoLogout = (exp: number) => {
    const currentTime = Date.now();
    const expiryTime = exp * 1000; // convert to ms

    const timeout = expiryTime - currentTime;

    if (timeout > 0) {
      logoutTimer.current = setTimeout(() => {
        logout();
        showMessage(
          "Session expired. Please login again.",
          "warning",
        );
      }, timeout);
    }
  };

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true);

    const decoded = jwtDecode<JwtPayload>(token);
    scheduleAutoLogout(decoded.exp);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);

    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
