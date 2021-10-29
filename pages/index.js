import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import LabCard from "../components/LabCard";

import Labs from "../constants/labs";

function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={6}>
        {Labs.map((lab, labIdx) => (
          <Grid item xs={2} sm={4} md={4} key={labIdx}>
            <LabCard {...lab} key={labIdx} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
