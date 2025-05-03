import { Box, Link, Typography } from "@mui/material";
import { GREY_BACKGROUND, WHITE } from "../../utils/colors";
import LOGIN_AVATAR from "../../assets/avatar-login.png";

const RightPanel: React.FC = ()  => {
  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: GREY_BACKGROUND,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        pt: { xs: 2, sm: 2, lg: 0, xl: 0 },
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom color={WHITE}>
        Did you know?
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 300 }} color={WHITE}>
        Our support team is just a message away—always ready to help you
        succeed.
      </Typography>
      <Box
        component="img"
        src={LOGIN_AVATAR}
        alt="Support Illustration"
        sx={{ width: "100%", maxWidth: 300 }}
      />
      <Link
        href="#"
        color="primary"
        underline="hover"
        sx={{ position: "absolute", bottom: 16 }}
      >
        This website uses cookies
      </Link>
    </Box>
  );
};

export default RightPanel;
