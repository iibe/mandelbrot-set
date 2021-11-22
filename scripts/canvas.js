import mandelbrot from "./mandelbrot.js";

// NOTE: width/height of aspect-ratio container in pixels
const AR = document.querySelector(".aspect-ratio");
const IW = AR.clientWidth;
const IH = AR.clientHeight;

// NOTE: total number of RGB colors
const RGB = 16777216;

// NOTE: randomly generated colors
const colors = {
  black: "#000",
  hex: Array.from({ length: 16 }, () => {
    return `#${Math.floor(RGB * Math.random()).toString(16)}`;
  }),
};

const canvas = document.querySelector("#plot");
const ctx = canvas.getContext("2d");

ctx.canvas.width = IW;
ctx.canvas.height = IH;

const RE_SET = { start: -2, end: 1 }; // the real part
const IM_SET = { start: -1, end: 1 }; // the imaginary part

export default function draw() {
  for (let i = 0; i < IW; i++) {
    for (let j = 0; j < IH; j++) {
      const complex = {
        x: RE_SET.start + (i / IW) * (RE_SET.end - RE_SET.start),
        y: IM_SET.start + (j / IH) * (IM_SET.end - IM_SET.start),
      };

      const [numberOfIterations, isMandelbrotSet] = mandelbrot(complex);

      ctx.fillStyle = isMandelbrotSet
        ? colors.black
        : colors.hex[numberOfIterations % colors.hex.length];

      ctx.fillRect(i, j, 1, 1);
    }
  }
}

draw();
