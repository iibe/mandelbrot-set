import mandelbrot from "./mandelbrot.js";

// NOTE: total number of RGB colors
const RGB = 16777216;

// NOTE: randomly generated colors
const colors = {
  black: "#000",
  hex: Array.from({ length: 16 }, () => {
    return `#${Math.floor(RGB * Math.random()).toString(16)}`;
  }),
};

// NOTE: mandelbrot set borders
const RE_SET = { start: -2, end: 1 }; // the real part
const IM_SET = { start: -1, end: 1 }; // the imaginary part

const canvas = document.querySelector("#plot");
const ctx = canvas.getContext("2d");

// NOTE: always keep 3/2 aspect-ratio of container
let PLOT_W = canvas.clientWidth;
let PLOT_H = Math.round(canvas.clientWidth * 0.666);
ctx.canvas.width = PLOT_W;
ctx.canvas.height = PLOT_H;
draw();

export function draw() {
  for (let i = 0; i < PLOT_W; i++) {
    for (let j = 0; j < PLOT_H; j++) {
      const complex = {
        x: RE_SET.start + (i / PLOT_W) * (RE_SET.end - RE_SET.start),
        y: IM_SET.start + (j / PLOT_H) * (IM_SET.end - IM_SET.start),
      };

      const [numberOfIterations, isMandelbrotSet] = mandelbrot(complex);

      ctx.fillStyle = isMandelbrotSet
        ? colors.black
        : colors.hex[numberOfIterations % colors.hex.length];

      ctx.fillRect(i, j, 1, 1);
    }
  }
}

var doit;
window.addEventListener("resize", () => {
  clearTimeout(doit);
  doit = setTimeout(function () {
    // do not redraw the canvas if we reduce the window
    if (canvas.clientWidth <= PLOT_W) {
      return;
    }

    // set new values and redraw canvas if we increase the window
    PLOT_W = canvas.clientWidth;
    PLOT_H = Math.round(canvas.clientWidth * 0.666);
    ctx.canvas.width = PLOT_W;
    ctx.canvas.height = PLOT_H;
    draw();
  }, 100);
});
