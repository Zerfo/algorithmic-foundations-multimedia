import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import LabCard from "../components/LabCard";

import Labs from "../constants/labs";

import style from "../styles/index.module.scss";

function Home() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={6} className={style.content_container}>
          {Labs.map((lab, labIdx) => (
            <LabCard {...lab} key={labIdx} />
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Home;
