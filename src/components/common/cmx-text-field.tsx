import React, { ChangeEvent, CSSProperties } from "react";
import { TextField } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface Props {
  id?: string;
  label: string;
  error?: boolean;
  defaultValue?: string;
  autocomplete?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  style?: CSSProperties;
  fullWidth?: boolean;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  size?: "small" | "medium";
  margin?: "none" | "dense" | "normal";
  variant?: "outlined" | "filled" | "standard";
  autoFocus?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * Reusable MUI TextField with customizable props.
 */
const CmxTextInputField: React.FC<Props> = ({
  id = "cmx-text-input",
  label,
  error = false,
  defaultValue = "",
  autocomplete = "off",
  required = false,
  disabled = false,
  helperText = "",
  multiline = false,
  rows = 1,
  minRows = 1,
  maxRows = 1,
  style,
  fullWidth = true,
  onChange,
  color = "primary",
  size = "medium",
  margin = "dense",
  variant = "outlined",
  autoFocus = false,
  sx,
}) => {
  return (
    <TextField
      id={id}
      label={label}
      error={error}
      defaultValue={defaultValue}
      variant={variant}
      required={required}
      disabled={disabled}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      minRows={minRows}
      maxRows={maxRows}
      style={style}
      fullWidth={fullWidth}
      margin={margin}
      onChange={onChange}
      color={color}
      size={size}
      autoFocus={autoFocus}
      autoComplete={autocomplete}
      sx={sx}
    />
  );
};

export default CmxTextInputField;
