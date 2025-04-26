import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardDataGrid from "../../components/common/cx/table";
import { clients } from "../../constants/client-list";
import { clientListColumns } from "../../constants/columns/client";
import { useNavigate } from "react-router-dom";

export default function ClientList() {
  const navigate = useNavigate();
  return (
    <Box sx={{ backgroundColor: "#111", minHeight: "100vh", padding: 2 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
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
        pageSize={10}
        onRowClick={(params) => navigate(`/clients/${params.row.id}`)}
      />
    </Box>
  );
}
