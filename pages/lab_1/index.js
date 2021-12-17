import { useCallback, useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import SourceCode from "../../components/SourceCode";

import Autocolors from './autocolors';
import Handlecolors from './handlecolors';

import {
  hex2rgb,
  hex2cmyk,
  rgb2xyz,
  rgb2hsb,
  rgb2hsl,
  rgb2lab,
  rgb2yuv,
  rgb2hsv,
  functions,
} from "../../util/functions";

import style from "./style.module.scss";

export function Lab_1() {
  const [color, setColor] = useColor("hex", "#000000");
  const [colors, setColors] = useState({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const hex = "#000000";
    const rgb = hex2rgb(hex);
    const hsv = rgb2hsv(rgb.split(','))
    setColors({
      hsv,
      hex: hex,
      rgb: rgb,
      cmyk: hex2cmyk(hex),
      xuz: rgb2xyz(rgb),
      hsb: rgb2hsb(rgb),
      hsl: rgb2hsl(rgb),
      lab: rgb2lab(rgb),
      yuv: rgb2yuv(rgb),
    });
  }, [checked]);

  const onChangeColor = useCallback(
    (color) => {
      const { hex } = color;
      const rgb = hex2rgb(hex);
      const hsv = rgb2hsv(rgb.split(','))
      setColors({
        hsv,
        hex: hex,
        rgb: rgb,
        cmyk: hex2cmyk(hex),
        xuz: rgb2xyz(rgb),
        hsb: rgb2hsb(rgb),
        hsl: rgb2hsl(rgb),
        lab: rgb2lab(rgb),
        yuv: rgb2yuv(rgb),
      });
      setColor(color);
    },
    []
  );

  return (
    <div className={style.container}>
      <Typography variant="h3" gutterBottom>
        Лабораторная работа №1 «Цветовые модели»
      </Typography>
      <Typography variant="h4" gutterBottom>
        Задание
      </Typography>
      <Typography component="p">
        Реализовать в любой среде программирования модуль формирования цветов с
        использованием моделей RGB, CMYK, XYZ, HSB, HLS, Lab и YUV, перевод
        цвета из одной модели в другую.
      </Typography>
      <Typography component="p">
        Выбора цвета для конвертации выполняется с помощью цветового круга. При
        изменении значения цвета в полях ввода, также происходит выделение
        выбранного цвета на цветовом круге.
      </Typography>
      <Typography variant="h4" gutterBottom>
        Решение
      </Typography>
      <FormControlLabel control={<Switch value={checked} onChange={({ target }) => setChecked(target.checked)}/>} label="Ручной ввод" />
      <div className={style.result_container}>
        <ColorPicker
          width={456}
          height={228}
          color={color}
          onChange={onChangeColor}
          hideHSV
          hideRGB
          hideHEX
        />
        {!checked ? <Autocolors {...colors} /> : <Handlecolors color={color} setColor={onChangeColor} />}
      </div>
      <Typography variant="h4" gutterBottom>
        Исходный код функций
      </Typography>
      {functions.map(({ title, func }, funcId) => (
        <SourceCode key={funcId} title={title} func={func} />
      ))}
    </div>
  );
}

export default Lab_1;
