import { Grid } from "@mui/joy";
import OrchidCard from "./OrchidCard";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../themes/ThemeContext";
import { Box } from "@mui/material";

export default function Content() {
  const { theme } = useContext(ThemeContext);
  const [api, setApi] = useState([]);
  const baseUrl = `https://670f54e33e71518616575e20.mockapi.io/orchids-lab`;
  const fetchAPI = () => {
    fetch(baseUrl + "?sortBy=Id&order=desc")
      .then((resp) => resp.json())
      .then((data) => setApi(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
