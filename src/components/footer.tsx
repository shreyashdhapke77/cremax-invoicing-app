import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box component="footer" sx={{ bgcolor: "grey.900", color: "grey.100", py: 6 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
            textAlign: isSmallScreen ? "center" : "left",
          }}
        >
          {/* Left - Logo / Title */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Cremax Invoicing
            </Typography>
            <Typography variant="body2" color="grey.500">
              © {new Date().getFullYear()} All rights reserved.
            </Typography>
          </Box>

          {/* Center - Navigation */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {["Home", "About", "Services", "Contact"].map((text, index) => (
              <Link
                key={index}
                href={`/${text}`}
                underline="hover"
                color="inherit"
                sx={{
                  transition: "color 0.3s",
                  "&:hover": { color: "primary.light" },
                }}
              >
                {text}
              </Link>
            ))}
          </Box>

          {/* Right - Social Icons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: isSmallScreen ? "center" : "flex-end",
              gap: 1,
            }}
          >
            {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, i) => (
              <IconButton
                key={i}
                color="inherit"
                href="#"
                aria-label={Icon.name}
                sx={{
                  transition: "color 0.3s, transform 0.3s",
                  "&:hover": {
                    color: "primary.light",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <Icon />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
