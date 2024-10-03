import React, { useContext } from "react";
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
} from "@mui/material";
import { Grid } from "@mui/joy";
import { Orchids } from "../ListOfOrchids";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import { ThemeContext } from "../themes/ThemeContext";
import { AspectRatio } from "@mui/joy";

export default function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orchid = Orchids.find((o) => o.Id === id);
  const { theme } = useContext(ThemeContext);

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
        minHeight: "calc(100vh - 64px - 56px)", // Adjust based on your header and footer heights
        bgcolor: theme.mainContent.backgroundColor,
        color: theme.text.primary,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          color: theme.text.primary,
          bgcolor: theme.mainContent.backgroundColor,
          py: 4,
        }}
      >
        <Button
          onClick={() => navigate("/fer-lab1")}
          variant='contained'
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, backgroundColor: theme.button.primary }}
        >
          Back to List
        </Button>
        <Paper
          elevation={3}
          sx={{
            overflow: "hidden",
            borderRadius: 2,
            backgroundColor: theme.mainContent.backgroundColor,
            color: theme.text.primary,
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} md={6}>
              <AspectRatio ratio='4/3'>
                <img
                  src={orchid.image}
                  alt={orchid.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    color: theme.text.primary,
                  }}
                />
              </AspectRatio>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3 }}>
                <Typography variant='h4' component='h1' gutterBottom>
                  {orchid.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating
                    name='read-only'
                    value={orchid.rating}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />
                    }
                  />
                  <Typography variant='body1' sx={{ ml: 1 }}>
                    ({orchid.rating}/5)
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography
                  variant='body1'
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <LocationOnIcon sx={{ mr: 1, color: theme.text.secondary }} />
                  Origin:{" "}
                  <Chip
                    label={orchid.origin}
                    sx={{ ml: 1, color: theme.icon.color }}
                  />
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <CategoryIcon sx={{ mr: 1, color: theme.text.secondary }} />
                  Category:{" "}
                  <Chip
                    label={orchid.category}
                    sx={{ ml: 1, color: theme.icon.color }}
                  />
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <ColorLensIcon sx={{ mr: 1, color: theme.text.secondary }} />
                  Color:{" "}
                  <Chip
                    label={orchid.color}
                    sx={{ ml: 1, color: theme.icon.color }}
                  />
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant='body1' paragraph>
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
      </Container>
    </Box>
  );
}
