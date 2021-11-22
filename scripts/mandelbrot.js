// NOTE: number of iterations for mandelbrot() fuction
const DEPTH = 50;

/**
 * A complex number.
 * @typedef {Object} ComplexNumber
 * @property {number} x real part of complex number.
 * @property {number} y imaginary part of complex number.
 */

/**
 * Mandlebrot set equation. [Read more](https://en.wikipedia.org/wiki/Mandelbrot_set).
 * @param {ComplexNumber} c complex number.
 * @return {[number, boolean]} tuple, with the iteration number that it took to reach a modulus greater than 2, and whether the complex number passed to it, belongs to Mandelbrot set.
 */
export default function mandelbrot(c) {
  // `z` is a complex number, where x = Re(z) and y = Im(z)
  let z = { x: 0, y: 0 };

  let n = 0;
  let s, m;

  do {
    // compute a square of `z`
    s = {
      x: z.x * z.x - z.y * z.y,
      y: 2 * z.x * z.y,
    };

    // assign `z` to the sum of the square of` z` with `c`
    z = {
      x: s.x + c.x,
      y: s.y + c.y,
    };

    // get a modulus of `z`
    m = Math.sqrt(z.x * z.x + z.y * z.y);

    n += 1;
  } while (m <= 2 && n < DEPTH);

  return [n, m <= 2];
}
