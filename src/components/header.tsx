import { useEffect, useState } from "react";
import PrivateHeader from "./header/private";
import PublicHeader from "./header/public";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("access_token"))
  );

  // Listen for login/logout custom event
  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("access_token")));
    };

    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  return isAuthenticated ? <PrivateHeader /> : <PublicHeader />;
}

export default Header;
