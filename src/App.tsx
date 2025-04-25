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
import Dashboard from "./views/dashboard";
import InvoiceList from "./views/invoices/list";
import ClientList from "./views/clients/list";
import ProductList from "./views/products/list";
import InvoiceDetails from "./views/invoices/details";
import PrivateRoute from "./components/auth/private-route";
import PublicRoute from "./components/auth/public-route";
import ClientDetails from "./views/clients/details";
import ProductDetails from "./views/products/details";

// Theme config //////
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

              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />

              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignupPage />
                  </PublicRoute>
                }
              />

              <Route
                path="/forgot-password"
                element={
                  <PublicRoute>
                    <ForgotPasswordPage />
                  </PublicRoute>
                }
              />

              {/* Protected Routes remain the same */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/invoices" element={<InvoiceList />} />
              <Route path="/invoices/:id" element={<InvoiceDetails />} />
              <Route path="/clients" element={<ClientList />} />
              <Route path="/clients/:id" element={<ClientDetails />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              {/* Catch-all route if needed */}
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
