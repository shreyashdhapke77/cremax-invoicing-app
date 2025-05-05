import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardDataGrid from "../../components/common/cx/table";
import React, { useEffect, useState } from "react";
import { clientListColumns } from "../../constants/columns/client";
import { useNavigate } from "react-router-dom";
import { DARK_THEME_BG } from "../../utils/colors";
import BaseApi from "../../services/base-api";
import { useSnackbar } from "../../components/common/context/snackbar-context";

export default function ClientList() {
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  
  const [clients, setClients] = React.useState<any[]>([]);
  
  useEffect(() => {
    const getClient = () => {
      try {
        BaseApi.get("/clients").then((res) => {
          console.log("Res -- ", res);
          if (Array.isArray(res)) {
            // Check if `res` is an array
            setClients(res); // Directly pass `res` to setMyBusiness
          }
        })
      } catch (error) {
        showMessage("Something went wrong. Please try again.", "error");
      }
    };
    getClient();
  }, []);

  return (
    <Box sx={{ backgroundColor: DARK_THEME_BG, minHeight: "100vh", px: 2 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Box>
          <Typography
            variant="body2"
            color="gray"
            textAlign="left"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="white">
            Clients
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            color: "white",
            borderColor: "gray",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
            py: 1,
            "&:hover": {
              borderColor: "white",
            },
          }}
          onClick={() => navigate('/clients/create')}
        >
          New client
        </Button>
      </Box>

      {/* Table */}
      <CardDataGrid
        rows={clients}
        columns={clientListColumns}
        pageSize={12}
        onRowClick={(params) => navigate(`/clients/${params.row.id}`)}
      />
    </Box>
  );
}
