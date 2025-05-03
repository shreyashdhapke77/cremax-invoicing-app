import { Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { GREY_BACKGROUND_HOVER } from "../../utils/colors";
import React, { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";
import BaseApi from "../../services/base-api";
import CmxText from "../common/cmx-text";
import { useSnackbar } from "../common/context/snackbar-context";

type Businesses = {
  id: string;
  name: string;
  user_id: number;
  cin: string;
  gstin: string;
  address_line_1: string;
  address_line_2: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
  phone_number: string;
  website: string;
  email: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export const Business = () => {
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  const [myBusiness, setMyBusiness] = useState<Businesses[]>([]);
  const [mySelectedBusiness, setMySelectedBusiness] = useState<null | Businesses>(null);

  // const myBusiness = [
  //   { id: 1, name: "Business 1" },
  //   { id: 2, name: "Business 2" },
  //   { id: 3, name: "Business 3" },
  // ];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  useEffect(() => {
    const getBusiness = async () => {
      try {
        const res = await BaseApi.get("/businesses/my-businesses");
        console.log("Res -- ", res);
        if (Array.isArray(res)) {
          // Check if `res` is an array
          setMyBusiness(res); // Directly pass `res` to setMyBusiness
          if (!mySelectedBusiness && res.length) {
            const stored = localStorage.getItem("selectedBusiness");
            console.log("stored -- > ", stored);
            if (stored) {
              setMySelectedBusiness(JSON.parse(stored));
            } else {
              setMySelectedBusiness(res[0]);
            }
          }
        }
      } catch (error) {
        showMessage("Something went wrong. Please try again.", "error");
      }
    };

    getBusiness();
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const menuSelectAction = (business: Businesses) => {
    localStorage.setItem("selectedBusiness", JSON.stringify(business));
    setMySelectedBusiness(business);
    handleCloseNavMenu()
    window.location.reload()
  }
  const handleCloseNavMenu = () => setAnchorElNav(null);

  console.log("anchorElNav -- ",anchorElNav)
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        onClick={handleOpenNavMenu}
      >
        {mySelectedBusiness?.name ? mySelectedBusiness?.name : "Business Name"}{" "}
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
        {myBusiness.length ? (
          myBusiness.map((item) => (
            <MenuItem onClick={() => menuSelectAction(item)} sx={{ gap: 1, mb: 1 }}>
              {<CircleIcon fontSize="small" color="success" />}
              {item.name}
            </MenuItem>
          ))
        ) : (
          <CmxText label={"No businesses exist."} />
        )}

        <Divider sx={{ my: 1, borderColor: "#444" }} />

        <MenuItem onClick={handleCloseNavMenu} sx={{ gap: 1, mb: 1 }}>
          <SettingsIcon fontSize="medium" />
          Business settings
        </MenuItem>

        <MenuItem
          onClick={() => navigate("/business/create")}
          sx={{ gap: 1, mb: 1 }}
        >
          <AddIcon fontSize="medium" />
          Add business
        </MenuItem>
      </Menu>
    </Box>
  );
};
