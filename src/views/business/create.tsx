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
  import { useNavigate } from "react-router-dom";
  import { DARK_THEME_BG, WHITE } from "../../utils/colors";
import BaseApi from "../../services/base-api";
import { useSnackbar } from "../../components/common/context/snackbar-context";
import CmxButton from "../../components/common/cmx-button";
import { Businesses } from "../../types/index";

  interface BusinessFormErrors {
    [key: string]: string | undefined;
   }

   const initialBusinessData: Businesses = {
    id: "",
    name: "",
    userId: parseInt(localStorage.getItem("userId") || "0"),
    cin: "",
    gstin: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    phoneNumber: "",
    website: "",
    email: "",
    status: "",
    createdAt: '',
    updatedAt: '',
  };

  export const BusinessCreate = () => {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false);
    const [formData, setFormData] = useState<Businesses >(initialBusinessData);
    
    const { showMessage } = useSnackbar();
    const [errors, setErrors] = useState<BusinessFormErrors>({});
    
    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    };

    const validateForm = () => {
      const newErrors: BusinessFormErrors = {};
  
      if (!formData.name.trim()) newErrors.name = "Name is required.";
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address line 1 is required.";
      if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required.";
      if (!formData.state.trim()) newErrors.state = "State is required.";
      if (!formData.city.trim()) newErrors.city = "City is required.";
      if (!formData.country.trim()) newErrors.country = "Country is required.";

      if (formData.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        newErrors.email = "Enter a valid email address.";
      }  
      return newErrors;
    };
    

    const saveBusiness = async () => {
      setIsDisabled(true);
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsDisabled(false);
        return;
      }

      setErrors({}); // Clear previous errors
      const response = await BaseApi.post("/businesses", formData);
      setIsDisabled(false);
      if (response?.id) {
        showMessage("Your business created successfully!", "success");
        navigate("/dashboard")
      } else {
        if (response?.error) {
          showMessage(response.error, "error");
        } else {
          showMessage("Something went wrong, please try again later.", "error");
        }
      }
    }
  
    const responsiveBox = { width: { xs: "100%", sm: "48%" } };
  
    return (
      <Box sx={{ p: 4, bgcolor: DARK_THEME_BG, minHeight: "100vh", color: "white" }}>
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
                Create New Business
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

                  error={errors.name ? true : false}
                  helperText={errors.name ?? ""}
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
                  error={errors.addressLine1 ? true : false}
                  helperText={errors.addressLine1 ?? ""}
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
                  error={errors.postalCode ? true : false}
                  helperText={errors.postalCode ?? ""}
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
                  error={errors.state ? true : false}
                  helperText={errors.state ?? ""}
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
                  error={errors.city ? true : false}
                  helperText={errors.city ?? ""}
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
                  error={errors.country ? true : false}
                  helperText={errors.country ?? ""}
                >
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                </TextField>
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
                  error={errors.email ? true : false}
                  helperText={errors.email ?? ""}
                />
              </Box>
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
  
            </Box>
            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <CmxButton
              size="small"
              variant="outlined"
              label="Cancel"
              fullWidth={false}
              sx={{ color: "white", borderColor: "grey.500" }}
              disabled={isDisabled}
              onClick={() => navigate("/dashboard")}
            />
            <CmxButton 
              variant="contained" 
              color="success"
              size="small"
              label= "Save"
              fullWidth={false}
              type="submit"
              disabled={isDisabled}
              onClick={saveBusiness}/>
          </Box>
          </CardContent>
        </Card>
      </Box>
    );
  };
  