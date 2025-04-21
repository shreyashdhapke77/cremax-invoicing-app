import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";
import ScrollToTop from "./components/common/scroll-to-top";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./views/home";
import LoginPage from "./views/login";
import SignupPage from "./views/signup";
import ForgotPasswordPage from "./views/forgot-password";

// Theme config
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Box className="App">
          <Box className="fixed-header">
            <Header />
          </Box>

          <Box className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
