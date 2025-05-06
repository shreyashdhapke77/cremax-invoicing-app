import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardDataGrid from "../../components/common/cx/table";
import { useNavigate } from "react-router-dom";
import { productListColumns } from "../../constants/columns/product";
import { DARK_THEME_BG } from "../../utils/colors";
import React, { useEffect } from "react";
import BaseApi from "../../services/base-api";
import { useSnackbar } from "../../components/common/context/snackbar-context";

export default function ProductList() {
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  
  const [products, setProducts] = React.useState<any[]>([]);
  
  useEffect(() => {
    const getProduct = () => {
      try {
        BaseApi.get("/products").then((res) => {
          console.log("Res -- ", res);
          if (Array.isArray(res)) {
            // Check if `res` is an array
            setProducts(res); // Directly pass `res` to setMyBusiness
          }
        })
      } catch (error) {
        showMessage("Something went wrong. Please try again.", "error");
      }
    };
    getProduct();
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
          {/* <Typography
            variant="body2"
            color="gray"
            textAlign="left"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </Typography> */}
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
          onClick={() => navigate('/products/create')}
        >
          New Product
        </Button>
      </Box>

      {/* Table */}
      <CardDataGrid
        rows={products}
        columns={productListColumns}
        pageSize={12}
        onRowClick={(params) => navigate(`/products/${params.row.id}`)}
      />
    </Box>
  );
}
