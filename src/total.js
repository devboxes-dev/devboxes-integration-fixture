/** Formats an amount in cents as a decimal string, such as 150 as "1.50". */
export const formatTotal = (cents) =>
  `${Math.floor(cents / 100)}.${String(Math.abs(cents % 100)).padStart(2, "0")}`;
