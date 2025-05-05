import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DARK_THEME_BG, WHITE } from "../utils/colors";
import { useAuth } from "./common/context/auth-context";

const breadcrumbNameMap: any = {
  "/dashboard": "Dashboard",
  "/invoices": "Invoices",
  "/clients": "Clients",
  "/products": "Products",
};

export default function AppBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { isLoggedIn } = useAuth();
  // Do not render Breadcrumbs if on /dashboard
  if (location.pathname === "/dashboard" || location.pathname === "/") {
    return null;
  }

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ padding: 2, backgroundColor: DARK_THEME_BG, color: WHITE }}
    >
      {isLoggedIn ? (
        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          to="/dashboard"
        >
          Dashboard
        </Link>
      ) : (
        <Link component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </Link>
      )}

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        // Adjust label
        let breadcrumbLabel =
          breadcrumbNameMap[`/${value}`] ||
          (isNaN(Number(value))
            ? value.charAt(0).toUpperCase() + value.slice(1)
            : "Details");

        // If value is dashboard, skip it
        if (value === "dashboard") return null;

        return isLast ? (
          <Typography color={WHITE} key={to}>
            {breadcrumbLabel}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={to}
            key={to}
          >
            {breadcrumbLabel}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
