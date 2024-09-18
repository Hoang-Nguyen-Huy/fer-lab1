import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

export default function OrchidCard({ orchid }) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        bgcolor: 'black',
        color: 'white',
        '&:hover': {
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
        },
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={orchid.image + "?auto=format&fit=crop&w=318"}
            srcSet={orchid.image + "?auto=format&fit=crop&w=318&dpr=2 2x"}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>{orchid.name}</Typography>
        <Typography level="body-sm" sx={{ color: 'grey.400', mb: 2 }}>{orchid.origin}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}>
        <Divider inset="context" sx={{ bgcolor: 'white' }}/>
        <CardContent orientation="horizontal">
          <Typography
            level="body-xs"
            textColor="text.secondary"
            sx={{ 
              fontWeight: "md",
              color: 'white' 
            }}
          >
            {orchid.rating} rating
          </Typography>
          <Divider orientation="vertical" sx={{ color: 'white' }}/>
          <Typography
            level="body-xs"
            textColor="text.secondary"
            sx={{ 
              fontWeight: "md",
              color: 'white' 
            }}
          >
            {orchid.category}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
