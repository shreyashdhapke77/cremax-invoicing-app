import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PercentIcon from "@mui/icons-material/Percent";
import { DARK_THEME_BG, WHITE } from "../../utils/colors";
import CmxButton from "../../components/common/cmx-button";
import BaseApi from "../../services/base-api";
import { useSnackbar } from "../../components/common/context/snackbar-context";
import type { Businesses, Product } from '../../types/index';
import { useLoader } from "../../components/common/context/loader-context";
import GlobalLoader from "../../components/common/global-loader";


interface ProductFormErrors {
  [key: string]: string | undefined;
 }
 
 const initialProductData: Product = {
  name: "",
  productNo: "",
  price: 0.0,
  taxCode: "",
  totalPrice: 0.0,
  updatedAt: "",
  timesInvoiced: "",
  totalInvoiced: "",
};

export const ProductCreate = () => {

  const { showMessage } = useSnackbar();
  const navigate = useNavigate();
  const { loading } = useLoader();

  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [formData, setFormData] = useState(initialProductData);
  const [isCreateMode, setIsCreateMode] = useState<boolean>(true);

  // Memoized styles for responsive boxes
  const responsiveBox = useMemo(() => ({ width: { xs: "100%", sm: "48%" } }), []);

  // Shared styles for TextField components
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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): ProductFormErrors => {
    if (!formData.name.trim()) {
      errors.name = "Product Name is required.";
    }
    if (!formData.productNo.trim()) {
      errors.email = "Product Number is required.";
    }
    if (!formData.price) {
      errors.price = "Price is required.";
    }
    return errors;
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
    setErrorMsg(""); // Reset error messages
    try {
      // Parse selected business from localStorage
      const business: Businesses = JSON.parse(localStorage.getItem("selectedBusiness") || "{}");
      if (!business.id) {
        setErrorMsg("Business ID is required.");
        setIsDisabled(false);
        return;
      }
      const payload = { ...formData, business_id: business.id };

      // API Call to create Product
      const fetchFn = isCreateMode ? BaseApi.post("/products", payload) : BaseApi.put("/products", payload)
      const res: any = await fetchFn;
      
      console.log("Res -- ", res);
      if (res.error) {
        setErrorMsg(res.error);
        showMessage(res.error, "error");
        return;
      }
      showMessage(`Product ${res.name + (isCreateMode ? 'created ' : ' updated ')} successfully`, "success");
      navigate("/products");
    } catch (error) {
      showMessage("Something went wrong. Please try again.", "error");
    } finally {
      setIsDisabled(false);
    }
  };

  const handleCancelAction = () => {
    // Handle cancel action here
    console.log("Action cancelled");
    navigate("/products");
  };

  const handleResetAllAction = () => {
    // Handle Reset action here
    console.log("All Data Reset");
    setFormData(initialProductData);
  };
  
  return (
    <Box sx={{ p: 4, bgcolor: DARK_THEME_BG, minHeight: "100vh", color: "white" }}>
      <GlobalLoader loading={loading} />
      {errorMsg && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMsg}
        </Typography>
      )}
      <Card sx={{ bgcolor: "#2e2e2e", p: 2 }}>
        <CardContent>
          <Typography
            textAlign="left"
            fontWeight="bold"
            variant="h5"
            color={WHITE}
            sx={{ mb: 3 }}
          >
            Create New Product
          </Typography>
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
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{ style: { color: "white" } }}
                sx={textFieldStyles}
                error={!!errors.name}
                helperText={errors.name}
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
                sx={textFieldStyles}
              />
            </Box>

            {/* Unit Price */}
            <Box sx={responsiveBox}>
              <TextField
                fullWidth
                label="Unit price *"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                variant="outlined"
                sx={textFieldStyles}
                error={!!errors.price}
                helperText={errors.price}
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
                Total price (incl. GST): <strong>{formData.totalPrice}</strong>
              </Typography>
            </Box>
          </Box>

          {/* Buttons */}
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
              label={ isCreateMode ? "Save" : 'Update' }
              fullWidth={false}
              type="submit"
              disabled={isDisabled}
              onClick={handleSaveAction}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
