import { mean } from "./mean.js";

export const variance = (values, { sample = false } = {}) => {
  const average = mean(values);
  const total = values.reduce(
    (sum, value) => sum + (value - average) ** 2,
    0,
  );
  return total / (sample ? values.length - 1 : values.length);
};
