import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: adds smooth scrolling effect
    });
  }, [location]);

  return null; // This component does not render anything
};

export default ScrollToTop;