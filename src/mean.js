export const mean = (values) => {
  if (values.length === 0) {
    throw new RangeError("mean requires at least one value");
  }
  return values.reduce((acc, value) => acc + value, 0) / values.length;
};
