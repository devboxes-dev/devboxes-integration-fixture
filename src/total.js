/** Formats an amount in cents as a decimal string, such as 123456789 as "1,234,567.89". */
export const formatTotal = (cents) => {
  const sign = cents < 0 ? "-" : "";
  const absolute = Math.abs(cents);
  const whole = String(Math.floor(absolute / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${sign}${whole}.${String(absolute % 100).padStart(2, "0")}`;
};
