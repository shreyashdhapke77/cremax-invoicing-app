import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardDataGrid from "../../components/common/cx/table";
import { invoices } from "../../constants/invoice-list";
import { invoiceListColumns } from "../../constants/columns/invoice";
import { useNavigate } from "react-router-dom";
import { DARK_THEME_BG } from "../../utils/colors";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CmxText from "../../components/common/cmx-text";

export default function InvoiceList() {
  const navigate = useNavigate();
  return (
    <Box sx={{ backgroundColor: DARK_THEME_BG, minHeight: "100vh", px: 2 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Box>
          <Typography
            variant="body2"
            color="gray"
            textAlign="left"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </Typography>
          <ReceiptIcon fontSize="medium" />
          <CmxText label='Invoices' isBold variant="h4" sx={{ mb: 2 }} color="white"/>
        </Box>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            color: "white",
            borderColor: "gray",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
            py: 1,
            "&:hover": {
              borderColor: "white",
            },
          }}
        >
          New invoice
        </Button>
      </Box>

      {/* Table */}
      <CardDataGrid
        rows={invoices}
        columns={invoiceListColumns}
        pageSize={12}
        onRowClick={(params) => navigate(`/invoices/${params.row.id}`)}
      />
    </Box>
  );
}
