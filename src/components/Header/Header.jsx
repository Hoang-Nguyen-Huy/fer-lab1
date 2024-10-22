import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ToggleThemeButton from "../Button/ToggleThemeButton";
import { ThemeContext } from "../../themes/ThemeContext";
import { motion } from "framer-motion";
import LoginIcon from "@mui/icons-material/Login";

const pages = [
  { name: "Home", path: "/fer-lab1/" },
  { name: "Special", path: "/fer-lab1/natural" },
  { name: "News", path: "/fer-lab1/news" },
  { name: "About", path: "/fer-lab1/about" },
  { name: "Contact", path: "/fer-lab1/contact" },
];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { theme, light } = useContext(ThemeContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const getTextColor = () => {
    if (light) {
      return scrolled ? "white" : "#333333"; // Dark gray when not scrolled in light mode
    }
    return "white"; // Always white in dark mode
  };

  const handleLogin = () => {
    console.log("Login clicked");
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: scrolled
          ? theme.header.backgroundColor
          : "transparent",
        boxShadow: scrolled ? 3 : 0,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LocalFloristIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                fontSize: 40,
                color: getTextColor(),
              }}
            />
          </motion.div>
          <Link
            to={`/fer-lab1/`}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant='h6'
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: getTextColor(),
                textDecoration: "none",
              }}
            >
              ORCHID HAVEN
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              sx={{ color: getTextColor() }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                >
                  <Typography textAlign='center'>{page.name}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogin}>
                <Typography textAlign='center'>Login</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <LocalFloristIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              fontSize: 32,
              color: getTextColor(),
            }}
          />
          <Typography
            variant='h5'
            noWrap
            component={Link}
            to='/fer-lab1/'
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: getTextColor(),
              textDecoration: "none",
            }}
          >
            ORCHID HAVEN
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 1,
                  color: getTextColor(),
                  display: "block",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: 0,
                    left: 0,
                    backgroundColor: getTextColor(),
                    transform:
                      location.pathname === page.path
                        ? "scaleX(1)"
                        : "scaleX(0)",
                    transition: "transform 0.3s ease-in-out",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant='outlined'
              startIcon={<LoginIcon />}
              onClick={handleLogin}
              sx={{
                color: getTextColor(),
                borderColor: getTextColor(),
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              Login
            </Button>
            <ToggleThemeButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
