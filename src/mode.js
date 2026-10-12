export const mode = (values) => {
  if (values.length === 0) {
    throw new RangeError("mode requires at least one value");
  }
  const counts = new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  const maxCount = Math.max(...counts.values());
  const modes = [];
  for (const [value, count] of counts) {
    if (count === maxCount) {
      modes.push(value);
    }
  }
  return modes.sort((a, b) => a - b);
};
