/** Formats an amount in cents as a decimal string, such as -150 as "-1.50". */
export const formatTotal = (cents) => {
  const sign = cents < 0 ? "-" : "";
  const absolute = Math.abs(cents);
  return `${sign}${Math.floor(absolute / 100)}.${String(absolute % 100).padStart(2, "0")}`;
};
