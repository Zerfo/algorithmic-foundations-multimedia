import { useCallback, useState, useEffect } from "react";

import TextField from "@mui/material/TextField";

import {
  hex2rgb,
  rgb2hex,
  hex2cmyk,
  rgb2xyz,
  rgb2hsb,
  rgb2hsl,
  rgb2lab,
  rgb2yuv,
  rgb2hsv,
} from "../../util/functions";

import style from "./style.module.scss";

export default function({ setColor }) {
  const [hexColor, setHexColor] = useState('');
  const [rgbColor, setRgbColor] = useState('');

  const [otherColors, setOtherColors] =  useState({});
  const { cmyk, xuz, hsb, hsl, lab, yuv, hsv } = otherColors || {};


  const handleHexColor = useCallback(({ target }) => {
    const {value} = target || {};
    setHexColor(value)
  }, [])

  const handleRgbColor = useCallback(({ target }) => {
    const {value} = target || {};
    setRgbColor(value)
  }, [])

  useEffect(() => {
    if(hexColor.length === 7) {
      const rgb = hex2rgb(hexColor);
      const hsv = rgb2hsv(rgb.split(','))
      setRgbColor(rgb)
      setOtherColors({
        hsv,
        cmyk: hex2cmyk(hexColor),
        xuz: rgb2xyz(rgb),
        hsb: rgb2hsb(rgb),
        hsl: rgb2hsl(rgb),
        lab: rgb2lab(rgb),
        yuv: rgb2yuv(rgb),
      });
      setColor({
        hex: hexColor,
        hsv: {
          h: hsv[0],
          s: hsv[1],
          v: hsv[2],
          a: undefined,
        },
        rgb: {
          r: rgb.split(',')[0],
          g: rgb.split(',')[1],
          b: rgb.split(',')[2],
          a: undefined,
        }
      })
    }
  }, [hexColor]);

  useEffect(() => {
    if(rgbColor.length === 11) {
      const hex = '#' + rgb2hex(rgbColor.split(','));
      setHexColor(hex)
    }
  }, [rgbColor]);

  return (
    <div className={style.result_colors}>
      <TextField
        className={style.result_colors_item}
        label="HEX"
        name='hex'
        value={hexColor}
        onChange={handleHexColor}
      />
      <TextField
        className={style.result_colors_item}
        label="RGB"
        value={rgbColor}
        name='rgb'
        onChange={handleRgbColor}
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
      <TextField
        className={style.result_colors_item}
        label="HSV"
        value={hsv}
      />
    </div>
  )
}