import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  IconButton,
  FormControl,
  Select,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import {
  Person,
  Lock,
  Notifications,
  Business,
  Language,
  SyncAlt,
  Add,
  Edit,
} from "@mui/icons-material";
import { DARK_THEME_BG } from "../../utils/colors";

const sidebarItems = [
  { label: "Personal info", icon: <Person /> },
  { label: "Security settings", icon: <Lock /> },
  { label: "Notifications", icon: <Notifications /> },
  { label: "My businesses", icon: <Business />, selected: true },
  { label: "Language", icon: <Language /> },
];

const businesses = [
  "CREMAX GROUP | Dairy Products",
  "CREMAX GROUP",
  "CREMAX GROUP | Amul Ice Cream (Current)",
];

const SettingsPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [selected, setSelected] = useState("My businesses");

  const handleSelect = (event: any) => {
    setSelected(event.target.value);
  };
  return (
    <Box display="flex" height="100vh" bgcolor="#121212" p={2} color="white">
      {/* Sidebar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", lg: "row", xl: "row" },
        }}
        pr={isMobile ? 0 : 3}
      >
        {!isMobile && (
          // Desktop view: Full sidebar
          <List disablePadding>
            {sidebarItems.map((item) => (
              <ListItemButton
                key={item.label}
                selected={selected === item.label}
                onClick={() => setSelected(item.label)}
                sx={{
                  borderRadius: 2,
                  my: 0.5,
                  bgcolor: selected === item.label ? DARK_THEME_BG : undefined,
                  "&.Mui-selected": {
                    bgcolor: DARK_THEME_BG,
                    borderLeft: "4px solid #2979ff",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>

      {/* Main Content */}
      <Box flex={1} pl={3} display="flex" flexDirection="column" gap={2}>
        {isMobile && (
          // Mobile view: Dropdown select
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select
              value={selected}
              onChange={handleSelect}
              displayEmpty
              sx={{
                bgcolor: "#2a2a2a",
                color: "white",
                borderRadius: 3,
                ".MuiSvgIcon-root": { color: "white" },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#555",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#888",
                },
              }}
            >
              {sidebarItems.map((item) => (
                <MenuItem key={item.label} value={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button
          startIcon={<Add />}
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "gray",
            borderRadius: 2,
            px: 3,
          }}
        >
          Add business
        </Button>
        <Button
          startIcon={<Edit />}
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "gray",
            borderRadius: 2,
            px: 3,
          }}
        >
          Edit active business
        </Button>

        <Typography textAlign="left" variant="body2" color="gray">
          Business name
        </Typography>

        {/* Business List */}
        <Stack spacing={1}>
          {businesses.map((name) => (
            <Box
              key={name}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="#2a2a2a"
              px={2}
              py={1.5}
              borderRadius={2}
            >
              <Typography textAlign="left">{name}</Typography>
              <IconButton sx={{ color: "white" }}>
                <SyncAlt />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default SettingsPage;
