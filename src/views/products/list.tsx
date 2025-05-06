import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardDataGrid from "../../components/common/cx/table";
import { useNavigate } from "react-router-dom";
import { productListColumns } from "../../constants/columns/product";
import { DARK_THEME_BG } from "../../utils/colors";
import React, { useEffect } from "react";
import BaseApi from "../../services/base-api";
import { useSnackbar } from "../../components/common/context/snackbar-context";
import { Product } from "../../types";
import CmxText from "../../components/common/cmx-text";
import CmxButton from "../../components/common/cmx-button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function ProductList() {
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  
  const [products, setProducts] = React.useState<Product[]>([]);
  
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
         {/* <CmxText label='Home' variant="body2" sx={{ mb: 2 }} color="gray" onClick={() => navigate("/dashboard")}/> */}
          <AddShoppingCartIcon fontSize="medium" /> 
          <CmxText label='Products' isBold variant="h4" sx={{ mb: 2 }} color="white"/>
        </Box>

        <CmxButton 
          startIcon={<AddIcon />}
          variant="outlined" 
          color="success"
          size="small"
          label='New Product'
          fullWidth={false}
          type="submit"
          onClick={() => navigate('/products/create')}
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
        rows={products}
        columns={productListColumns}
        pageSize={12}
        onRowClick={(params) => navigate(`/products/${params.row.id}`)}
      />
    </Box>
  );
}
