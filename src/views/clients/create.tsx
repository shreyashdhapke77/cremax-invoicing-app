import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  MenuItem,
  TextField,
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
import { useLoader } from "../../components/common/context/loader-context";
import GlobalLoader from "../../components/common/global-loader";
import CmxText from "../../components/common/cmx-text";

interface ClientFormErrors {
 [key: string]: string | undefined;
}

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


export const ClientsCreate = () => {

  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  const { loading } = useLoader();

  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState<Client>(initialClientData);
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<ClientFormErrors>({});
  const [isCreateMode, setIsCreateMode] = useState<boolean>(true);

  const responsiveBox = { width: { xs: "100%", sm: "48%" } };

  const validateForm = (): ClientFormErrors => {
    if (!formData.name.trim()) {
      errors.name = "Client name is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!formData.postalCode.trim()) {
      errors.postalCode = "Postal Code is required.";
    }
    if (!formData.state.trim()) {
      errors.state = "State is required.";
    }
    if (!formData.city.trim()) {
      errors.city = "City is required.";
    }
    if (!formData.country.trim()) {
      errors.country = "Country is required.";
    }
    return errors;
  };


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const fetchFn = isCreateMode ? BaseApi.post("/clients", payload) : BaseApi.put("/clients", payload)
      const res: any = await fetchFn;
      console.log("Res -- ", res);
      if (res.error) {
        setErrorMsg(res.error);
        showMessage(res.error, "error");
        return;
      }
      showMessage(`Client ${res.name + (isCreateMode ?  'created ' : ' updated ')} successfully`, "success");
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
    console.log("All Data Reset");
    setFormData(initialClientData);
  };

  const textFieldStyle = {
    input: { color: "white" },
    label: { color: "white" },
    ".MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#777" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },
    },
  };

  return (
    <Box sx={{ p: 4, bgcolor: DARK_THEME_BG, minHeight: "100vh", color: "white" }}>
      <GlobalLoader loading={loading} />
      {errorMsg && (
        <CmxText label={errorMsg} variant="h6" color="error"/>
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
            <CmxText label='Create New Client' isBold align='left' variant="h5" color={WHITE} sx={{ mb: 1 }}/>

            {/* Full width fields */}
            <Box width="100%">
              <TextField
                fullWidth
                label="Name *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                sx={textFieldStyle}
              />
            </Box>

            <Box width="100%">
              <TextField
                fullWidth
                label="Address line *"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                sx={textFieldStyle}
              />
            </Box>

            <Box width="100%">
              <TextField
                fullWidth
                label="Address line 2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                sx={textFieldStyle}
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
                sx={textFieldStyle}
              />
            </Box>
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="State *"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                sx={textFieldStyle}
              />
            </Box>

            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="CIN"
                name="cin"
                value={formData.cin}
                onChange={handleInputChange}
                sx={textFieldStyle}
              />
            </Box>
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="GSTIN"
                name="gstin"
                value={formData.gstin}
                onChange={handleInputChange}
                sx={textFieldStyle}
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
                sx={textFieldStyle}
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
                sx={textFieldStyle}
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
                sx={textFieldStyle}
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
                sx={textFieldStyle}
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
                sx={textFieldStyle}
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
                sx={textFieldStyle}
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
              label={ isCreateMode ?  "Save" : 'Update' }
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

