import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import style from "./style.module.scss";

function Lab_1() {
  return (
    <div className={style.container}>
      <Typography variant="h4" gutterBottom>
        Лабораторная работа №2 «Видоизменение гистограмм»
      </Typography>
      <Typography variant="h6" gutterBottom>
        Задание
      </Typography>
      <Typography component="p">
        Написать программу построения гистограммы изображения. Предусмотреть
        возможность загрузки файлов всех основных типов изображений. Провести
        преобразование гистограммы, реализуя следующие процедуры:
      </Typography>
      <List component="nav">
        <ListItemText
          primary="1) Просветление изображения. Показать, как изменяется гистограмма на
разных значениях параметров."
        />
        <ListItemText
          primary="2) Инвертирование изображения (частичное - два варианта и полное).
Построение гистограмм исходного и итогового изображения."
        />
        <ListItemText
          primary="3) Пороговое изображение (бинарное изображение и яркостные срезы —
два варианта). Построение гистограмм исходного и итогового изображения."
        />
        <ListItemText
          primary="4) Изменение контраста (низко контрастное, средне контрастное и
высоко-контрастное). Построение гистограмм исходного и итогового
изображения."
        />
      </List>
      <Typography variant="h6">Решение</Typography>
      <Typography variant="h6">Исходный код функций</Typography>
    </div>
  );
}

export default Lab_1;
