import { Grid } from "@mui/joy";
import React from "react";
import { Orchids } from "../../ListOfOrchids";
import OrchidCard from "./OrchidCard";
import { useContext } from "react";
import { ThemeContext } from "../../themes/ThemeContext";
import { Box } from "@mui/material";

export default function Content() {
  const { theme } = useContext(ThemeContext);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={{ xs: 3, md: 4, lg: 4 }}
        sx={{
          padding: 2,
          width: "100%",
          margin: "0 auto",
          backgroundColor: theme.mainContent.backgroundColor,
          paddingTop: "36px",
        }}
      >
        {Orchids.map((orchid) => {
          return (
            <Grid key={orchid.Id} item xs={12} sm={6} md={4}>
              <OrchidCard key={orchid.Id} orchid={orchid} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
