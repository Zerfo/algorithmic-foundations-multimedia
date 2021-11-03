import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import DoneAllIcon from "@mui/icons-material/DoneAll";

import style from "./style.module.scss";

function LabCard(props) {
  const { title, subtitle, link, isDisabled, isDone } = props;

  return (
    <Grid item xs={2} sm={4} md={4} className={style.card}>
      <Card className={style.card}>
        <CardActionArea href={link} disabled={isDisabled}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </CardContent>
          {isDone && (
            <div className={style.badge}>
              <DoneAllIcon color="success" />
            </div>
          )}
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default LabCard;
