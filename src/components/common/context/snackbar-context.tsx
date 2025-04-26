import React, { createContext, useContext, useState, useEffect } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface SnackbarMessage {
  message: string;
  type: AlertColor;
  duration?: number;
  position?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  action?: React.ReactNode;
}

interface SnackbarContextType {
  showMessage: (
    message: string,
    type?: AlertColor,
    options?: Partial<Omit<SnackbarMessage, "message" | "type">>
  ) => void;
}

export const snackbar = {
  showMessage: (
    message: string,
    type: AlertColor = "info",
    options?: Partial<Omit<SnackbarMessage, "message" | "type">>
  ) => {},
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queue, setQueue] = useState<SnackbarMessage[]>([]);
  const [current, setCurrent] = useState<SnackbarMessage | null>(null);
  const [open, setOpen] = useState(false);

  const showMessage = (
    msg: string,
    alertType: AlertColor = "info",
    options?: Partial<Omit<SnackbarMessage, "message" | "type">>
  ) => {
    setQueue((prev) => [
      ...prev,
      { message: msg, type: alertType, ...options },
    ]);
  };

  snackbar.showMessage = showMessage;

  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue((prev) => prev.slice(1));
      setOpen(true);
    }
  }, [queue, current]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleExited = () => {
    setCurrent(null);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={current?.duration || 4000}
        onClose={handleClose}
        slotProps={{
          transition: { onExited: handleExited },
        }}
        anchorOrigin={
          current?.position || { vertical: "top", horizontal: "center" }
        }
        action={current?.action}
      >
        {current ? (
          <Alert
            severity={current.type}
            variant="filled"
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            {current.message}
            {/* <LinearProgress color="inherit" /> */}
          </Alert>
        ) : undefined}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

////Custom Position (bottom-right)
// showMessage("Bottom Right", "info", {
//     position: { vertical: "bottom", horizontal: "right" },
//   })

//// Custom Duration (5 seconds)
// showMessage("Longer Snackbar", "warning", {
//     duration: 5000,
//   })

////Action Button (Retry)
// showMessage("Save failed", "error", {
//     action: (
//       <Button color="inherit" size="small" onClick={() => console.log("Retrying...")}>
//         RETRY
//       </Button>
//     ),
//   })