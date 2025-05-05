import { useEffect, useState } from "react";
import { Box, Typography, Card, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { DARK_THEME_BG, GREY_BACKGROUND, WHITE } from "../utils/colors";
import { useNavigate } from "react-router-dom";
import BaseApi from "../services/base-api";
import { useSnackbar } from "../components/common/context/snackbar-context";
import type { Businesses } from '../types/index';

const Dashboard = () => {
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();
  const [myBusiness, setMyBusiness] = useState<Businesses | null>(null);

  useEffect(() => {
    const getBusiness = async () => {
      try {
        const res = await BaseApi.get("/businesses/my-businesses");
        console.log("Res -- ", res);
        if (res?.length === 0) {
          showMessage(
            "You haven't created any business yet. Please create one to get started.",
            "warning"
          );
          navigate("/business/create");
        } else if (res?.length) {
          const stored = localStorage.getItem("selectedBusiness");
          if (stored) {
            setMyBusiness(JSON.parse(stored));
          } else {
            handleSelect(res[0]);
          }
        }
      } catch (error) {
        showMessage("Something went wrong. Please try again.", "error");
      }
    };

    getBusiness();
  }, []);

  const handleSelect = (business: any) => {
    setMyBusiness(business);
    localStorage.setItem("selectedBusiness", JSON.stringify(business));
  };

  return (
    <Box
      sx={{
        backgroundColor: DARK_THEME_BG,
        minHeight: "100vh",
        color: WHITE,
        p: 4,
      }}
    >
      {/* Header */}
      <Divider
        sx={{
          backgroundColor: GREY_BACKGROUND,
          mb: 3,
          height: "2px",
          borderRadius: 1,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", lg: "row", xl: "row" },
          justifyContent: "space-between",
          alignItems: {
            xs: "center",
            sm: "center",
            lg: "flex-start",
            xl: "flex-start",
          },
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {myBusiness?.name ?? ""}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", lg: "row", xl: "row" },
            gap: 4,
            mt: { xs: 2, md: 0 },
          }}
        >
          <Box
            sx={{
              textAlign: {
                xs: "center",
                sm: "center",
                lg: "right",
                xl: "right",
              },
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Invoices
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              178
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: {
                xs: "center",
                sm: "center",
                lg: "right",
                xl: "right",
              },
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Invoiced this month
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              1,21,082.62
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: {
                xs: "center",
                sm: "center",
                lg: "right",
                xl: "right",
              },
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Unpaid Invoices
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              22,073.52
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: {
                xs: "center",
                sm: "center",
                lg: "right",
                xl: "right",
              },
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Invoiced this year
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              4,34,073.52
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: {
                xs: "center",
                sm: "center",
                lg: "right",
                xl: "right",
              },
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Total invoiced
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              4,39,164.07
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          backgroundColor: GREY_BACKGROUND,
          my: 3,
          height: "2px",
          borderRadius: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", lg: "row", xl: "row" },
          gap: 3,
        }}
      >
        {/* Left: Actions */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row", lg: "row", xl: "row" },
              gap: 2,
            }}
          >
            <Card
              sx={{
                backgroundColor: "#00C853",
                color: WHITE,
                flex: 1,
                p: 2,
                height: 100,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 2,
                cursor: "pointer", // indicates it's clickable
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#00B248", // slightly darker green
                  transform: "scale(1.02)", // subtle zoom effect
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Create invoice
              </Typography>
              <ArrowForwardIcon />
            </Card>

            <Card
              sx={{
                backgroundColor: "#333",
                color: WHITE,
                flex: 1,
                p: 2,
                height: 100,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#444", // slightly lighter
                  transform: "translateY(-2px) scale(1.02)", // lift effect
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)", // smooth shadow
                },
              }}
              onClick={() => navigate("/invoices")}
            >
              <DescriptionIcon />
              <Typography variant="h6">All Invoices</Typography>
            </Card>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row", lg: "row", xl: "row" },
              gap: 2,
            }}
          >
            <Card
              sx={{
                backgroundColor: "#333",
                color: WHITE,
                flex: 1,
                p: 2,
                height: 100,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#444", // lighter shade on hover
                  transform: "translateY(-2px) scale(1.02)", // subtle lift effect
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // soft shadow
                },
              }}
              onClick={() => navigate("/clients")}
            >
              <PeopleIcon />
              <Typography variant="h6">Clients</Typography>
            </Card>

            <Card
              sx={{
                backgroundColor: "#333",
                color: WHITE,
                flex: 1,
                p: 2,
                height: 100,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#444", // lighter on hover
                  transform: "translateY(-2px) scale(1.02)", // subtle motion
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // smooth shadow
                },
              }}
              onClick={() => navigate("/products")}
            >
              <Inventory2Icon />
              <Typography variant="h6">Products</Typography>
            </Card>
          </Box>
        </Box>

        {/* Right: App Download */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#2E2E2E",
            p: 3,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Download the app
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              style={{ width: 160 }}
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              style={{ width: 160 }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
