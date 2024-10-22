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
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { UserAuth } from "../../context/AuthContext";

const pages = [
  { name: "Home", path: "/fer-lab1/" },
  { name: "Special", path: "/fer-lab1/natural" },
  { name: "News", path: "/fer-lab1/news" },
  { name: "About", path: "/fer-lab1/about" },
  { name: "Contact", path: "/fer-lab1/contact" },
];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { theme, light } = useContext(ThemeContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { googleSignIn, user, logOut } = UserAuth();

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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getTextColor = () => {
    if (light) {
      return scrolled ? "white" : "#333333";
    }
    return "white";
  };

  const handleLogin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
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
              {!user && (
                <MenuItem onClick={handleLogin}>
                  <Typography textAlign='center'>Login</Typography>
                </MenuItem>
              )}
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
            {!user ? (
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
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.displayName} src={user.photoURL} />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>
                      {user.displayName}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
            <ToggleThemeButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
