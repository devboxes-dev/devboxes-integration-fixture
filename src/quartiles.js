import { percentile } from "./percentile.js";

export const quartiles = (values) => {
  const q1 = percentile(values, 25);
  const q2 = percentile(values, 50);
  const q3 = percentile(values, 75);
  return { q1, q2, q3, iqr: q3 - q1 };
};
