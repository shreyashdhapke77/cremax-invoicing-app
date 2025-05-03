import { Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { GREY_BACKGROUND_HOVER } from "../../utils/colors";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CircleIcon from '@mui/icons-material/Circle';
import { useNavigate } from "react-router-dom";

export const Business = () => {
  const navigate = useNavigate()
  const myBusiness = [
    { id: 1, name: "Business 1" },
    { id: 2, name: "Business 2" },
    { id: 3, name: "Business 3" },
  ];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        onClick={handleOpenNavMenu}
      >
        Business Name{" "}
        {anchorElNav ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
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
        {myBusiness.map(({ id, name }) => (
          <MenuItem onClick={handleCloseNavMenu} sx={{ gap: 1, mb: 1 }}>
            {<CircleIcon fontSize="small" color="success" />}{name}
          </MenuItem>
        ))}

        <Divider sx={{ my: 1, borderColor: "#444" }} />

        <MenuItem onClick={handleCloseNavMenu} sx={{ gap: 1, mb: 1 }}>
          <SettingsIcon fontSize="medium" />
          Business settings
        </MenuItem>

        <MenuItem onClick={() => navigate('/business/create')} sx={{ gap: 1, mb: 1 }}>
          <AddIcon fontSize="medium" />
          Add business
        </MenuItem>
      </Menu>
    </Box>
  );
};
