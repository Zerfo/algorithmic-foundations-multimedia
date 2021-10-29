import { Fragment, useCallback, useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { CodeBlock, dracula } from "react-code-blocks";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import {
  hex2rgb,
  hex2cmyk,
  rgb2xyz,
  rgb2hsb,
  rgb2hsl,
  rgb2lab,
  rgb2yuv,
  functions,
} from "../../util/functions";

import style from "./style.module.scss";

function Lab_1() {
  const [color, setColor] = useColor("hex", "#000000");
  const [colors, setColors] = useState({});
  const { hex, rgb, cmyk, xuz, hsb, hsl, lab, yuv } = colors || {};

  useEffect(() => {
    const hex = "#000000";
    const rgb = hex2rgb(hex);
    setColors({
      hex: hex,
      rgb: rgb,
      cmyk: hex2cmyk(hex),
      xuz: rgb2xyz(rgb),
      hsb: rgb2hsb(rgb),
      hsl: rgb2hsl(rgb),
      lab: rgb2lab(rgb),
      yuv: rgb2yuv(rgb),
    });
  }, []);

  const onChangeColor = useCallback(
    (color) => {
      const { hex } = color;
      const rgb = hex2rgb(hex);
      setColors({
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
    [setColor]
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
        <div className={style.result_colors}>
          <TextField
            className={style.result_colors_item}
            label="HEX"
            value={hex}
          />
          <TextField
            className={style.result_colors_item}
            label="RGB"
            value={rgb}
          />
          <TextField
            className={style.result_colors_item}
            label="CMYK"
            value={cmyk}
          />
          <TextField
            className={style.result_colors_item}
            label="XYZ"
            value={xuz}
          />
          <TextField
            className={style.result_colors_item}
            label="HSB"
            value={hsb}
          />
          <TextField
            className={style.result_colors_item}
            label="HSL"
            value={hsl}
          />
          <TextField
            className={style.result_colors_item}
            label="LAB"
            value={lab}
          />
          <TextField
            className={style.result_colors_item}
            label="YUV"
            value={yuv}
          />
        </div>
      </div>
      <Typography variant="h4" gutterBottom>
        Исходный код функций
      </Typography>
      {functions.map(({ title, func }, funcId) => (
        <Fragment key={funcId}>
          <Typography variant="h5">{title}</Typography>
          <CodeBlock
            wrapLines
            codeBlock={true}
            language="jsx"
            theme={dracula}
            text={func}
          />
        </Fragment>
      ))}
    </div>
  );
}

export default Lab_1;
