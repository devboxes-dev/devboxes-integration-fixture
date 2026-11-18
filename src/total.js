/** The largest total that still fits exactly in a JavaScript number. */
const maxSafe = BigInt(Number.MAX_SAFE_INTEGER);

/**
 * Adds a whole-percent tax rate to an amount in whole cents, rounding half a cent away from zero.
 * Returns a number while the total stays exact, or a BigInt beyond that so large totals lose no cent.
 */
export const totalWithTax = (cents, percent) => {
  const scaled = BigInt(cents) * BigInt(100 + percent);
  const sign = scaled < 0n ? -1n : 1n;
  const rounded = (scaled * sign + 50n) / 100n;
  return rounded <= maxSafe ? Number(sign * rounded) : sign * rounded;
};

/** Formats an amount in cents, as a number or a BigInt, such as 123456789 as "1,234,567.89". */
export const formatTotal = (cents) => {
  const sign = cents < 0 ? "-" : "";
  const absolute = cents < 0 ? -cents : cents;
  const whole = typeof absolute === "bigint" ? String(absolute / 100n) : String(Math.floor(absolute / 100));
  const fraction = typeof absolute === "bigint" ? String(absolute % 100n) : String(absolute % 100);
  return `${sign}${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${fraction.padStart(2, "0")}`;
};
