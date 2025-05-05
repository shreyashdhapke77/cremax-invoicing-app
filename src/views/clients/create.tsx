import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PercentIcon from "@mui/icons-material/Percent";
import { useNavigate } from "react-router-dom";
import { DARK_THEME_BG, WHITE } from "../../utils/colors";
import CmxButton from "../../components/common/cmx-button";
import BaseApi from "../../services/base-api";
import { useSnackbar } from "../../components/common/context/snackbar-context";
import type { Businesses, Client } from '../../types/index';

interface ClientFormErrors {
 [key: string]: string | undefined;
}

const initialFormData: Client = {
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


export const ClientsCreate = () => {
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState<Client>(initialFormData);
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<ClientFormErrors>({});


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const responsiveBox = { width: { xs: "100%", sm: "48%" } };

  const validateForm = (): ClientFormErrors => {
    const newErrors: ClientFormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Client name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required.";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
    }
    return newErrors;
  };

  const handleSaveAction = async() => {
    // Handle save action here
    setIsDisabled(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsDisabled(false);
      return;
    }

    setErrors({}); // Clear previous errors
    setErrorMsg(""); // Reset error
    try {
      // Parse selected business from localStorage
      const business: Businesses = JSON.parse(localStorage.getItem("selectedBusiness") || "{}");
      if (!business.id) {
        setErrorMsg("Business ID is required.");
        setIsDisabled(false);
        return;
      }
      const payload = { ...formData, business_id: business.id };

      // API Call to create client
      const res: any = await BaseApi.post("/clients", payload);
      console.log("Res -- ", res);
      if (res.error) {
        setErrorMsg(res.error);
        showMessage(res.error, "error");
        return;
      }
      showMessage(`Client ${res.name} created successfully`, "success");
      navigate("/clients");
    } catch (error) {
      showMessage("Something went wrong. Please try again.", "error");
    } finally {
      setIsDisabled(false);
    }
  };

  const handleCancelAction = () => {
    // Handle cancel action here
    console.log("Action cancelled");
    navigate("/clients");
  };

  const handleResetAllAction = () => {
    // Handle Reset action here
    console.log("Data deleted");
    setFormData(initialFormData);
  };
  const handleDeleteAction = () => {
    // Handle delete action here
    console.log("Data deleted");
    navigate("/clients");
  };
  const handleEditAction = (data: any) => {
    // Handle edit action here
    console.log("Data edited:", data);
    navigate("/clients");
  };
  const handleViewAction = (data: any) => {
    // Handle view action here
    console.log("Data viewed:", data);
    navigate("/clients");
  };
  const handlePrintAction = (data: any) => {
    // Handle print action here
    console.log("Data printed:", data);
    navigate("/clients");
  };
  const handleEmailAction = (data: any) => {
    // Handle email action here
    console.log("Data emailed:", data);
    navigate("/clients");
  };
  const handleDownloadAction = (data: any) => {
    // Handle download action here
    console.log("Data downloaded:", data);
    navigate("/clients");
  };

  return (
    <Box sx={{ p: 4, bgcolor: DARK_THEME_BG, minHeight: "100vh", color: "white" }}>
      {errorMsg && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMsg}
        </Typography>
      )}
      <Card sx={{ bgcolor: "#2e2e2e" }}>
        <CardContent>
          <Box
            component="form"
            display="flex"
            flexWrap="wrap"
            gap={2}
            justifyContent="space-between"
          >
            <Typography
              textAlign="left"
              fontWeight="bold"
              variant="h5"
              color={WHITE}
              sx={{ mb: 1 }}
            >
              Create New Client
            </Typography>
            {/* Full width fields */}
            <Box width="100%">
              <TextField
                fullWidth
                label="Name *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
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

            <Box width="100%">
              <TextField
                fullWidth
                label="Address line *"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
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

            <Box width="100%">
              <TextField
                fullWidth
                label="Address line 2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
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

            {/* Half width fields */}
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="Postal code *"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
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
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="State *"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
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

            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="CIN"
                name="cin"
                value={formData.cin}
                onChange={handleInputChange}
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
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="GSTIN"
                name="gstin"
                value={formData.gstin}
                onChange={handleInputChange}
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

            {/* Email and CC */}
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#777" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
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

            {/* City/Suburb and Country */}
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="City/Suburb *"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
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
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                select
                label="Country *"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
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
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <CmxButton 
              size="small"
              variant="contained"
              color="error"
              label="Reset All"
              fullWidth={false}
              type="reset"
              sx={{ color: "white", borderColor: "grey.500" }}
              disabled={isDisabled}
              onClick={handleResetAllAction}
            />

            <CmxButton
              size="small"
              variant="outlined"
              label="Cancel"
              fullWidth={false}
              sx={{ color: "white", borderColor: "grey.500" }}
              disabled={isDisabled}
              onClick={handleCancelAction}
            />
            
            <CmxButton 
              variant="contained" 
              color="success"
              size="small"
              label="Save"
              fullWidth={false}
              type="submit"
              disabled={isDisabled}
              onClick={handleSaveAction}/>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

