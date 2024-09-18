import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { Grid } from "@mui/joy";

export default function OrchidCard({ orchid }) {
  return (
    <Grid key={orchid.id} size={{ xs: 2, sm: 4, md: 4 }}>
      <Card variant="outlined" sx={{ width: 320 }}>
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
          <Typography level="title-md">{orchid.name}</Typography>
          <Typography level="body-sm">{orchid.origin}</Typography>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography
              level="body-xs"
              textColor="text.secondary"
              sx={{ fontWeight: "md" }}
            >
              {orchid.rating} rating
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              textColor="text.secondary"
              sx={{ fontWeight: "md" }}
            >
              {orchid.category}
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>
    </Grid>
  );
}
