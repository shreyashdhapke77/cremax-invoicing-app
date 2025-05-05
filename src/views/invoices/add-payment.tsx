import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DARK_THEME_BG } from "../../utils/colors";

interface AddPaymentProps {
  handleClose: () => void;
}

const AddPayment: React.FC<AddPaymentProps> = ({ handleClose }) => {
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);

  const handleAddPayment = () => {
    console.log("Payment added:", { amount, paymentDate });
    setAmount("");
    setPaymentDate(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        mt={3}
        p={3}
        borderRadius={2}
        sx={{
          backgroundColor: DARK_THEME_BG,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          color: "white",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          Add payment
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Amount paid"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "#66bb6a" },
              },
            }}
          />

          <DatePicker
            label="Payment date"
            value={paymentDate}
            onChange={(newValue) => setPaymentDate(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                InputLabelProps: { shrink: true },
                InputProps: {
                  sx: { color: "white" },
                },
                sx: {
                  label: { color: "white" },
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "#66bb6a" },
                  },
                  "& .MuiSvgIcon-root": { color: "white" },
                },
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleAddPayment}
            sx={{
              backgroundColor: "green",
              "&:hover": { backgroundColor: "#00c853" },
            }}
          >
            Add payment
          </Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};

export default AddPayment;
