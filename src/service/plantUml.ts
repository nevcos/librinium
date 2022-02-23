import { deflate } from "pako";

const PLANT_UML_PNG_URL = "//www.plantuml.com/plantuml/png/";

export function buildPlantUmlUrl(code = "") {
  code = code.trim();
  code = unescape(encodeURIComponent(code));
  code = deflate(code, { level: 9 });
  code = binaryToString(code);
  return PLANT_UML_PNG_URL + "~1" + encode64(code);
}

function binaryToString(binary) {
  const str = new Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    str[i] = String.fromCharCode(binary[i]);
  }
  return str.join("");
}

function encode64(data) {
  let r = "";
  for (let i = 0; i < data.length; i += 3) {
    if (i + 2 === data.length) {
      r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), 0);
    } else if (i + 1 === data.length) {
      r += append3bytes(data.charCodeAt(i), 0, 0);
    } else {
      r += append3bytes(
        data.charCodeAt(i),
        data.charCodeAt(i + 1),
        data.charCodeAt(i + 2)
      );
    }
  }
  return r;
}

function append3bytes(b1, b2, b3) {
  const c1 = b1 >> 2;
  const c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
  const c3 = ((b2 & 0xf) << 2) | (b3 >> 6);
  const c4 = b3 & 0x3f;
  let r = "";
  r += encode6bit(c1 & 0x3f);
  r += encode6bit(c2 & 0x3f);
  r += encode6bit(c3 & 0x3f);
  r += encode6bit(c4 & 0x3f);
  return r;
}

function encode6bit(b) {
  if (b < 10) {
    return String.fromCharCode(48 + b);
  }
  b -= 10;
  if (b < 26) {
    return String.fromCharCode(65 + b);
  }
  b -= 26;
  if (b < 26) {
    return String.fromCharCode(97 + b);
  }
  b -= 26;
  if (b === 0) {
    return "-";
  }
  if (b === 1) {
    return "_";
  }
  return "?";
}
