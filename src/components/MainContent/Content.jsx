import { Grid } from "@mui/joy";
import OrchidCard from "./OrchidCard";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../themes/ThemeContext";
import { Box } from "@mui/material";
import { getAllOrchids } from "../../apis/OrchidApi";

export default function Content() {
  const { theme } = useContext(ThemeContext);
  const [api, setApi] = useState([]);
  useEffect(() => {
    const fetchOrchids = async () => {
      try {
        const data = await getAllOrchids();
        setApi(data);
      } catch (error) {
        console.error("Failed to fetch orchids:", error);
      }
    };

    fetchOrchids();
  }, []);

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
        {api.map((orchid) => {
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
