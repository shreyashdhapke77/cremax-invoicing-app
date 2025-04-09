import React from "react";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";

interface Props {
  label: string;
  variant?:
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "overline"
    | "subtitle1"
    | "subtitle2";
  align?: "center" | "inherit" | "justify" | "left" | "right";
  noWrap?: boolean;
  sx?: SxProps<Theme>;
  isBold?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Reusable Typography component with extended options.
 */
const CmxText: React.FC<Props> = ({
  label,
  variant = "body1",
  align = "center",
  noWrap = false,
  sx,
  isBold = false,
  onClick,
  className,
}) => {
  return (
    <Typography
      variant={variant}
      align={align}
      noWrap={noWrap}
      onClick={onClick}
      className={className}
      sx={{
        fontWeight: isBold ? "bold" : "normal",
        ...sx,
      }}
    >
      {label}
    </Typography>
  );
};

export default CmxText;
