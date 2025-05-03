import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Link,
  Paper,
  Alert,
} from "@mui/material";
import GoogleIconColorful from "../../components/common/icons/google";
import { GREY_BACKGROUND, GREY_BACKGROUND_HOVER } from "../../utils/colors";
import { COMPANY_NAME } from "../../constants/labels";
import { useLocation, useNavigate } from "react-router-dom";
import BaseApi from "../../services/base-api";
import CmxPasswordTextField from "../../components/common/cmx-password-text-field";
import { useSnackbar } from "../../components/common/context/snackbar-context";
import { useAuth } from "../../components/common/context/auth-context";
import RightPanel from "../../components/common/right-panel";

interface LoginFormData {
  email: string;
  password: string;
}
interface LoginFormErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isDisabled, setIsDisabled] = useState(false);
  const { showMessage } = useSnackbar();
  const { login } = useAuth();
  const location = useLocation();

  // Update form data when user types
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: LoginFormErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const handleLogin = async () => {
    setIsDisabled(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsDisabled(false);
      return;
    }

    setErrors({}); // Clear previous errors
    setErrorMsg(""); // Reset error
    try {
      const res: any = await BaseApi.post("/users/login", formData);
      if (res && res.token) {
        // Store token and redirect
        BaseApi.setAccessToken(res.token);
        login(res.token);
        // navigate("/dashboard");
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from);
      } else {
        setErrorMsg("Invalid email or password");
        showMessage("Invalid email or password.", "error", {
          position: { vertical: "bottom", horizontal: "left" },
        });
      }
    } catch (error) {
      // setErrorMsg("Something went wrong. Please try again.");
      showMessage("Something went wrong. Please try again.", "error");
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column", lg: "row", xl: "row" },
        height: "94.2vh",
      }}
    >
      {/* Left Panel */}
      <Paper
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Log in
          </Typography>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {COMPANY_NAME}
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIconColorful />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Continue with Google
          </Button>
          <Divider sx={{ my: 2 }}>OR</Divider>

          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={errors.email ? true : false}
            helperText={errors.email ?? ""}
          />
          <CmxPasswordTextField
            value={formData.password}
            error={errors.password ? true : false}
            helperText={errors.password ?? ""}
            onChange={handleChange}
          />

          {errorMsg && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: GREY_BACKGROUND,
              "&:hover": { backgroundColor: GREY_BACKGROUND_HOVER },
              textTransform: "none",
              fontWeight: "bold",
            }}
            disabled={isDisabled}
          >
            Log in
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography>
              No account yet?{" "}
              <Link href="" color="primary" onClick={() => navigate("/signup")}>
                Sign up.
              </Link>
            </Typography>
            <Typography>
              <Link
                href=""
                color="primary"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot your password?
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Right Panel */}
      <RightPanel />
    </Box>
  );
};

export default LoginPage;
