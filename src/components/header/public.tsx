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
  Button,
  Tooltip,
  MenuItem,
  Fade,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";

const pages = ["For individuals", "For businesses", "Pricing", "Resources"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function PublicHeader() {
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

  return (
    <Fade in timeout={800}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#000",
          boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* Logo */}
            <AdbIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "white",
              }}
            />
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                fontFamily: "monospace",
                letterSpacing: ".15rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Mobile Logo */}
            <AdbIcon
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                color: "white",
              }}
            />
            <Typography
              variant="h5"
              component="a"
              href="/"
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                fontFamily: "monospace",
                letterSpacing: ".15rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            {/* Nav Links - Desktop */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                gap: 2,
                ml: 3,
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: "white",
                    fontWeight: 500,
                    textTransform: "none",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "0%",
                      height: "2px",
                      bottom: 0,
                      left: 0,
                      backgroundColor: "#fff",
                      transition: "width 0.3s",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* Right Side - Auth Buttons & Avatar */}
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              {/* Login Button */}
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderColor: "#00e676",
                  color: "#00e676",
                  fontWeight: 600,
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(0, 230, 118, 0.1)", // subtle green hover
                    borderColor: "#00c853",
                    color: "#00c853",
                    transform: "translateY(-2px) scale(1.03)",
                    boxShadow: "0 0 10px rgba(0, 230, 118, 0.3)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              {/* Sign Up Button */}
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#00e676", // bright green
                  color: "#000",
                  fontWeight: 600,
                  boxShadow: "0 2px 10px rgba(0, 230, 118, 0.3)",
                  "&:hover": {
                    backgroundColor: "#00c853",
                    transform: "translateY(-2px) scale(1.05)",
                    boxShadow: "0 4px 20px rgba(0, 230, 118, 0.5)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up for Free
              </Button>

              {/* Avatar */}
              {false && (
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
              )}

              {/* Avatar Menu */}
              {false && (
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Fade>
  );
}

export default PublicHeader;
