import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Divider,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import PercentIcon from "@mui/icons-material/Percent";
import { useParams } from "react-router-dom";
import { DARK_THEME_BG, WHITE } from "../../utils/colors";
import { Product } from "../../types";
import BaseApi from "../../services/base-api";
import { useSnackbar } from "../../components/common/context/snackbar-context";
import CmxText from "../../components/common/cmx-text";

export default function ProductDetails() {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { showMessage } = useSnackbar();


  useEffect(() => {
    const getProductById = () => {
      try {
        BaseApi.get(`/products/${id}`).then((res) => {
          console.log("Res -- ", res);
          setProduct(res); // Directly pass `res` to setMyBusiness
        })
      } catch (error) {
        showMessage("Something went wrong. Please try again.", "error");
      }
    };
    getProductById();
  }, []);

  const initialProductData: Product = {
    name: '',
    productNo: '',
    price: 0,
    taxCode: '',
    totalPrice: 0,
    updatedAt: '',
    timesInvoiced: '',
    totalInvoiced: '',
  };


  const [product, setProduct] = useState<Product>(initialProductData);

  const handleTabChange = (event: any, newValue: any) => setTabValue(newValue);


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => setIsEditing(false)

  
  const responsiveBox = useMemo(() => ({ width: { xs: "100%", sm: "48%" } }), []);
  const textFieldStyles = useMemo(
    () => ({
    input: { color: "white" },
    label: { color: "white" },
    ".MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#777" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },
    },
  }), []);

  const CustomButton = ({ label, onClick, variant = "outlined", startIcon, color = "white" }: any) => (
    <Button
      onClick={onClick}
      variant={variant}
      startIcon={startIcon}
      sx={{
        color,
        borderColor: "grey.600",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "grey.800",
          borderColor: "white",
        },
      }}
    >
      {label}
    </Button>
  );
  const ProductTabs = ({ value, onChange }: any) => (
    <Tabs
      value={value}
      onChange={onChange}
      textColor="inherit"
      indicatorColor="primary"
      sx={{ mb: 2 }}
    >
      <Tab label="Product Info" />
      <Tab label="History" />
    </Tabs>
  );
  
  const editingFields = (
    <>
      {/* Product Info Card */}
      <Card sx={{ bgcolor: "#2e2e2e", color: WHITE, mb: 4 }}>
        <CardContent>
        <CmxText label={product.name} align='left' isBold variant="h5" sx={{ mb: 1 }}/>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
          >
            {/* Left side: Labels and Values */}
            <Box display="flex">
              <Box display="block">
                <CmxText noWrap label='Product number :' align='left' variant="subtitle1"/>
                <CmxText noWrap label='Price excl. GST :' align='left' variant="subtitle1"/>
                <CmxText noWrap label='Tax code :' align='left' variant="subtitle1"/>
              </Box>
              <Box sx={{ ml: 3 }}>
                <CmxText noWrap label={product.productNo} align='left' variant="subtitle1"/>
                <CmxText noWrap label={String(product.price)} align='left' variant="subtitle1"/>
                <CmxText noWrap label={product.taxCode} align='left' variant="subtitle1"/>
               
              </Box>
            </Box>

            {/* Right side: Action Buttons */}
            <Box
              display="flex"
              gap={2}
              mt={{ xs: 2, sm: 0 }} // add margin top only in mobile
            >
              <CustomButton label="Edit" onClick={handleEdit} startIcon={<EditIcon />} />
              <CustomButton label="Archive" startIcon={<ArchiveIcon />} />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Invoice Summary */}
      <Card sx={{ bgcolor: "#3e3e3e", color: WHITE }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-around"
            textAlign="center"
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
                lg: "row",
                xl: "row",
              },
            }}
          >
            <Box>
              <CmxText label='Last changed' variant="body2" sx={{ mt: { xs: 1, sm: 0, lg: 0, xl: 0 }}}/>
              <CmxText label={product?.updatedAt} variant="h6" sx={{ mt: { xs: 0, sm: 1, lg: 1, xl: 1 }}}/>
            </Box>
            <Box>
              <CmxText label='Times invoiced' variant="body2" sx={{ mt: { xs: 1, sm: 0, lg: 0, xl: 0 }}}/>
              <CmxText label={product?.timesInvoiced} variant="h6" sx={{ mt: { xs: 0, sm: 1, lg: 1, xl: 1 }}}/>
            </Box>
            <Box>
              <CmxText label='Total invoiced' variant="body2" sx={{ mt: { xs: 1, sm: 0, lg: 0, xl: 0 }}}/>
              <CmxText label={product?.totalInvoiced} variant="h6" sx={{ mt: { xs: 0, sm: 1, lg: 1, xl: 1 }}}/>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  )

  const notEditingFields = (
    <>
      {/* Edit Form */}
      <Card sx={{ bgcolor: "#2e2e2e", p: 2 }}>
        <CardContent>
          <Box
            component="form"
            display="flex"
            flexWrap="wrap"
            gap={2}
            justifyContent="space-between"
          >
            {/* Product No. */}
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="Product no."
                name="productNo"
                value={product.productNo}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{ style: { color: "white" } }}
                sx={textFieldStyles}
              />
            </Box>

            {/* Product Name */}
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="Product name (this will appear on the invoice) *"
                name="productName"
                value={product.name}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{ style: { color: "white" } }}
                sx={textFieldStyles}
              />
            </Box>

            {/* Tax Code */}
            <Box sx={responsiveBox}>
              <TextField
                select
                fullWidth
                label="Tax code *"
                name="taxCode"
                value={product.taxCode}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{ style: { color: "white" } }}
                sx={textFieldStyles}
              >
                {/* Example tax codes */}
                <MenuItem value="0%">0% - Exports, Food, etc.</MenuItem>
                <MenuItem value="5%">5% - Reduced rate</MenuItem>
              </TextField>
            </Box>

            {/* GST */}
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="GST *"
                name="gst"
                value={product.taxCode}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PercentIcon sx={{ color: "white" }} />
                    </InputAdornment>
                  ),
                  style: { color: "white" },
                }}
                sx={textFieldStyles}
              />
            </Box>

            {/* Unit Price */}
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="Unit price *"
                name="unitPrice"
                value={product.price}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{ style: { color: "white" } }}
                sx={textFieldStyles}
              />
            </Box>

            {/* GST Include/Exclude radio */}
            <Box sx={responsiveBox}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  name="gstIncluded"
                  value={product.totalPrice}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="included"
                    control={<Radio sx={{ color: "white" }} />}
                    label="Including GST"
                    sx={{ color: "white" }}
                  />
                  <FormControlLabel
                    value="excluded"
                    control={<Radio sx={{ color: "white" }} />}
                    label="Excluding GST"
                    sx={{ color: "white" }}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Total price */}
            <Box sx={{ width: "100%", textAlign: "right", mt: 2 }}>
              <CmxText label={'Total price (incl. GST): '} variant="h6" sx={{ color: "white" }}/>
              <CmxText label={String(product.totalPrice || 0)} isBold variant="h6" sx={{ color: "white" }}/>
            </Box>
          </Box>

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <CustomButton label="Cancel" onClick={handleCancel} />
            <CustomButton label="Save" onClick={handleSave} variant="contained" color="success" />
          </Box>
        </CardContent>
      </Card>
    </>
  )

  return (
    <Box sx={{ p: 4, bgcolor: DARK_THEME_BG, minHeight: "100vh", color: "white" }}>
      <CmxText label={product.name} isBold variant="h4" sx={{ mb: 2 }} />
  
      <ProductTabs value={tabValue} onChange={handleTabChange} />

      <Divider sx={{ borderColor: "grey.800", mb: 4 }} />

      {/* Content */}
      {isEditing ? editingFields : notEditingFields}
    </Box>
  );
}
