import { mean } from "./mean.js";
import { stddev } from "./stddev.js";

export const zscores = (values) => {
  const average = mean(values);
  const deviation = stddev(values);
  if (deviation === 0) {
    throw new RangeError("zscores requires a non-zero standard deviation");
  }
  return values.map((value) => (value - average) / deviation);
};
