import { Box, Typography, Button, Switch, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function InvoiceCreate() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#1c1c1c",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      {/* Top toggles */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "210mm",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "flex-end",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          "@media print": {
            display: "none",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Switch defaultChecked />
          <Typography variant="body2">Add tax (GST)</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Switch defaultChecked />
          <Typography variant="body2">
            Remove Conta logo <span style={{ color: "gold" }}>⭐</span>
          </Typography>
        </Box>
      </Box>

      {/* A4 Paper */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "210mm",
          backgroundColor: "#2c2c2c",
          borderRadius: 4,
          p: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
          minHeight: { xs: "auto", md: "297mm" },
          "@media print": {
            width: "210mm",
            minHeight: "297mm",
            backgroundColor: "#fff",
            borderRadius: 0,
            color: "#000",
            p: 4,
          },
        }}
      >
        {/* Title */}
        <Typography variant="h5" fontWeight={600} textAlign="center">
          Create invoice
        </Typography>

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          {/* Logo */}
          <Box sx={{ flexShrink: 0 }}>
            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "#1c1c1c",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>Logo</Typography>
            </Box>
          </Box>

          {/* Company Info */}
          <Box sx={{ textAlign: { xs: "center", md: "left" }, flexGrow: 1 }}>
            <Typography fontWeight={600}>
              CREMAX GROUP | Amul Ice Cream
            </Typography>
            <Typography variant="body2" mt={1}>
              Plot No. 42, Pandhurna Road, Nike Layout,
              <br />
              Opposite Lilashree Lawn
              <br />
              Saoner, Maharashtra, 441107, India
              <br />
              27AAUFC3237B1ZJ
            </Typography>
            <Box
              mt={2}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 2,
              }}
            >
              <Typography variant="body2">Invoice date: 2025-04-26</Typography>
              <Typography variant="body2">Due date: 2025-04-28</Typography>
              <Typography variant="body2">Invoice no.: 1201</Typography>
            </Box>
          </Box>
        </Box>

        {/* Bill To */}
        <Box
          sx={{
            backgroundColor: "#1c1c1c",
            border: "1px dashed #555",
            borderRadius: 2,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "@media print": {
              backgroundColor: "#fff",
              borderColor: "#ccc",
            },
          }}
        >
          <Typography>Bill to</Typography>
          <IconButton size="small" color="inherit">
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Invoice Description */}
        <Box
          sx={{
            backgroundColor: "#1c1c1c",
            border: "1px dashed #555",
            borderRadius: 2,
            p: 2,
            "@media print": {
              backgroundColor: "#fff",
              borderColor: "#ccc",
            },
          }}
        >
          <Typography>Invoice description (optional)</Typography>
        </Box>

        {/* Products */}
        <Box
          sx={{
            backgroundColor: "#1c1c1c",
            border: "1px dashed #555",
            borderRadius: 2,
            p: 2,
            "@media print": {
              backgroundColor: "#fff",
              borderColor: "#ccc",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Products</Typography>
            <IconButton size="small" color="inherit">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Payment Info */}
        <Box sx={{ mt: "auto" }}>
          <Typography fontWeight={600}>PAYMENT INFORMATION</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              mt: 1,
            }}
          >
            <Box flex={1}>
              <Typography variant="body2">Invoice number: 1201</Typography>
              <Typography variant="body2">Amount (INR): 0.00</Typography>
            </Box>
            <Box flex={2}>
              <Box
                sx={{
                  backgroundColor: "#fff9c4",
                  borderRadius: 1,
                  p: 1,
                  mb: 1,
                  "@media print": { backgroundColor: "#ffffcc" },
                }}
              >
                <Typography color="black" variant="body2">
                  Please add the invoice number to the payment transfer!
                </Typography>
              </Box>
              <Typography variant="body2">
                Bank account name: CREMAX GROUP
              </Typography>
              <Typography variant="body2">
                Bank account number: 920020056189145
              </Typography>
              <Typography variant="body2">Bank name: Axis Bank</Typography>
              <Typography variant="body2">IFSC: UTIB0003817</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "210mm",
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          flexWrap: "wrap",
          mt: 2,
          "@media print": {
            display: "none",
          },
        }}
      >
        <Button variant="text" color="inherit">
          Cancel
        </Button>
        <Button variant="outlined" color="inherit">
          Save draft
        </Button>
        <Button variant="contained" color="success">
          Create invoice
        </Button>
      </Box>
    </Box>
  );
}
