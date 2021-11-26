function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

export function encode(string) {
  var dict = {};
  var data = (string + "").split("");
  var out = [];
  var currChar;
  var phrase = data[0];
  var code = 256;
  const logs = [];
  logs.push([
    data[0] + data[1],
    data[1] ?? "",
    data[0] ?? "",
    code,
    dec2bin(code),
    `${0}: ${data[0] + data[1]}`,
  ]);
  for (var i = 1; i < data.length; i++) {
    currChar = data[i];
    if (dict[phrase + currChar] != null) {
      phrase += currChar;
      logs.push([
        phrase + (data[i] || ""),
        currChar,
        data[i + 1] ?? "",
        "-",
        "-",
        "-",
      ]);
    } else {
      out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
      dict[phrase + currChar] = code;
      code++;
      phrase = currChar;
      logs.push([
        phrase + (data[i + 1] || ""),
        currChar,
        data[i + 1] ?? "",
        code,
        dec2bin(code),
        `${i}: ${phrase + (data[i + 1] || "")}`,
      ]);
    }
  }
  out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
  for (var i = 0; i < out.length; i++) {
    out[i] = String.fromCharCode(out[i]);
  }
  return [out.join(""), logs];
}

export function decode(string) {
  var dict = {};
  var data = (string + "").split("");
  var currChar = data[0];
  var oldPhrase = currChar;
  var out = [currChar];
  var code = 256;
  var phrase;

  for (var i = 0; i < data.length; i++) {
    var currCode = data[i].charCodeAt(0);
    if (currCode < 256) {
      phrase = data[i];
    } else {
      phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
    }
    out.push(phrase);
    currChar = phrase.charAt(0);
    dict[code] = oldPhrase + currChar;
    code++;
    oldPhrase = phrase;
  }
  return out.join("");
}

export const functions = [
  {
    title: "Encode",
    func: `function encode(string) {
      var dict = {};
      var data = (string + "").split("");
      var out = [];
      var currChar;
      var phrase = data[0];
      var code = 256;
      const logs = [];
      logs.push([
        data[0] + data[1],
        data[1] ?? "",
        data[0] ?? "",
        code,
        dec2bin(code),
        '0: data[0] + data[1]',
      ]);
      for (var i = 1; i < data.length; i++) {
        currChar = data[i];
        if (dict[phrase + currChar] != null) {
          phrase += currChar;
          logs.push([
            phrase + (data[i] || ""),
            currChar,
            data[i + 1] ?? "",
            "-",
            "-",
            "-",
          ]);
        } else {
          out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
          dict[phrase + currChar] = code;
          code++;
          phrase = currChar;
          logs.push([
            phrase + (data[i + 1] || ""),
            currChar,
            data[i + 1] ?? "",
            code,
            dec2bin(code),
            '[i]: phrase + (data[i + 1] || "")',
          ]);
        }
      }
      out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
      for (var i = 0; i < out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
      }
      return [out.join(""), logs];
    }`,
  },
  {
    title: "Decode",
    func: `function decode(string) {
      var dict = {};
      var data = (string + "").split("");
      var currChar = data[0];
      var oldPhrase = currChar;
      var out = [currChar];
      var code = 256;
      var phrase;
      for (var i = 0; i < data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
          phrase = data[i];
        } else {
          phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
      }
      return out.join("");
    }`,
  },
];
