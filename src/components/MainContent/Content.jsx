import { Container, Grid } from "@mui/joy";
import React from "react";
import { Orchids } from "../../ListOfOrchids";
import OrchidCard from "./OrchidCard";

export default function Content() {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3, lg: 4 }}
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        padding: 2,
        width: "100%",
        margin: "0 auto",
      }}
    >
      {Orchids.map((orchid) => {
        return (
          <Grid key={orchid.Id} size={{ xs: 2, sm: 4, md: 4 }}>
            <OrchidCard key={orchid.Id} orchid={orchid} />
          </Grid>
        );
      })}
    </Grid>
  );
}
