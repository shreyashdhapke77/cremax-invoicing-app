import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardDataGrid from "../../components/common/cx/table";
import React, { useEffect } from "react";
import { clientListColumns } from "../../constants/columns/client";
import { useNavigate } from "react-router-dom";
import { DARK_THEME_BG } from "../../utils/colors";
import BaseApi from "../../services/base-api";
import { useSnackbar } from "../../components/common/context/snackbar-context";
import CmxText from "../../components/common/cmx-text";
import CmxButton from "../../components/common/cmx-button";
import ContactPageIcon from "@mui/icons-material/ContactPage";

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
          <CmxText label='Home' variant="body2" sx={{ mb: 2 }} color="gray" onClick={() => navigate("/dashboard")}/>
          <ContactPageIcon fontSize="medium" />
          <CmxText label='Clients' isBold variant="h4" sx={{ mb: 2 }} color="white"/>
        </Box>
        <CmxButton
          startIcon={<AddIcon />}
          variant="outlined" 
          color="success"
          size="small"
          label='New Client'
          fullWidth={false}
          type="submit"
          onClick={() => navigate('/clients/create')}
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
        />
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
