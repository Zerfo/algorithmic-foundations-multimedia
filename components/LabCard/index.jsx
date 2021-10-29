import Badge from "@mui/material/Badge";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import DoneAllIcon from "@mui/icons-material/DoneAll";

import style from "./style.module.scss";

function LabCard(props) {
  const { title, subtitle, link, isDisabled, isDone } = props;

  return (
    <Card>
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
  );
}

export default LabCard;
