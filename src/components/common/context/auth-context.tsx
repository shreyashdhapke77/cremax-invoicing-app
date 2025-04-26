import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 NEW

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false); // 👈 Done checking
  }, []);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
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
