import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { Switch, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GREY_BACKGROUND_HOVER } from "../../utils/colors";
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useAuth } from "../common/context/auth-context";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Business } from "./business";
import { Businesses } from "../../types";

const userProfile = ["Profile", "Account", "Dashboard", "Logout"];

function PrivateHeader() {
   const [myBusiness, setMyBusiness] = React.useState<Businesses | null>(null);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  React.useEffect(() => {
    const stored = localStorage.getItem("selectedBusiness");
    if (stored) {
      setMyBusiness(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    // Clear session or token
    localStorage.removeItem("accessToken"); // or sessionStorage if you're using that
    localStorage.removeItem("selectedBusiness");
    // Redirect to login page
    handleCloseUserMenu();
    logout();
    navigate("/login");
    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#003A6B", //"#073965",//"#0C243D", //"#003366", //#003A6B
        height: "64px",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", px: 2 }}>
          {/* Hamburger icon + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              sx={{
                // mt: 1.5,
                "& .MuiPaper-root": {
                  borderRadius: 2,
                  backgroundColor: "#2c2c2c",
                  color: "white",
                  minWidth: 220,
                  p: 1,
                },
                "& .MuiMenuItem-root": {
                  "&:hover": {
                    backgroundColor: GREY_BACKGROUND_HOVER,
                  },
                },
              }}
            >
              <MenuItem disabled sx={{ gap: 1, mb: 1 }}>
              {myBusiness?.name ? myBusiness?.name : "Business Name"}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu()
                  navigate('/business/create')
                }}
                sx={{ gap: 1, mb: 1 }}
              >
                <AddIcon fontSize="medium" />
                Add business
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu} sx={{ gap: 1, mb: 1 }}>
                <SwapHorizIcon fontSize="medium" />
                Change business
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu} sx={{ gap: 1, mb: 1 }}>
                <SettingsIcon fontSize="medium" />
                Business settings
              </MenuItem>

              <Divider sx={{ my: 1, borderColor: "#444" }} />

              <MenuItem onClick={handleCloseUserMenu} sx={{ gap: 1, mb: 1 }}>
                <AddIcon fontSize="medium" />
                New invoice
              </MenuItem>

              <MenuItem onClick={() => { navigate('/invoices'); handleCloseNavMenu() }} sx={{ gap: 1, mb: 1 }}>
                <ReceiptIcon fontSize="medium" />
                Invoices
              </MenuItem>

              <MenuItem onClick={() => { navigate('/clients'); handleCloseNavMenu() }} sx={{ gap: 1, mb: 1 }}>
                <ContactPageIcon fontSize="medium" />
                Clients
              </MenuItem>

              <MenuItem onClick={() => { navigate('/products'); handleCloseNavMenu() }} sx={{ gap: 1, mb: 1 }}>
                <AddShoppingCartIcon fontSize="medium" />
                Products
              </MenuItem>

              <Divider sx={{ my: 1, borderColor: "#444" }} />

              <MenuItem onClick={handleLogout} sx={{ gap: 1, mb: 1 }}>
                <InfoOutlineIcon fontSize="medium" />
                Help Center
              </MenuItem>

              <MenuItem onClick={handleLogout} sx={{ gap: 1, mb: 1 }}>
                <SupportAgentIcon fontSize="medium" />
                Contact Support
              </MenuItem>
            </Menu>
          </Box>

          {/* Company Switcher */}
          {/* <Typography
            variant="subtitle1"
            color="white"
            sx={{ fontWeight: 400 }}
          >
            <b>CREMAX GROUP</b> | Amul Ice Cream{" "}
            <Box component="span" sx={{ pl: 1 }}>
              ▼
            </Box>
          </Typography> */}
          <Business />

          {/* Profile Icon */}
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                ml: 1,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 0 0 4px rgba(255,255,255,0.2)",
                },
                transition: "0.3s",
              }}
            >
              <Avatar
                alt="User"
                src="/static/images/avatar/2.jpg"
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{
              mt: 1.5,
              "& .MuiPaper-root": {
                borderRadius: 2,
                backgroundColor: "#2c2c2c",
                color: "white",
                minWidth: 220,
                p: 1,
              },
              "& .MuiMenuItem-root": {
                "&:hover": {
                  backgroundColor: GREY_BACKGROUND_HOVER,
                },
              },
            }}
          >
            <Box sx={{ px: 2, pb: 1 }}>
              <Typography variant="h5" fontWeight={600}>
                Cremax Group
              </Typography>
            </Box>

            <MenuItem onClick={handleCloseUserMenu} sx={{ gap: 1 }}>
              <SettingsIcon fontSize="medium" />
              Personal settings
            </MenuItem>

            <MenuItem sx={{ gap: 1 }}>
              <DarkModeIcon fontSize="medium" />
              Dark mode
              <Box sx={{ flexGrow: 1 }} />
              <Switch size="medium" />
            </MenuItem>

            <Divider sx={{ my: 1, borderColor: "#444" }} />

            <MenuItem onClick={handleLogout} sx={{ gap: 1 }}>
              <LogoutIcon fontSize="medium" />
              Log out
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default PrivateHeader;
