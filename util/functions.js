import { matrix, pow } from "./util";

export function hex2rgb(hex) {
  let x = [];
  hex = hex.replace("#", "");
  if (hex.length != 6) {
    hex = modifyHex(hex);
  }
  x.push(parseInt(hex.slice(0, 2), 16));
  x.push(parseInt(hex.slice(2, 4), 16));
  x.push(parseInt(hex.slice(4, 6), 16));
  return x.toString();
}

export function rgb2hex(rgb) {
  let y = rgb.match(/\d+/g).map(function (x) {
    return parseInt(x).toString(16).padStart(2, "0");
  });
  return y.join("").toUpperCase();
}

export function hex2cmyk(hex) {
  let computedC = 0;
  let computedM = 0;
  let computedY = 0;
  let computedK = 0;

  hex = hex.charAt(0) == "#" ? hex.substring(1, 7) : hex;

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  if (r == 0 && g == 0 && b == 0) {
    computedK = 1;
    return [0, 0, 0, 1];
  }

  computedC = 1 - r / 255;
  computedM = 1 - g / 255;
  computedY = 1 - b / 255;

  let minCMY = Math.min(computedC, Math.min(computedM, computedY));

  computedC = (computedC - minCMY) / (1 - minCMY);
  computedM = (computedM - minCMY) / (1 - minCMY);
  computedY = (computedY - minCMY) / (1 - minCMY);
  computedK = minCMY;

  return `${computedC.toFixed(2)}, ${computedM.toFixed(2)}, ${computedY.toFixed(
    2
  )}, ${computedK.toFixed(2)}`;
}

export function rgb2xyz(rgb) {
  const [lrgbR, lrgbB, lrgbG] = rgb
    .split(",")
    .map((v) => (+v > 4.045 ? pow((+v + 5.5) / 105.5, 2.4) * 100 : +v / 12.92));

  const [xyzX, xyzY, xyzZ] = matrix(
    [lrgbR, lrgbB, lrgbG],
    [
      [0.4124564, 0.3575761, 0.1804375],
      [0.2126729, 0.7151522, 0.072175],
      [0.0193339, 0.119192, 0.9503041],
    ]
  );

  return `${xyzX.toFixed(2)}, ${xyzY.toFixed(2)}, ${xyzZ.toFixed(2)}`;
}

export function rgb2hsb(rgb) {
  let [r, g, b] = rgb.split(",");
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n === 0
      ? 0
      : n && v === r
      ? (g - b) / n
      : v === g
      ? 2 + (b - r) / n
      : 4 + (r - g) / n;
  return `${(60 * (h < 0 ? h + 6 : h)).toFixed(2)}, ${(
    v && (n / v) * 100
  ).toFixed(2)}, ${(v * 100).toFixed(2)}`;
}

export function rgb2hsl(rgb) {
  let [r, g, b] = rgb.split(",");
  (r /= 255), (g /= 255), (b /= 255);

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return `${h.toFixed(2)}, ${s.toFixed(2)}, ${l.toFixed(2)}`;
}

export function rgb2lab(rgb) {
  let [r, g, b] = rgb.split(",").map((i) => +i);
  r = r / 255;
  g = g / 255;
  b = b / 255;
  let x;
  let y;
  let z;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

  return `${(116 * y - 16).toFixed(2)}, ${(500 * (x - y)).toFixed(2)}, ${(
    200 *
    (y - z)
  ).toFixed(2)}`;
}

export function rgb2yuv(rgb) {
  let [r, g, b] = rgb.split(",").map((i) => +i);
  let y, u, v;

  y = r * 0.299 + g * 0.587 + b * 0.114;
  u = r * -0.168736 + g * -0.331264 + b * 0.5 + 128;
  v = r * 0.5 + g * -0.418688 + b * -0.081312 + 128;

  y = Math.floor(y);
  u = Math.floor(u);
  v = Math.floor(v);

  return `${y}, ${u}, ${v}`;
}

export const functions = [
  {
    title: "HEX => RGB",
    func: `function hex2rgb(hex) {
      let x = [];
      hex = hex.replace("#", "");
      if (hex.length != 6) {
        hex = modifyHex(hex);
      }
      x.push(parseInt(hex.slice(0, 2), 16));
      x.push(parseInt(hex.slice(2, 4), 16));
      x.push(parseInt(hex.slice(4, 6), 16));
      return x.toString();
    }`,
  },
  {
    title: "RGB => HEX",
    func: `function rgb2hex(rgb) {
      let y = rgb.match(/\d+/g).map(function (x) {
        return parseInt(x).toString(16).padStart(2, "0");
      });
      return y.join("").toUpperCase();
    }`,
  },
  {
    title: "HEX => CMYK",
    func: `function hex2cmyk(hex) {
      let computedC = 0;
      let computedM = 0;
      let computedY = 0;
      let computedK = 0;

      hex = hex.charAt(0) == "#" ? hex.substring(1, 7) : hex;

      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);

      if (r == 0 && g == 0 && b == 0) {
        computedK = 1;
        return [0, 0, 0, 1];
      }

      computedC = 1 - r / 255;
      computedM = 1 - g / 255;
      computedY = 1 - b / 255;

      let minCMY = Math.min(computedC, Math.min(computedM, computedY));

      computedC = (computedC - minCMY) / (1 - minCMY);
      computedM = (computedM - minCMY) / (1 - minCMY);
      computedY = (computedY - minCMY) / (1 - minCMY);
      computedK = minCMY;

      return 'computedC.toFixed(2), computedM.toFixed(2)}, computedY.toFixed(2), computedK.toFixed(2)';
    }`,
  },
  {
    title: "RGB => XYZ",
    func: `function rgb2xyz(rgb) {
      const [lrgbR, lrgbB, lrgbG] = rgb
        .split(",")
        .map((v) => (+v > 4.045 ? pow((+v + 5.5) / 105.5, 2.4) * 100 : +v / 12.92));

      const [xyzX, xyzY, xyzZ] = matrix(
        [lrgbR, lrgbB, lrgbG],
        [
          [0.4124564, 0.3575761, 0.1804375],
          [0.2126729, 0.7151522, 0.072175],
          [0.0193339, 0.119192, 0.9503041],
        ]
      );

      return 'xyzX.toFixed(2)}, xyzY.toFixed(2), xyzZ.toFixed(2)';
    }`,
  },
  {
    title: "RGB => HSB",
    func: `function rgb2hsb(rgb) {
      let [r, g, b] = rgb.split(",");
      r /= 255;
      g /= 255;
      b /= 255;
      const v = Math.max(r, g, b),
        n = v - Math.min(r, g, b);
      const h =
        n === 0
          ? 0
          : n && v === r
          ? (g - b) / n
          : v === g
          ? 2 + (b - r) / n
          : 4 + (r - g) / n;
      return '(60 * (h < 0 ? h + 6 : h)).toFixed(2), (v && (n / v) * 100).toFixed(2), (v * 100).toFixed(2)';
    }`,
  },
  {
    title: "RGB => HSL",
    func: `function rgb2hsl(rgb) {
      let [r, g, b] = rgb.split(",");
      (r /= 255), (g /= 255), (b /= 255);

      let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      let h,
        s,
        l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }

        h /= 6;
      }

      return 'h.toFixed(2)}, s.toFixed(2), l.toFixed(2)';
    }`,
  },
  {
    title: "RGB => LAB",
    func: `function rgb2lab(rgb) {
      let [r, g, b] = rgb.split(",").map((i) => +i);
      r = r / 255;
      g = g / 255;
      b = b / 255;
      let x;
      let y;
      let z;

      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

      x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
      y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
      z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

      x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

      return '(116 * y - 16).toFixed(2)}, (500 * (x - y)).toFixed(2), (200 *(y - z)).toFixed(2)';
    }`,
  },
  {
    title: "RGB => YUV",
    func: `function rgb2yuv(rgb) {
      let [r, g, b] = rgb.split(",").map((i) => +i);
      let y, u, v;

      y = r * 0.299 + g * 0.587 + b * 0.114;
      u = r * -0.168736 + g * -0.331264 + b * 0.5 + 128;
      v = r * 0.5 + g * -0.418688 + b * -0.081312 + 128;

      y = Math.floor(y);
      u = Math.floor(u);
      v = Math.floor(v);

      return 'y, u, v';
    }`,
  },
];
