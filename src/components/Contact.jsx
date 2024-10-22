import { useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { Grid } from "@mui/joy";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { ThemeContext } from "../themes/ThemeContext";

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

export default function Contact() {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: theme.mainContent.backgroundColor,
        color: theme.text.primary,
        paddingTop: '8px'
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          py: 8,
          backgroundColor: theme.mainContent.backgroundColor,
          minHeight: "100vh",
          padding: "2rem",
        }}
      >
        <Typography
          variant='h2'
          component='h1'
          align='center'
          gutterBottom
          color={theme.text.primary}
        >
          Contact Us
        </Typography>
        <Grid container spacing={4} justifyContent='center'>
          <Grid item xs={12} md={6}>
            <MotionPaper
              elevation={3}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              sx={{ p: 4, backgroundColor: theme.card.backgroundColor }}
            >
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label='Name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  margin='normal'
                  required
                  sx={{
                    "& .MuiInputLabel-root": { color: theme.text.secondary },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: theme.text.secondary },
                      "&:hover fieldset": { borderColor: theme.text.primary },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.text.primary,
                      },
                    },
                    "& .MuiInputBase-input": { color: theme.text.primary },
                  }}
                />
                <TextField
                  fullWidth
                  label='Email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  margin='normal'
                  required
                  sx={{
                    "& .MuiInputLabel-root": { color: theme.text.secondary },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: theme.text.secondary },
                      "&:hover fieldset": { borderColor: theme.text.primary },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.text.primary,
                      },
                    },
                    "& .MuiInputBase-input": { color: theme.text.primary },
                  }}
                />
                <TextField
                  fullWidth
                  label='Message'
                  name='message'
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  margin='normal'
                  required
                  sx={{
                    "& .MuiInputLabel-root": { color: theme.text.secondary },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: theme.text.secondary },
                      "&:hover fieldset": { borderColor: theme.text.primary },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.text.primary,
                      },
                    },
                    "& .MuiInputBase-input": { color: theme.text.primary },
                  }}
                />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Send Message
                </Button>
              </form>
            </MotionPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: "100%",
                  backgroundColor: theme.card.backgroundColor,
                }}
              >
                <Typography
                  variant='h5'
                  gutterBottom
                  color={theme.text.primary}
                >
                  Contact Information
                </Typography>
                <Box display='flex' alignItems='center' mb={2}>
                  <IconButton sx={{ color: theme.icon.color, mr: 1 }}>
                    <EmailIcon />
                  </IconButton>
                  <Typography color={theme.text.primary}>
                    contact@example.com
                  </Typography>
                </Box>
                <Box display='flex' alignItems='center' mb={2}>
                  <IconButton sx={{ color: theme.icon.color, mr: 1 }}>
                    <PhoneIcon />
                  </IconButton>
                  <Typography color={theme.text.primary}>
                    +1 (123) 456-7890
                  </Typography>
                </Box>
                <Box display='flex' alignItems='center' mb={2}>
                  <IconButton sx={{ color: theme.icon.color, mr: 1 }}>
                    <LocationIcon />
                  </IconButton>
                  <Typography color={theme.text.primary}>
                    Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                    Hồ Chí Minh
                  </Typography>
                </Box>
                <Box mt={4}>
                  <Typography
                    variant='h6'
                    gutterBottom
                    color={theme.text.primary}
                  >
                    Find Us On Map
                  </Typography>
                  <Paper elevation={2} sx={{ height: 250, overflow: "hidden" }}>
                    <iframe
                      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610010397031!2d106.809883!3d10.841127599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1727840452482!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
                      width='100%'
                      height='100%'
                      style={{ border: 0 }}
                      allowFullScreen
                      loading='lazy'
                    ></iframe>
                  </Paper>
                </Box>
              </Paper>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
