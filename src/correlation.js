import { mean } from "./mean.js";
import { stddev } from "./stddev.js";

export const correlation = (xs, ys) => {
  if (xs.length !== ys.length) {
    throw new RangeError("correlation requires arrays of equal length");
  }
  if (xs.length < 2) {
    throw new RangeError("correlation requires at least two values");
  }
  const meanX = mean(xs);
  const meanY = mean(ys);
  const covariance =
    xs.reduce((acc, x, i) => acc + (x - meanX) * (ys[i] - meanY), 0) / xs.length;
  return covariance / (stddev(xs) * stddev(ys));
};
