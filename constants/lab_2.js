export const code = `import { useCallback, useRef, useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import style from "./style.module.scss";

export function Lab_2() {
  const resultRef = useRef();
  const histogramRef = useRef();
  const imgRef = useRef();

  const [state, setState] = useState({
    brightness: 0,
    contrast: 0,
    red: false,
    green: false,
    blue: false,
    alpha: false,
  });
  const { brightness, contrast, red, green, blue, alpha } = state || {};

  const onSliderChange = useCallback(({ target }, value) => {
    setState((oldState) => ({
      ...oldState,
      [target.name]: value,
    }));
  }, []);

  const processCanvas = useCallback(
    (canvasId, callback) => {
      const canvas =
        canvasId === "canvasResult"
          ? resultRef?.current
          : histogramRef?.current;

      const ctx = canvas.getContext("2d");
      const outImg = ctx.createImageData(250, 167);
      const dst = new Uint32Array(outImg.data.buffer);
      callback(dst);
      ctx.putImageData(outImg, 0, 0);
    },
    [resultRef, histogramRef]
  );

  const processImage = useCallback(
    (inImg) => {
      const src = new Uint32Array(inImg.data.buffer);

      processCanvas("canvasResult", (dst) => {
        let avgGray = 0;
        for (let i = 0; i < dst.length; i++) {
          let r = src[i] & 0xff;
          let g = (src[i] >> 8) & 0xff;
          let b = (src[i] >> 16) & 0xff;
          avgGray += r * 0.2126 + g * 0.7152 + b * 0.0722;
        }
        avgGray /= dst.length;

        for (let i = 0; i < dst.length; i++) {
          let r = src[i] & 0xff;
          let g = (src[i] >> 8) & 0xff;
          let b = (src[i] >> 16) & 0xff;
          let a = (src[i] >> 24) & 0xff;

          // Contrast
          r += (r - avgGray) * contrast;
          g += (g - avgGray) * contrast;
          b += (b - avgGray) * contrast;
          // Brightness
          r += brightness;
          g += brightness;
          b += brightness;

          if (r > 255) r = 255;
          else if (r < 0) r = 0;
          if (g > 255) g = 255;
          else if (g < 0) g = 0;
          if (b > 255) b = 255;
          else if (b < 0) b = 0;

          if (red) r = 255 - r;
          if (green) g = 255 - g;
          if (blue) b = 255 - b;
          if (alpha) a = 255 - a;

          dst[i] = (src[i] & 0xff000000) | (a << 24) | (b << 16) | (g << 8) | r;
        }

        // Histogram
        let histBrightness = new Array(256).fill(0);
        for (let i = 0; i < dst.length; i++) {
          let r = dst[i] & 0xff;
          let g = (dst[i] >> 8) & 0xff;
          let b = (dst[i] >> 16) & 0xff;
          let a = (dst[i] >> 24) & 0xff;
          histBrightness[r]++;
          histBrightness[g]++;
          histBrightness[b]++;
          histBrightness[a]++;
        }

        let maxBrightness = 0;
        for (let i = 1; i < 256; i++) {
          if (maxBrightness < histBrightness[i]) {
            maxBrightness = histBrightness[i];
          }
        }

        const canvas = histogramRef?.current;
        const ctx = canvas.getContext("2d");
        let dx = canvas.width / 256;
        let dy = canvas.height / maxBrightness;
        ctx.lineWidth = dx;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 256; i++) {
          let x = i * dx;
          ctx.strokeStyle = "#000000";
          ctx.beginPath();
          ctx.moveTo(x, canvas.height);
          ctx.lineTo(x, canvas.height - histBrightness[i] * dy);
          ctx.closePath();
          ctx.stroke();
        }
      });
    },
    [processCanvas, brightness, contrast, red, green, blue, alpha]
  );

  const getImageData = useCallback(() => {
    const canvas = resultRef?.current;
    const context = canvas.getContext("2d");
    const img = imgRef?.current;

    context.drawImage(img, 0, 0);
    return context.getImageData(0, 0, 250, 167);
  }, [resultRef]);

  useEffect(() => {
    getImageData();
    processImage(getImageData());
  }, [resultRef, getImageData, processImage, imgRef]);

  return (
    <>
      <Box className={style.result_container}>
        <Box className={style.result_item}>
          <img
            ref={imgRef}
            src="/static/image.jpeg"
            alt=""
            width={250}
            height={167}
          />
          <Typography>Оригинал</Typography>
        </Box>
        <Box className={style.result_item}>
          <canvas
            ref={histogramRef}
            id="canvasHistogram"
            width="250"
            height="167"
          ></canvas>
          <Typography>Гистограмма</Typography>
        </Box>
        <Box className={style.result_item}>
          <canvas
            ref={resultRef}
            id="canvasResult"
            width="250"
            height="167"
          ></canvas>
          <Typography>Конвертированный вариант</Typography>
        </Box>
      </Box>
      <Box className={style.selectors}>
        <Box sx={{ width: 250 }}>
          <Typography id="input-slider" gutterBottom>
            Яркость
          </Typography>
          <Slider
            defaultValue={0}
            valueLabelDisplay="auto"
            marks
            min={-255}
            max={255}
            onChange={onSliderChange}
            name="brightness"
          />
          <Typography id="input-slider" gutterBottom>
            Контраст
          </Typography>
          <Slider
            defaultValue={0}
            valueLabelDisplay="auto"
            marks
            min={-255}
            max={255}
            onChange={onSliderChange}
            name="contrast"
          />
        </Box>
        <Box>
          <FormControlLabel
            value="top"
            control={<Checkbox name="red" onChange={onSliderChange} />}
            label="Red"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="top"
            control={<Checkbox name="green" onChange={onSliderChange} />}
            label="Green"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="top"
            control={<Checkbox name="blue" onChange={onSliderChange} />}
            label="Blue"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="top"
            control={<Checkbox name="alpha" onChange={onSliderChange} />}
            label="Alpha"
            labelPlacement="bottom"
          />
        </Box>
      </Box>
    </>
  );
}`;
