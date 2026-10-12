export const mode = (values) => {
  const counts = new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  let highest = 0;
  for (const count of counts.values()) {
    if (count > highest) {
      highest = count;
    }
  }
  return [...counts.entries()]
    .filter(([, count]) => count === highest)
    .map(([value]) => value)
    .sort((a, b) => a - b);
};
