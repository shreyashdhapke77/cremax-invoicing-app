import React from "react";
import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";
import "../../styles/button-style.css";

interface CmxButtonProps {
  label: string;
  variant?: "text" | "contained" | "outlined";
  disabled?: boolean;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  size?: "small" | "medium" | "large";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

/**
 * Reusable MUI Button with consistent style and extended props.
 */
const CmxButton: React.FC<CmxButtonProps> = ({
  label,
  variant = "contained",
  disabled = false,
  color = "primary",
  size = "medium",
  startIcon,
  endIcon,
  fullWidth = true,
  sx,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <Button
      className={`button ${className}`}
      variant={variant}
      disabled={disabled}
      color={color}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      sx={{
        fontSize: "17px",
        fontWeight: "bold",
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};

export default CmxButton;
