import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardDataGrid from "../../components/common/cx/table";
import { useNavigate } from "react-router-dom";
import { productListColumns } from "../../constants/columns/product";
import { products } from "../../constants/product-list";

export default function ProductList() {
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
            Products
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
        >
          New product
        </Button>
      </Box>

      {/* Table */}
      <CardDataGrid
        rows={products}
        columns={productListColumns}
        pageSize={10}
        onRowClick={(params) => navigate(`/products/${params.row.id}`)}
      />
    </Box>
  );
}
