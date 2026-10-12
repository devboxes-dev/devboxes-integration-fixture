export const percentile = (values, p) => {
  if (values.length === 0) {
    throw new RangeError("percentile requires at least one value");
  }
  if (p < 0 || p > 100) {
    throw new RangeError("percentile requires p between 0 and 100");
  }
  const sorted = [...values].sort((a, b) => a - b);
  const rank = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);
  if (lower === upper) {
    return sorted[lower];
  }
  const fraction = rank - lower;
  return sorted[lower] + fraction * (sorted[upper] - sorted[lower]);
};
