import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Rating } from "@mui/material";
import { Orchids } from "../ListOfOrchids";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";

export default function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orchid = Orchids.find((o) => o.Id === id);

  if (!orchid) {
    return <Typography>Orchid not found</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: 4,
        color: "white",
        bgcolor: "black",
      }}
    >
      <Button
        onClick={() => navigate("/fer-lab1")}
        variant='outlined'
        sx={{ mb: 2 }}
      >
        Back to List
      </Button>
      <img
        src={orchid.image}
        alt={orchid.name}
        style={{
          width: "100%",
          height: 400,
          objectFit: "cover",
          marginBottom: 2,
        }}
      />
      <Typography variant='h3' component='h1' gutterBottom>
        {orchid.name}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Rating name='read-only' value={orchid.rating} readOnly />
        <Typography variant='body1' sx={{ ml: 1 }}>
          ({orchid.rating}/5)
        </Typography>
      </Box>
      <Typography
        variant='body1'
        sx={{ mb: 2, display: "flex", alignItems: "center" }}
      >
        <LocationOnIcon sx={{ mr: 1 }} /> Origin: {orchid.origin}
      </Typography>
      <Typography
        variant='body1'
        sx={{ mb: 2, display: "flex", alignItems: "center" }}
      >
        <CategoryIcon sx={{ mr: 1 }} /> Category: {orchid.category}
      </Typography>
      <Typography
        variant='body1'
        sx={{ mb: 2, display: "flex", alignItems: "center" }}
      >
        <ColorLensIcon sx={{ mr: 1 }} /> Color: {orchid.color}
      </Typography>
      <Typography variant='body1'>
        {orchid.detail}
      </Typography>
      {orchid.isSpecial && (
        <Typography variant='body1' sx={{ fontStyle: "italic", color: "gold" }}>
          This is a special orchid!
        </Typography>
      )}
    </Box>
  );
}
