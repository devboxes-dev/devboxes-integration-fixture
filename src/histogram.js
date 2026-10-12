export const histogram = (values, binCount) => {
  if (values.length === 0) {
    throw new RangeError("histogram requires at least one value");
  }
  if (!Number.isInteger(binCount) || binCount < 1) {
    throw new RangeError("histogram requires a positive integer bin count");
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const width = (max - min) / binCount;
  const bins = Array.from({ length: binCount }, (_, index) => ({
    start: min + index * width,
    end: index === binCount - 1 ? max : min + (index + 1) * width,
    count: 0,
  }));
  for (const value of values) {
    const index = width === 0 ? 0 : Math.min(Math.floor((value - min) / width), binCount - 1);
    bins[index].count += 1;
  }
  return bins;
};
