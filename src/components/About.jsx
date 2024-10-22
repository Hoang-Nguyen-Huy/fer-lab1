/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import avt from "../assets/images/avt.jpg";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from "@mui/material";
import { Grid } from "@mui/joy";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  GitHub as GitHubIcon,
  School as SchoolIcon,
  EmojiObjects as MissionIcon,
  Engineering as ExpertIcon,
} from "@mui/icons-material";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { motion } from "framer-motion";
import { ThemeContext } from "../themes/ThemeContext";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const SectionCard = ({ icon, title, content, theme }) => {
  return (
    <MotionCard
      elevation={3}
      sx={{
        backgroundColor: theme.card.backgroundColor,
        color: theme.text.primary,
        transition: "all 0.3s ease-in-out",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: theme.elevation[3],
      }}
    >
      <CardContent>
        <Box display='flex' alignItems='center' mb={2}>
          {React.cloneElement(icon, { style: { color: theme.icon.color } })}
          <Typography
            variant='h6'
            component='h3'
            ml={1}
            color={theme.text.primary}
          >
            {title}
          </Typography>
        </Box>
        <Typography variant='body1' color={theme.text.secondary}>
          {content}
        </Typography>
      </CardContent>
    </MotionCard>
  );
};

export default function About() {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: theme.mainContent.backgroundColor,
        color: theme.text.primary,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: theme.mainContent.backgroundColor,
          color: theme.text.primary,
          flex: "1 0 auto",
          padding: "2rem",
          paddingBottom: "4rem",
        }}
      >
        <Box py={8}>
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            mb={6}
          >
            <Typography
              variant='h2'
              component='h1'
              align='center'
              gutterBottom
              color={theme.text.primary}
            >
              About Me
            </Typography>
          </MotionBox>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box textAlign='center'>
                  <Avatar
                    alt='Nguyen Huy Hoang'
                    src={avt}
                    sx={{ width: 200, height: 200, margin: "auto", mb: 2 }}
                  />
                  <Typography
                    variant='h4'
                    component='h2'
                    gutterBottom
                    color={theme.text.primary}
                  >
                    Nguyen Huy Hoang
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    color={theme.text.secondary}
                    gutterBottom
                  >
                    Software Engineering Student
                  </Typography>
                  <Box>
                    <IconButton
                      aria-label='Facebook'
                      sx={{ color: theme.icon.color }}
                      href='https://www.facebook.com/hoangnguyen.c1002/'
                    >
                      <FacebookIcon />
                    </IconButton>
                    <IconButton
                      aria-label='Instagram'
                      sx={{ color: theme.icon.color }}
                      href='https://www.instagram.com/__hoang.nguyeen__/'
                    >
                      <InstagramIcon />
                    </IconButton>
                    <IconButton
                      aria-label='GitHub'
                      sx={{ color: theme.icon.color }}
                      href='https://github.com/Hoang-Nguyen-Huy'
                    >
                      <GitHubIcon />
                    </IconButton>
                  </Box>
                </Box>
              </MotionBox>
            </Grid>

            <Grid item xs={12} md={8}>
              <MotionBox
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Typography
                  variant='h5'
                  component='h3'
                  gutterBottom
                  color={theme.text.primary}
                >
                  Education
                </Typography>
                <Box display='flex' alignItems='center' mb={2}>
                  <SchoolIcon sx={{ color: theme.icon.color, mr: 1 }} />
                  <Typography variant='body1' color={theme.text.primary}>
                    FPT University, Ho Chi Minh City
                  </Typography>
                </Box>
                <Typography
                  variant='body1'
                  paragraph
                  color={theme.text.secondary}
                >
                  I am currently pursuing a degree in Software Engineering at
                  FPT University in Ho Chi Minh City. My passion for technology
                  and problem-solving drives me to excel in my studies and
                  explore innovative solutions in the field of software
                  development.
                </Typography>
              </MotionBox>
            </Grid>
          </Grid>

          <Box mt={8}>
            <Typography
              variant='h4'
              component='h2'
              align='center'
              gutterBottom
              color={theme.text.primary}
            >
              Our Approach
            </Typography>
            <Grid container spacing={4} mt={2}>
              <Grid item xs={12} md={4}>
                <MotionBox
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <SectionCard
                    icon={<MissionIcon fontSize='large' />}
                    title='Our Mission'
                    content="We strive to develop innovative software solutions that address real-world challenges and improve people's lives. Our goal is to create user-friendly, efficient, and scalable applications that make a positive impact on society."
                    theme={theme}
                  />
                </MotionBox>
              </Grid>
              <Grid item xs={12} md={4}>
                <MotionBox
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <SectionCard
                    icon={<ExpertIcon fontSize='large' />}
                    title='Expert Care'
                    content='Our team of skilled developers and designers are committed to delivering high-quality software products. We stay up-to-date with the latest technologies and best practices to ensure that our solutions are robust, secure, and future-proof.'
                    theme={theme}
                  />
                </MotionBox>
              </Grid>
              <Grid item xs={12} md={4}>
                <MotionBox
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <SectionCard
                    icon={<AllInclusiveIcon fontSize='large' />}
                    title='Sustainable Practices'
                    content='We are committed to sustainable software development practices. This includes writing clean, maintainable code, optimizing for energy efficiency, and considering the long-term environmental impact of our digital solutions.'
                    theme={theme}
                  />
                </MotionBox>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
