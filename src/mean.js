export const mean = (values) => {
  if (values.length === 0) {
    throw new RangeError("mean requires at least one value");
  }
  return values.reduce((total, value) => total + value, 0) / values.length;
};
