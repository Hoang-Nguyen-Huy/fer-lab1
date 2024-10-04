import { Grid } from "@mui/joy";
import React from "react";
import { Orchids } from "../../ListOfOrchids";
import OrchidCard from "./OrchidCard";
import { useContext } from "react";
import { ThemeContext } from "../../themes/ThemeContext";

export default function Content() {
  const { theme } = useContext(ThemeContext);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3, lg: 4 }}
      // columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        padding: 2,
        width: "100%",
        margin: "0 auto",
        backgroundColor: theme.mainContent.backgroundColor,
        paddingTop: '36px'
      }}
    >
      {Orchids.map((orchid) => {
        return (
          <Grid key={orchid.Id} size={{ xs: 1, sm: 3, md: 4 }}>
            <OrchidCard key={orchid.Id} orchid={orchid} />
          </Grid>
        );
      })}
    </Grid>
  );
}
