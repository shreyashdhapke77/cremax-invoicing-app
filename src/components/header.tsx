import { useEffect, useState } from "react";
import PrivateHeader from "./header/private";
import PublicHeader from "./header/public";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("accessToken"))
  );

  // Listen for login/logout custom event
  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("accessToken")));
    };

    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  return isAuthenticated ? <PrivateHeader /> : <PublicHeader />;
}

export default Header;
