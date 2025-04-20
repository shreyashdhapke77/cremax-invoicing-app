import { Component, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // Import transition components
import { Box } from "@mui/material";
import ScrollToTop from "./components/common/scroll-to-top";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPage from "./views/login";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./views/home";
import SignupPage from "./views/signup";
import ForgotPasswordPage from "./views/forgot-password";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function AppRoutes() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname} // Ensure animation triggers on location change
        nodeRef={nodeRef} 
        in={true}
        timeout={500} // Set timeout for the animation
        classNames="page" // Use this class for animations
      >
        <Box ref={nodeRef}>
          <Routes location={location}>
            <Route path="/">
              <Route index element={<Home />} />
            </Route>
            <Route path="/login">
              <Route index element={<LoginPage />} />
            </Route>
            <Route path="/signup">
              <Route index element={<SignupPage />} />
            </Route>
            <Route path="/forgot-password">
              <Route index element={<ForgotPasswordPage />} />
            </Route>
          </Routes>
        </Box>
      </CSSTransition>
    </TransitionGroup>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ScrollToTop />
            <div className="fixed-header">
              <Header />
            </div>
            <div className="main-content">
              <AppRoutes />
              <Footer />
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
