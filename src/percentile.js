export const percentile = (values, p) => {
  if (p < 0 || p > 100) {
    throw new RangeError("percentile requires p between 0 and 100");
  }
  const sorted = [...values].sort((a, b) => a - b);
  const rank = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);
  const weight = rank - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
};
