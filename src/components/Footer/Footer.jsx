import { useContext } from "react";
import { Box, Typography, Container, IconButton, Divider } from "@mui/material";
import { Grid } from "@mui/joy";
import { ThemeContext } from "../../themes/ThemeContext";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { Link } from "react-router-dom";

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  const linkStyle = {
    color: theme.text.secondary,
    textDecoration: "none",
    display: "block",
    padding: "8px 0",
    transition: "color 0.3s ease",
    "&:hover": {
      color: theme.text.primary,
    },
  };

  return (
    <Box
      component='footer'
      sx={{
        py: 6,
        px: 2,
        backgroundColor: theme.footer.backgroundColor,
        color: theme.text.secondary,
        borderTop: `1px solid ${theme.divider}`,
      }}
    >
      <Container maxWidth='lg'>
        <Grid container spacing={4} justifyContent='space-between'>
          <Grid item xs={12} sm={4}>
            <Box display='flex' alignItems='center' mb={2}>
              <LocalFloristIcon
                sx={{ fontSize: 40, mr: 1, color: theme.icon.color }}
              />
              <Typography
                variant='h5'
                color={theme.text.primary}
                sx={{ fontWeight: "bold" }}
              >
                Orchid Haven
              </Typography>
            </Box>
            <Typography variant='body2' color={theme.text.secondary}>
              Discover the beauty and diversity of orchids. Our passion is to
              share knowledge and inspire orchid enthusiasts worldwide.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='h6' color={theme.text.primary} gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link to='/fer-lab1/' style={linkStyle}>
                Home
              </Link>
              <Link to='/fer-lab1/natural' style={linkStyle}>
                Special Orchid
              </Link>
              <Link to='/fer-lab1/news' style={linkStyle}>
                Orchid News
              </Link>
              <Link to='/fer-lab1/contact' style={linkStyle}>
                Contact Us
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='h6' color={theme.text.primary} gutterBottom>
              Stay Connected
            </Typography>
            <Typography
              variant='body2'
              color={theme.text.secondary}
              gutterBottom
            >
              Follow us on social media for daily orchid inspiration and tips.
            </Typography>
            <Box>
              <IconButton
                color='inherit'
                aria-label='Facebook'
                href='https://www.facebook.com/hoangnguyen.c1002/'
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color='inherit'
                aria-label='Twitter'
                href='https://www.linkedin.com/in/hoang-nguyen-c1002/'
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                color='inherit'
                aria-label='Instagram'
                href='https://www.instagram.com/__hoang.nguyeen__/'
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color='inherit'
                aria-label='Github'
                href='https://github.com/Hoang-Nguyen-Huy'
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, backgroundColor: theme.divider }} />
        <Box
          mt={3}
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='body2' color={theme.text.secondary}>
            © {new Date().getFullYear()} Orchid Haven. All rights reserved.
          </Typography>
          <Box>
            <Link
              to='#'
              style={{ ...linkStyle, display: "inline", marginRight: "16px" }}
            >
              Privacy Policy
            </Link>
            <Link to='#' style={{ ...linkStyle, display: "inline" }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
