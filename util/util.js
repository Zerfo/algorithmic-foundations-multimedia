export function matrix(params, mats) {
  return mats.map((mat) =>
    mat.reduce(
      (acc, value, index) =>
        acc +
        (params[index] * precision * (value * precision)) /
          precision /
          precision,
      0
    )
  );
}

export const pow = Math.pow;

export const precision = 100000000;
