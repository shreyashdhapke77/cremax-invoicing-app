import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DARK_THEME_BG } from "../../utils/colors";

interface CancelInvoiceProps {
  handleClose: () => void;
}

const CancelInvoice: React.FC<CancelInvoiceProps> = ({ handleClose }) => {
  const [cancelOption, setCancelOption] = useState("credit");
  const [cancelDate, setCancelDate] = useState<Date | null>(new Date());

  const handleCancelInvoice = () => {
    console.log("Cancel option:", cancelOption);
    console.log("Date:", cancelDate);
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
          sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          Cancel invoice
        </Typography>

        <Typography mb={1}>Choose how to cancel your invoice:</Typography>

        <FormControl component="fieldset">
          <RadioGroup
            value={cancelOption}
            onChange={(e) => setCancelOption(e.target.value)}
          >
            <FormControlLabel
              value="credit"
              control={<Radio sx={{ color: "white" }} />}
              label="Credit invoice"
              sx={{ color: "white" }}
            />
            <FormControlLabel
              value="writeoff"
              control={<Radio sx={{ color: "white" }} />}
              label="Write off invoice"
              sx={{ color: "white" }}
            />
          </RadioGroup>
        </FormControl>

        {cancelOption === "credit" && (
          <Box
            p={2}
            my={2}
            borderRadius={1}
            sx={{ backgroundColor: "#333", color: "white" }}
          >
            When you credit an invoice, you cancel it out. Choose this option if
            there are errors on the invoice and you need to create a new one. If
            you've sent the invoice, you should also send the credit note to the
            client.{" "}
            <Typography
              component="span"
              sx={{ color: "#29b6f6", cursor: "pointer" }}
            >
              Read more about crediting an invoice.
            </Typography>
          </Box>
        )}

        {cancelOption === "writeoff" && (
          <Box
            p={2}
            my={2}
            borderRadius={1}
            sx={{ backgroundColor: "#333", color: "white" }}
          >
            If you won't get paid for this invoice, you can write it off. Choose
            this option if the client is unable or unwilling to pay.{" "}
            <Typography
              component="span"
              sx={{ color: "#29b6f6", cursor: "pointer" }}
            >
              Read more about writing off an invoice.
            </Typography>
          </Box>
        )}

        <Stack spacing={2}>
          <DatePicker
            label="Date"
            value={cancelDate}
            onChange={(newValue) => setCancelDate(newValue)}
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
                    "& fieldset": { borderColor: "gray" },
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
            onClick={handleCancelInvoice}
            sx={{
              backgroundColor: "green",
              "&:hover": { backgroundColor: "#00c853" },
            }}
          >
            {cancelOption === "credit" ? 'Credit invoice' : 'Write off invoice'}
          </Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};

export default CancelInvoice;
