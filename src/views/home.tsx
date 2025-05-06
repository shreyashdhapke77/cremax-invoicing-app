import React from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { WHITE } from "../utils/colors";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#BFD4DB", py: 8 }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ mr: 2 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Send invoices for free
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Your time is valuable — don’t waste it on invoices. Our free,
            easy-to-use software lets you create and send invoices in just a few
            clicks.
          </Typography>

          <Button
            variant="contained"
            color="success"
            sx={{
              background: "#003A6B",
              borderRadius: 999,
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              mt: 2,
            }}
            onClick={() => navigate("/signup")}
          >
            Sign up - it's free!
          </Button>

          <Box mt={4}>
            <Typography
              variant="body1"
              display="flex"
              alignItems="center"
              gutterBottom
            >
              <CheckCircleIcon sx={{ mr: 1, color: "#003A6B" }} />
              Trusted by more than 80,000 businesses worldwide
            </Typography>
            <Typography variant="body1" display="flex" alignItems="center">
              <CheckCircleIcon sx={{ mr: 1, color: "#003A6B" }} />
              4.5 stars on Google
            </Typography>
          </Box>
        </Box>

        {/* Right side illustration placeholder */}
        <Box
          sx={{
            position: "relative",
            mt: { xs: 4, md: 0 },
            width: { xs: "100%" },
            height: 300,
            backgroundColor: WHITE,
            borderRadius: 4,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              backgroundColor: "#003A6B",
              color: "white",
              borderRadius: 2,
              px: 2,
              py: 1,
              display: "flex",
              alignItems: "center",
              boxShadow: 2,
            }}
          >
            <CheckCircleIcon sx={{ mr: 1 }} /> That's it! The invoice has been
            sent
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
