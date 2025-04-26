import {
  Box,
  Button,
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PercentIcon from "@mui/icons-material/Percent";
import { WHITE } from "../../utils/colors";

export const ProductCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    productNo: "",
    price: 0.0,
    taxCode: "",
    totalPrice: "0.00",
    updatedAt: "",
    timesInvoiced: "",
    totalInvoiced: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const responsiveBox = { width: { xs: "100%", sm: "48%" } };
  return (
    <Box sx={{ p: 4, bgcolor: "#1e1e1e", minHeight: "100vh", color: "white" }}>
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
                Total price (incl. GST): <strong>{formData.totalPrice}</strong>
              </Typography>
            </Box>
          </Box>

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <Button
              onClick={() => navigate("/products")}
              variant="outlined"
              sx={{ color: "white", borderColor: "grey.500" }}
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
