import React, { useEffect, useState } from "react";
import { LinearProgress, Fade } from "@mui/material";

interface GlobalLoaderProps {
  loading: boolean;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ loading }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading) {
      // Small delay before showing loader to avoid flashing
      timer = setTimeout(() => {
        setShowLoader(true);
      }, 300); // 300ms delay
    } else {
      setShowLoader(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  if (!showLoader) return null;

  return (
    <Fade in={showLoader}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}>
        <LinearProgress
        //   color="secondary" // you can customize this
          style={{
            height: 4,
            // borderRadius: 2,
            backgroundColor: "#e0e0e0",
          }}
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#635bff", // Stripe color
            },
          }}
        />
      </div>
    </Fade>
  );
};

export default GlobalLoader;
