import React, { ChangeEvent, useState } from "react";
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface Props {
  id?: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  onChange?: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

/**
 * Reusable MUI TextField with customizable props.
 */
const CmxPasswordTextField: React.FC<Props> = ({
  id = "cmx-password-text-input",
  value = "",
  error = false,
  helperText = "",
  disabled = false,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl fullWidth sx={{ mt: 2, mb: 2 }} variant="outlined">
      <InputLabel error={error} htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id={id}
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        name="password"
        value={value}
        onChange={onChange}
        error={error}
        disabled={disabled}
      />
      <FormHelperText error={error}>
        {helperText ? helperText : ""}
      </FormHelperText>
    </FormControl>
  );
};

export default CmxPasswordTextField;
