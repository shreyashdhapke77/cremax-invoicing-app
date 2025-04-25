import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
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
import { products } from "../../constants/product-list";

export default function ProductDetails() {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const productDetails = products.find((product) => product.id === Number(id));
  const [formData, setFormData] = useState({
    name: productDetails?.name,
    productNo: productDetails?.productNo,
    price: productDetails?.price,
    taxCode: productDetails?.taxCode,
    totalPrice: 56.2,
    updatedAt: "27/1/2025",
    timesInvoiced: productDetails?.timesInvoiced,
    totalInvoiced: productDetails?.totalInvoiced,
  });

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    console.log("Saved data:", formData);
    setIsEditing(false);
  };

  const responsiveBox = { width: { xs: "100%", sm: "48%" } };

  return (
    <Box sx={{ p: 4, bgcolor: "#1e1e1e", minHeight: "100vh", color: "white" }}>
      {/* Header */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        {formData.name}
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="inherit"
        indicatorColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab label="Product Info" />
        <Tab label="History" />
      </Tabs>

      <Divider sx={{ borderColor: "grey.800", mb: 4 }} />

      {/* Content */}
      {!isEditing ? (
        <>
          {/* Client Info Card */}
          <Card sx={{ bgcolor: "#2e2e2e", color: "#fff", mb: 4 }}>
            <CardContent>
              <Typography
                textAlign="left"
                fontWeight="bold"
                variant="h5"
                sx={{ mb: 1 }}
              >
                {formData.name}
              </Typography>
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
                    <Typography noWrap textAlign="left" variant="subtitle1">
                      Product number :
                    </Typography>
                    <Typography noWrap textAlign="left" variant="subtitle1">
                      Price excl. GST :
                    </Typography>
                    <Typography noWrap textAlign="left" variant="subtitle1">
                      Tax code :
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 3 }}>
                    <Typography textAlign="left" variant="subtitle1" noWrap>
                      {formData.productNo}
                    </Typography>
                    <Typography textAlign="left" variant="subtitle1">
                      {formData.price}
                    </Typography>
                    <Typography textAlign="left" variant="subtitle1">
                      {formData.taxCode}
                    </Typography>
                  </Box>
                </Box>

                {/* Right side: Action Buttons */}
                <Box
                  display="flex"
                  gap={2}
                  mt={{ xs: 2, sm: 0 }} // add margin top only in mobile
                >
                  <Button
                    onClick={handleEdit}
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{
                      color: "white",
                      borderColor: "grey.600",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "grey.800",
                        borderColor: "white",
                      },
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<ArchiveIcon />}
                    sx={{
                      color: "white",
                      borderColor: "grey.600",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "grey.800",
                        borderColor: "white",
                      },
                    }}
                  >
                    Archive
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Invoice Summary */}
          <Card sx={{ bgcolor: "#3e3e3e", color: "#fff" }}>
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
                  <Typography
                    variant="body2"
                    sx={{
                      mt: {
                        xs: 1,
                        sm: 0,
                        lg: 0,
                        xl: 0,
                      },
                    }}
                  >
                    Last changed
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      mt: {
                        xs: 0,
                        sm: 1,
                        lg: 1,
                        xl: 1,
                      },
                    }}
                  >
                    {productDetails?.updatedAt}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: {
                        xs: 1,
                        sm: 0,
                        lg: 0,
                        xl: 0,
                      },
                    }}
                  >
                    Times invoiced
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      mt: {
                        xs: 0,
                        sm: 1,
                        lg: 1,
                        xl: 1,
                      },
                    }}
                  >
                    {productDetails?.timesInvoiced}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: {
                        xs: 1,
                        sm: 0,
                        lg: 0,
                        xl: 0,
                      },
                    }}
                  >
                    Total invoiced
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      mt: {
                        xs: 0,
                        sm: 1,
                        lg: 1,
                        xl: 1,
                      },
                    }}
                  >
                    {productDetails?.totalInvoiced}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </>
      ) : (
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
                    value={formData.productNo}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{ style: { color: "white" } }}
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      ".MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#777" },
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                </Box>

                {/* Product Name */}
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="Product name (this will appear on the invoice) *"
                    name="productName"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{ style: { color: "white" } }}
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      ".MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#777" },
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                </Box>

                {/* Tax Code */}
                <Box sx={responsiveBox}>
                  <TextField
                    select
                    fullWidth
                    label="Tax code *"
                    name="taxCode"
                    value={formData.taxCode}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{ style: { color: "white" } }}
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      ".MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#777" },
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
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
                    value={formData.taxCode}
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
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      ".MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#777" },
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                </Box>

                {/* Unit Price */}
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="Unit price *"
                    name="unitPrice"
                    value={formData.price}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{ style: { color: "white" } }}
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      ".MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#777" },
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                </Box>

                {/* GST Include/Exclude radio */}
                <Box sx={responsiveBox}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      name="gstIncluded"
                      value={formData.totalPrice}
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
                  <Typography variant="h6" sx={{ color: "white" }}>
                    Total price (incl. GST):{" "}
                    <strong>{formData.totalPrice}</strong>
                  </Typography>
                </Box>
              </Box>

              {/* Buttons */}
              <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                <Button
                  onClick={handleCancel}
                  variant="outlined"
                  sx={{ color: "white", borderColor: "grey.500" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="success"
                >
                  Save
                </Button>
              </Box>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}
