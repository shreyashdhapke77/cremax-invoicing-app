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
import LOGIN_AVATAR from "../../assets/avatar-login.png";
import { COMPANY_NAME } from "../../constants/labels";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import BaseApi from "../../services/base-api";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    setErrorMsg(""); // Reset error
    try {
      const res: any = await BaseApi.post(
        "api/users/login",
        {
          email,
          password,
        },
        {}
      );

      if (res && res.token) {
        // Store token and redirect
        BaseApi.setAccessToken(res.token);
        navigate("/dashboard");
      } else {
        setErrorMsg("Invalid email or password");
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
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
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      <Box
        sx={{
          flex: 1,
          backgroundColor: GREY_BACKGROUND,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          pt: { xs: 2, sm: 2, lg: 0, xl: 0 },
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Did you know?
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 300 }}>
          Our support team is just a message away—always ready to help you
          succeed.
        </Typography>
        <Box
          component="img"
          src={LOGIN_AVATAR}
          alt="Support Illustration"
          sx={{ width: "100%", maxWidth: 300 }}
        />
        <Link
          href="#"
          color="primary"
          underline="hover"
          sx={{ position: "absolute", bottom: 16 }}
        >
          This website uses cookies
        </Link>
      </Box>
    </Box>
  );
};

export default LoginPage;
