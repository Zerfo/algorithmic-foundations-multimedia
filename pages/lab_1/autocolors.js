import TextField from "@mui/material/TextField";

import style from "./style.module.scss";

export default function(props) {
  const { hex, rgb, cmyk, xuz, hsb, hsl, lab, yuv, hsv } = props || {};

  return (
    <div className={style.result_colors}>
      <TextField
        className={style.result_colors_item}
        label="HEX"
        name='hex'
        value={hex}
      />
      <TextField
        className={style.result_colors_item}
        label="RGB"
        value={rgb}
        name='hex'
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