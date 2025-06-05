import React, {useState, useEffect } from "react";
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
  WHITE,
} from "../../utils/colors";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddPayment from "./add-payment";
import BaseApi from "../../services/base-api";
import CancelInvoice from "./cancel-invoice";
import { Invoice } from "../../types";
import { useSnackbar } from "../../components/common/context/snackbar-context";


export default function InvoiceDetails() {
  const [showAddPayment, setShowAddPayment] = React.useState(false);
  const [showCancelInvoice, setShowCancelInvoice] = React.useState(false);
  const { id } = useParams();
  const { showMessage } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const initialInvoiceData: Invoice = {
    id: 0,
    business_id: 0,
    invoice_no: 0,
    custom_invoice_no: 0,
    date: "",
    due_date: "",
    business_client_id: 0,
    description: "",
    net_amount: 0,
    gst: 0,
    discount: 0,
    total_due: 0,
    status: "",
    created_at: "",
    updated_at: "",
  };

  const [invoice, setInvoice] = useState<Invoice>(initialInvoiceData);

   useEffect(() => {
      const getInvoiceById = () => {
        try {
          BaseApi.get(`/invoices/${id}`).then((res) => {
            console.log("Res -- ", res);
            setInvoice(res); // Directly pass `res` to setMyBusiness
          })
        } catch (error) {
          showMessage("Something went wrong. Please try again.", "error");
        }
      };
      getInvoiceById();
    }, []);

  if (!invoice) {
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

  const status = getStatusDetails(invoice.status);
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
        Invoice #{invoice.invoice_no}
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
                color={invoice.status === "overdue" ? "#000" : WHITE}
                sx={{
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#111",
                    textDecoration: "underline",
                  },
                }}
                onClick={() => alert(`Clicked on client ID ${invoice.business_client_id}`)}
              >
                Client ID: {invoice.business_client_id}
              </Typography>
              <Typography
                variant="body2"
                color={invoice.status === "overdue" ? "#222" : "#f0f0f0"}
              >
                Invoice Date: {invoice.date}
              </Typography>
            </Box>

            {/* Right: Status */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              flexShrink={0}
              color={invoice.status === "overdue" ? "#000" : WHITE}
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
            <Typography color={WHITE}>
              <strong>Due Date:</strong> {invoice.due_date}
            </Typography>
            <Typography color={WHITE}>
              <strong>Amount:</strong> ${invoice.total_due.toLocaleString()}
            </Typography>
          </Box>
          {/* ...rest of your code, replacing invoiceDetails with invoice ... */}
        </Paper>
      </motion.div>
      {showAddPayment && <AddPayment handleClose={() => setShowAddPayment(false)} />}
      {showCancelInvoice && <CancelInvoice handleClose={() => setShowCancelInvoice(false)} />}
    </Box>
  );
}
