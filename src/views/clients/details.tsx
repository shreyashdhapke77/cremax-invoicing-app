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
  
  const [client, setClient] = useState<Client>(initialClientData);

  useEffect(() => {
    const getClientById = () => {
      try {
        BaseApi.get(`/clients/${id}`).then((res) => {
          console.log("Res -- ", res);
          setClient(res); // Directly pass `res` to setMyBusiness
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
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    console.log("Saved data:", client);
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
  }),[]);

  const buttontextStyle = useMemo(
    () => ({
      color: "white",
      borderColor: "grey.600",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "grey.800",
        borderColor: "white",
      },
    }),
    []
  );
const getAddress = (client: Client) => {
  let address = ''
  if (client.city) {
    address += client.city + ', '
  }
  if (client.state) {
    address += client.state + ', '
  }
  if (client.postalCode) {
    address += client.postalCode + ', '
  }
  if (address.endsWith(', ')) {
    address = address.slice(0, -2)
  }
  return address
}
  return (
    <Box sx={{ p: 4, bgcolor: DARK_THEME_BG, minHeight: "100vh", color: "white" }}>
      {/* Header */}
      <CmxText label={client.name} isBold variant = "h4" sx={{ mb: 2 }} />
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
            <CmxText label={client.name} align='left' isBold variant = "h5" sx={{ mb: 1 }}/>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                <CmxText label={client?.addressLine1} align='left' variant = "body2"/>
                <CmxText label={getAddress(client)} align='left' variant = "body2"/>
                <CmxText label={client?.country} align='left' variant = "body2"/>
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
                    sx={buttontextStyle}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<ArchiveIcon />}
                    sx={buttontextStyle}
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
                  <CmxText label='Number of invoices' variant = "body2" sx={{ mt: { xs: 1, sm: 0, lg: 0, xl: 0 }}}/>
                  <CmxText label={/*client?.numberOfInvoices || */ '0'} variant = "body2" sx={{ mt: { xs: 0, sm: 1, lg: 1, xl: 1 }}}/>
                </Box>
                <Box>
                  <CmxText label='Total Invoices' variant = "body2" sx={{ mt: { xs: 1, sm: 0, lg: 0, xl: 0, },}}/>
                  <CmxText label={/*client?.totalInvoices ||*/ '0'} variant = "body2" sx={{ mt: { xs: 0, sm: 1, lg: 1, xl: 1 }}}/>
                </Box>
                <Box>
                <CmxText label='Total Unpaid' variant = "body2" sx={{ mt: { xs: 1, sm: 0, lg: 0, xl: 0, }}}/>
                <CmxText label={ /*client?.totalUnpaid || */ '0'} variant = "body2" sx={{mt: { xs: 0, sm: 1, lg: 1, xl: 1 }}}/>
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
                    value={client.name}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>

                <Box width="100%">
                  <TextField
                    fullWidth
                    label="Address line *"
                    name="addressLine1"
                    value={client.addressLine1}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>

                <Box width="100%">
                  <TextField
                    fullWidth
                    label="Address line 2"
                    name="addressLine2"
                    value={client.addressLine2}
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
                    value={client.postalCode}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="State *"
                    name="state"
                    value={client.state}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>

                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="CIN"
                    name="cin"
                    value={client.cin}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                </Box>
                <Box sx={responsiveBox}>
                  <TextField
                    fullWidth
                    label="GSTIN"
                    name="gstin"
                    value={client.gstin}
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
                    value={client.email}
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
                    value={client.cc}
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
                    value={client.city}
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
                    value={client.country}
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
                    value={client.phoneNumber}
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
                    value={client.fixedDiscount}
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
