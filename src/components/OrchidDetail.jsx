import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Rating,
  Paper,
  Chip,
  Divider,
  Container,
  Modal,
  IconButton,
} from "@mui/material";
import { Grid } from "@mui/joy";
import { Orchids } from "../ListOfOrchids";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "../themes/ThemeContext";
import { AspectRatio } from "@mui/joy";
import { motion } from "framer-motion";
import { RelatedOrchidsSlider } from "./RelatedOrchidSlider";

const MotionBox = motion(Box);

export default function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orchid = Orchids.find((o) => o.Id === id);
  const { theme } = useContext(ThemeContext);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  if (!orchid) {
    return (
      <Container
        maxWidth='lg'
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: theme.mainContent.backgroundColor,
        }}
      >
        <Typography variant='h4' color={theme.text.primary}>
          Orchid not found
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 64px)",
        bgcolor: theme.mainContent.backgroundColor,
        color: theme.text.primary,
        pt: { xs: 8, sm: 10 }, // Add top padding to create space below the header
      }}
    >
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Button
          onClick={() => navigate("/fer-lab1")}
          variant='contained'
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 3,
            backgroundColor: theme.button.primary,
            "&:hover": {
              backgroundColor: theme.button.hover,
            },
          }}
        >
          Back to List
        </Button>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              overflow: "hidden",
              borderRadius: 2,
              backgroundColor: theme.card.backgroundColor,
              color: theme.text.primary,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={12} md={6}>
                <Box sx={{ position: "relative" }}>
                  <AspectRatio ratio='4/3'>
                    <img
                      src={orchid.image}
                      alt={orchid.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </AspectRatio>
                  <Button
                    variant='contained'
                    startIcon={<PlayCircleOutlineIcon />}
                    onClick={() => setVideoModalOpen(true)}
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                      },
                    }}
                  >
                    Watch Video
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 4 }}>
                  <Typography
                    variant='h4'
                    component='h1'
                    gutterBottom
                    sx={{ fontWeight: "bold", color: theme.text.primary }}
                  >
                    {orchid.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Rating
                      name='read-only'
                      value={orchid.rating}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize='inherit'
                        />
                      }
                    />
                    <Typography
                      variant='body1'
                      sx={{ ml: 1, color: theme.text.secondary }}
                    >
                      ({orchid.rating}/5)
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography
                    variant='body1'
                    sx={{ mb: 2, display: "flex", alignItems: "center" }}
                  >
                    <LocationOnIcon sx={{ mr: 1, color: theme.icon.color }} />
                    Origin:{" "}
                    <Chip
                      label={orchid.origin}
                      sx={{
                        ml: 1,
                        backgroundColor: theme.chip.backgroundColor,
                        color: theme.chip.color,
                      }}
                    />
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{ mb: 2, display: "flex", alignItems: "center" }}
                  >
                    <CategoryIcon sx={{ mr: 1, color: theme.icon.color }} />
                    Category:{" "}
                    <Chip
                      label={orchid.category}
                      sx={{
                        ml: 1,
                        backgroundColor: theme.chip.backgroundColor,
                        color: theme.chip.color,
                      }}
                    />
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{ mb: 2, display: "flex", alignItems: "center" }}
                  >
                    <ColorLensIcon sx={{ mr: 1, color: theme.icon.color }} />
                    Color:{" "}
                    <Chip
                      label={orchid.color}
                      sx={{
                        ml: 1,
                        backgroundColor: theme.chip.backgroundColor,
                        color: theme.chip.color,
                      }}
                    />
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography
                    variant='body1'
                    paragraph
                    sx={{ color: theme.text.secondary, lineHeight: 1.6 }}
                  >
                    {orchid.detail}
                  </Typography>
                  {orchid.isSpecial && (
                    <Chip
                      icon={<StarIcon />}
                      label='Special Orchid'
                      color='warning'
                      sx={{ mt: 2 }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </MotionBox>

        <RelatedOrchidsSlider currentOrchid={orchid} theme={theme} />
      </Container>

      <Modal
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        aria-labelledby='video-modal-title'
        aria-describedby='video-modal-description'
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 800,
            bgcolor: theme.card.backgroundColor,
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton
              onClick={() => setVideoModalOpen(false)}
              sx={{ color: theme.text.primary }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <AspectRatio ratio='16/9'>
            <iframe
              width='100%'
              height='100%'
              src={orchid.video}
              title={orchid.name}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </AspectRatio>
        </Box>
      </Modal>
    </Box>
  );
}
