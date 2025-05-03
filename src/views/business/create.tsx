import {
    Box,
    Button,
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
  import { WHITE } from "../../utils/colors";
  
  export const BusinessCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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
      phone: "",
      fixedDiscount: 0,
    });
  
    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const responsiveBox = { width: { xs: "100%", sm: "48%" } };
  
    return (
      <Box sx={{ p: 4, bgcolor: "#1e1e1e", minHeight: "100vh", color: "white" }}>
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
                  label="Phone number"
                  name="phone"
                  value={formData.phone}
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
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "grey.500" }}
                onClick={() => navigate("/clients")}
              >
                Cancel
              </Button>
              <Button variant="contained" color="success">
                Save
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  };
  