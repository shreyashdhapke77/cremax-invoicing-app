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

const userProfile = ["Profile", "Account", "Dashboard", "Logout"];

function PrivateHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session or token
    localStorage.removeItem("access_token"); // or sessionStorage if you're using that
    // Redirect to login page
    handleCloseUserMenu();
    navigate("/login");
    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1eaf4b",
        height: "64px",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", px: 2 }}>
          {/* Hamburger icon + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton size="large" edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{ textDecoration: "none", fontWeight: 700, color: "white" }}
            >
              conta
            </Typography>
          </Box>

          {/* Company Switcher */}
          <Typography
            variant="subtitle1"
            color="white"
            sx={{ fontWeight: 400 }}
          >
            <b>CREMAX GROUP</b> | Amul Ice Cream{" "}
            <Box component="span" sx={{ pl: 1 }}>
              ▼
            </Box>
          </Typography>

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
            }}
          >
            <Box sx={{ px: 2, pb: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Cremax Group
              </Typography>
            </Box>

            <MenuItem onClick={handleCloseUserMenu} sx={{ gap: 1 }}>
              <SettingsIcon fontSize="small" />
              Personal settings
            </MenuItem>

            <MenuItem sx={{ gap: 1 }}>
              <DarkModeIcon fontSize="small" />
              Dark mode
              <Box sx={{ flexGrow: 1 }} />
              <Switch size="small" />
            </MenuItem>

            <Divider sx={{ my: 1, borderColor: "#444" }} />

            <MenuItem onClick={handleLogout} sx={{ gap: 1 }}>
              <LogoutIcon fontSize="small" />
              Log out
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default PrivateHeader;
