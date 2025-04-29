import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";
import ScrollToTop from "./components/common/scroll-to-top";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./views/home";
import SignupPage from "./views/login-signup/signup";
import ForgotPasswordPage from "./views/login-signup/forgot-password";
import Dashboard from "./views/dashboard";
import InvoiceList from "./views/invoices/list";
import ClientList from "./views/clients/list";
import ProductList from "./views/products/list";
import InvoiceDetails from "./views/invoices/details";
import ClientDetails from "./views/clients/details";
import ProductDetails from "./views/products/details";
import LoginPage from "./views/login-signup/login";
import AppBreadcrumbs from "./components/bread-crumbs";
import InvoiceCreate from "./views/invoices/create";
import { ClientsCreate } from "./views/clients/create";
import GlobalLoader from "./components/common/global-loader";
import {
  LoaderProvider,
  useLoader,
} from "./components/common/context/loader-context";
import { SnackbarProvider } from "./components/common/context/snackbar-context";
import { ProductCreate } from "./views/products/create";
import {
  AuthProvider,
  useAuth,
} from "./components/common/context/auth-context";
import { ProtectedRoute } from "./components/auth/private-route";
import SettingsPage from "./views/user-settings/settings";

// Theme config //////
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const AppContent: React.FC = () => {
  const { loading } = useLoader();
  const { isLoggedIn } = useAuth();

  return (
    <Box className="main-content">
      {isLoggedIn && <AppBreadcrumbs />}
      <GlobalLoader loading={loading} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Routes remain the same */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <InvoiceList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoices/:id"
          element={
            <ProtectedRoute>
              <InvoiceDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoices/create"
          element={
            <ProtectedRoute>
              <InvoiceCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <ClientList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients/:id"
          element={
            <ProtectedRoute>
              <ClientDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients/create"
          element={
            <ProtectedRoute>
              <ClientsCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/create"
          element={
            <ProtectedRoute>
              <ProductCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        {/* Catch-all route if needed */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <ScrollToTop />
          <Box className="App">
            <Box className="fixed-header">
              <Header />
            </Box>
            <LoaderProvider>
              <SnackbarProvider>
                <AppContent />
              </SnackbarProvider>
            </LoaderProvider>
            <Footer />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
