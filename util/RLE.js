export function encode(data) {
  let encoding = [];
  let previous = data[0];
  let count = 1;

  for (let i = 1; i < data.length; i++) {
    if (data[i] !== previous) {
      encoding.push(count, previous);
      count = 1;
      previous = data[i];
    } else {
      count++;
    }
  }

  encoding.push(count, previous);

  return encoding;
}

export function decode(data) {
  let uncompressed = [];

  data.map((element, ind) => {
    if (ind % 2 === 0) {
      if (!Array.prototype.fill) {
        function fillPolyfill(value, len) {
          for (let i = 0; i < len; i++) {
            uncompressed.push(value);
          }
        }

        fillPolyfill(data[ind + 1], element);
      } else {
        uncompressed.push(...Array(element).fill(data[ind + 1]));
      }
    }
  });

  return uncompressed;
}

export const functions = [
  {
    title: "Encode",
    func: `function encode(data) {
      let encoding = [];
      let previous = data[0];
      let count = 1;
      for (let i = 1; i < data.length; i++) {
        if (data[i] !== previous) {
          encoding.push(count, previous);
          count = 1;
          previous = data[i];
        } else {
          count++;
        }
      }
      encoding.push(count, previous);
      return encoding;
    }`,
  },
  {
    title: "Decode",
    func: `function decode(data) {
      let uncompressed = [];
      data.map((element, ind) => {
        if (ind % 2 === 0) {
          if (!Array.prototype.fill) {
            function fillPolyfill(value, len) {
              for (let i = 0; i < len; i++) {
                uncompressed.push(value);
              }
            }
            fillPolyfill(data[ind + 1], element);
          } else {
            uncompressed.push(...Array(element).fill(data[ind + 1]));
          }
        }
      });
      return uncompressed;
    }`,
  },
];
