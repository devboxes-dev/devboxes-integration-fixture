import { mean } from "./mean.js";

export const variance = (values, { sample = false } = {}) => {
  if (values.length === 0) {
    throw new RangeError("variance requires at least one value");
  }
  if (sample && values.length < 2) {
    throw new RangeError("sample variance requires at least two values");
  }
  const average = mean(values);
  const sumOfSquares = values.reduce(
    (acc, value) => acc + (value - average) ** 2,
    0,
  );
  return sumOfSquares / (sample ? values.length - 1 : values.length);
};
