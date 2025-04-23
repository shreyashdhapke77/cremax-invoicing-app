import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Divider,
  Tooltip,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useParams } from "react-router-dom";
import { invoices } from "../../constants/invoice-list";
import { motion } from "framer-motion";
import {
  INV_STATUS_CANCELLED,
  INV_STATUS_DUE,
  INV_STATUS_OVERDUE,
  INV_STATUS_PAID,
} from "../../utils/colors";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddPayment from "./add-payment";
import CancelInvoice from "./cancel-invoice";

export default function InvoiceDetails() {
  const [showAddPayment, setShowAddPayment] = React.useState(false);
  const [showCancelInvoice, setShowCancelInvoice] = React.useState(false);
  const { id } = useParams();
  const invoiceDetails = invoices.find((invoice) => invoice.id === Number(id));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!invoiceDetails) {
    return (
      <Box p={4}>
        <Typography color="error" variant="h6">
          Invoice not found.
        </Typography>
      </Box>
    );
  }

  const handlePrint = () => window.print();
  const handleDownload = () => alert("Download triggered");
  const handlePreview = () => alert("Preview triggered");

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "paid":
        return {
          color: INV_STATUS_PAID,
          label: "PAID",
          icon: <CheckCircleIcon />,
          tooltip: "This invoice has been paid",
        };
      case "due":
        return {
          color: INV_STATUS_DUE,
          label: "DUE",
          icon: <AccessTimeIcon />,
          tooltip: "Payment is due",
        };
      case "overdue":
        return {
          color: INV_STATUS_OVERDUE,
          label: "OVERDUE",
          icon: <WarningAmberIcon />,
          tooltip: "This invoice is overdue",
        };
      case "cancelled":
        return {
          color: INV_STATUS_CANCELLED,
          label: "CANCELLED",
          icon: <CancelIcon />,
          tooltip: "This invoice has been cancelled",
        };
      default:
        return {
          color: "#757575",
          label: status.toUpperCase(),
          icon: <AccessTimeIcon />,
          tooltip: "Status unknown",
        };
    }
  };

  const status = getStatusDetails(invoiceDetails.status);

  return (
    <Box
      p={isMobile ? 2 : 5}
      sx={{
        bgcolor: "#0c0c0c",
        color: "#e0e0e0",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #0f0f0f 30%, #1a1a1a 90%)",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h3"}
        fontWeight="bold"
        mb={4}
        color="#00d1ff"
        sx={{ textShadow: "0 0 10px #00d1ff" }}
      >
        Invoice #{invoiceDetails.invoiceNo}
      </Typography>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={10}
          sx={{
            p: isMobile ? 3 : 5,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(12px)",
            border: "1px solid #2c2c2c",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection={isMobile ? "column" : "row"}
            bgcolor={status.color}
            px={3}
            py={2.5}
            borderRadius={2}
            mb={3}
            gap={isMobile ? 1.5 : 3}
          >
            {/* Left: Client + Date */}
            <Box textAlign={isMobile ? "center" : "left"}>
              <Typography
                variant="h6"
                fontWeight={700}
                color={invoiceDetails.status === "overdue" ? "#000" : "#fff"}
                sx={{
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#111",
                    textDecoration: "underline",
                  },
                }}
                onClick={() => alert(`Clicked on ${invoiceDetails.client}`)}
              >
                {invoiceDetails.client}
              </Typography>
              <Typography
                variant="body2"
                color={invoiceDetails.status === "overdue" ? "#222" : "#f0f0f0"}
              >
                Invoice Date: {invoiceDetails.invoiceDate}
              </Typography>
            </Box>

            {/* Right: Status */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              flexShrink={0}
              color={invoiceDetails.status === "overdue" ? "#000" : "#fff"}
            >
              {status.icon}
              <Typography variant="h6" fontWeight={700}>
                {status.label}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: "#444" }} />

          <Box
            display="grid"
            gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"}
            gap={3}
          >
            <Typography color="#fff">
              <strong>Due Date:</strong> {invoiceDetails.dueDate}
            </Typography>
            <Typography color="#fff">
              <strong>Amount:</strong> ${invoiceDetails.amount.toLocaleString()}
            </Typography>
          </Box>

          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            mt={4}
            justifyContent="space-between"
          >
            {invoiceDetails.status === "paid" ? (
              <Button
                variant="contained"
                color="info"
                fullWidth
                sx={{ fontWeight: 600, fontSize: "1rem" }}
                onClick={() => alert("Manage payments")}
              >
                Manage Payments
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  fullWidth
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                  onClick={() => {
                    setShowCancelInvoice(false);
                    setShowAddPayment(true);
                  }}
                >
                  Mark as Paid
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CancelIcon />}
                  fullWidth
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                  onClick={() => {
                    setShowAddPayment(false);
                    setShowCancelInvoice(true);
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </Stack>

          <Divider sx={{ my: 4, borderColor: "#444" }} />

          <Typography variant="h6" color="#fff" mb={2}>
            Invoice Options
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            alignItems="center"
          >
            <Tooltip title="Copy invoice details" arrow>
              <IconButton color="primary">
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add to favorites" arrow>
              <IconButton sx={{ color: "#ffca28" }}>
                <StarIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print invoice" arrow>
              <IconButton onClick={handlePrint} color="info">
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download invoice" arrow>
              <IconButton onClick={handleDownload} color="success">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Preview invoice" arrow>
              <IconButton onClick={handlePreview} color="secondary">
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Divider sx={{ my: 4, borderColor: "#444" }} />

          <Typography variant="h6" color="#fff" mb={1}>
            Delivery
          </Typography>
          <Typography variant="body2" color="#aaa">
            This invoice has not been sent yet.
          </Typography>

          <Button
            variant="outlined"
            startIcon={<SendIcon />}
            sx={{
              mt: 2,
              color: "#00d1ff",
              borderColor: "#00d1ff",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(0,209,255,0.1)",
              },
            }}
          >
            Send Invoice
          </Button>
        </Paper>
      </motion.div>
      {showAddPayment && <AddPayment handleClose={() => setShowAddPayment(false)} />}
      {showCancelInvoice && <CancelInvoice handleClose={() => setShowCancelInvoice(false)} />}
    </Box>
  );
}
