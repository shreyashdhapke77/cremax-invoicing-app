import React, { useState, useEffect, useMemo } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PercentIcon from "@mui/icons-material/Percent";
import { useParams } from "react-router-dom";
import { DARK_THEME_BG, WHITE } from "../../utils/colors";
import { Client } from "../../types";
import BaseApi from "../../services/base-api";
import { useSnackbar } from "../../components/common/context/snackbar-context";
import CmxText from "../../components/common/cmx-text";

export default function ClientDetails() {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { showMessage } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const { id } = useParams();

  const initialClientData: Client = {
    businessId: "",
    name: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    state: "",
    city: "",
    country: "",
    cin: "",
    gstin: "",
    email: "",
    cc: "",
    phoneNumber: "",
    fixedDiscount: 0,
    status: "inactive",
  };
  
  const [formData, setFormData] = useState(initialClientData);

  const [client, setClient] = React.useState<Client[]>([]);

  useEffect(() => {
    const getClientById = () => {
      try {
        BaseApi.get(`/clients/${id}`).then((res) => {
          console.log("Res -- ", res);
          setClient(res); // Directly pass `res` to setMyBusiness
          setFormData(res); // Set formData with the response
        })
      } catch (error) {
        showMessage("Something went wrong. Please try again.", "error");
      }
    };
    getClientById();
  }, []);

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

  // Memoized styles for responsive boxes
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
  }),
  []
);

  return (
    <Box sx={{ p: 4, bgcolor: DARK_THEME_BG, minHeight: "100vh", color: "white" }}>
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
        <Tab label="Client Info" />
        <Tab label="Invoices" />
        <Tab label="Invoice Drafts" />
      </Tabs>

      <Divider sx={{ borderColor: "grey.800", mb: 4 }} />

      {/* Content */}
      {!isEditing ? (
        <>
          {/* Client Info Card */}
          <Card sx={{ bgcolor: "#2e2e2e", color: WHITE, mb: 4 }}>
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
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography textAlign="left" variant="body2">
                    {formData.addressLine1}
                  </Typography>
                  <Typography textAlign="left" variant="body2">
                    {formData.city}, {formData.state}, {formData.postalCode}
                  </Typography>
                  <Typography textAlign="left" variant="body2">
                    {formData.country}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  gap={2}
                  sx={{
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                      lg: "row",
                      xl: "row",
                    },
                  }}
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
                    Number of invoices
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
                    {/* {client?.numberOfInvoices || 0} */}
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
                    {/* {client?.totalInvoiced || 0} */}
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
                    Total unpaid
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
                    {/* {client?.totalUnpaid || 0} */}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Edit Form */}
          <Card sx={{ bgcolor: "#2e2e2e" }}>
            <CardContent>
              <Box
                component="form"
                display="flex"
                flexWrap="wrap"
                gap={2}
                justifyContent="space-between"
              >
                <CmxText label='Edit Client' align='left' isBold variant = "h5" />
                {/* Full width fields */}
                <Box width="100%">
                  <TextField
                    fullWidth
                    label="Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>

                <Box width="100%">
                  <TextField
                    fullWidth
                    label="Address line *"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>

                <Box width="100%">
                  <TextField
                    fullWidth
                    label="Address line 2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>

                {/* Half width fields */}
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="Postal code *"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="State *"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>

                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="CIN"
                    name="cin"
                    value={formData.cin}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="GSTIN"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>

                {/* Email and CC */}
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "white" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="Cc"
                    name="cc"
                    value={formData.cc}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "white" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />
                </Box>

                {/* City/Suburb and Country */}
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="City/Suburb *"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    select
                    label="Country *"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  >
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                  </TextField>
                </Box>

                {/* Phone and Discount */}
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="Phone number"
                    name="phone"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: "white" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />
                </Box>
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="Fixed discount"
                    name="fixedDiscount"
                    value={formData.fixedDiscount}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PercentIcon sx={{ color: "white" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />
                </Box>
              </Box>
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
