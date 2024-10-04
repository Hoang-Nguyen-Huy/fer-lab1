import React, { useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import { Grid } from "@mui/joy";
import { motion } from "framer-motion";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import { newsItems } from "../NewsItems";
import { ThemeContext } from "../themes/ThemeContext";

const MotionCard = motion(Card);

export default function News() {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 64px - 56px)",
        backgroundColor: theme.mainContent.backgroundColor,
        padding: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Typography
        variant='h2'
        component='h1'
        gutterBottom
        align='center'
        sx={{
          mb: 6,
          fontWeight: "bold",
          color: theme.text.primary,
          fontSize: { xs: "2.5rem", md: "3.5rem" },
          textShadow: `2px 2px 4px ${theme.text.secondary}`,
        }}
      >
        Latest Orchid News
      </Typography>
      <Grid container spacing={4}>
        {newsItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <MotionCard
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                backgroundColor: theme.card.backgroundColor,
                color: theme.card.color,
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: theme.elevation[3],
                },
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardMedia
                component='img'
                height='200'
                image={item.image}
                alt={item.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1, position: "relative" }}>
                <Chip
                  label={item.category}
                  size='small'
                  sx={{
                    mb: 2,
                    backgroundColor: theme.chip.backgroundColor,
                    color: theme.chip.color,
                    position: "absolute",
                    top: -20,
                    left: 16,
                    boxShadow: theme.elevation[1],
                  }}
                />
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                  sx={{ fontWeight: "bold", color: theme.text.primary }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: theme.text.secondary, mb: 2 }}
                >
                  {item.excerpt}
                </Typography>
                <Divider sx={{ mb: 2, backgroundColor: theme.divider }} />
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    src={item.author.avatar}
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                  <Typography
                    variant='subtitle2'
                    sx={{ color: theme.text.primary, mr: 2 }}
                  >
                    {item.author.name}
                  </Typography>
                  <AccessTimeIcon
                    sx={{ fontSize: 16, mr: 0.5, color: theme.icon.color }}
                  />
                  <Typography
                    variant='caption'
                    sx={{ color: theme.text.secondary }}
                  >
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    startIcon={<BookmarkBorderIcon />}
                    size='small'
                    sx={{ color: theme.button.primary }}
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<ShareIcon />}
                    size='small'
                    sx={{ color: theme.button.primary }}
                  >
                    Share
                  </Button>
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
