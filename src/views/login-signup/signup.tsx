import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Link,
  Paper,
} from "@mui/material";
import GoogleIconColorful from "../../components/common/icons/google";
import { GREY_BACKGROUND, GREY_BACKGROUND_HOVER } from "../../utils/colors";
import { COMPANY_NAME } from "../../constants/labels";
import { useNavigate } from "react-router-dom";
import BaseApi from "../../services/base-api";
import CmxPasswordTextField from "../../components/common/cmx-password-text-field";
import { useSnackbar } from "../../components/common/context/snackbar-context";
import RightPanel from "../../components/common/right-panel";
interface SignupFormData {
  name: string;
  email: string;
  password: string;
}
interface SignupFormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [isDisabled, setIsDisabled] = useState(false);
  const { showMessage } = useSnackbar();

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
    const newErrors: SignupFormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters, with uppercase, lowercase, number, and special character.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsDisabled(true);
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsDisabled(false);
      return;
    }
    setErrors({}); // Clear previous errors

    const response = await BaseApi.post("/users/register", formData);
    setIsDisabled(false);
    if (response?.token) {
      showMessage("You signup successfully!", "success");
    } else {
      if (response?.error) {
        showMessage(response.error, "error");
      } else {
        showMessage("Something went wrong, please try again later.", "error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
              Sign up
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
              label="Name"
              variant="outlined"
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name ? true : false}
              helperText={errors.name ?? ""}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              name="email"
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
            <Typography
              variant="body1"
              sx={{
                maxWidth: 400,
                display: "flex",
                flex: 1,
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              By signing up, you confirm that you have read and accepted the End
              User Agreement.
            </Typography>
            <Button
              fullWidth
              disabled={isDisabled}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: GREY_BACKGROUND,
                "&:hover": { backgroundColor: GREY_BACKGROUND_HOVER },
                textTransform: "none",
                fontWeight: "bold",
              }}
              type="submit"
            >
              Sign up
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 1,
              }}
            >
              <Typography>
                Already have an account?{" "}
                <Link
                  href=""
                  color="primary"
                  onClick={() => navigate("/login")}
                >
                  Login.
                </Link>
              </Typography>
              <Typography sx={{ mt: 1 }}>
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
    </form>
  );
};

export default SignupPage;
