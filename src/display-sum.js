import { sum } from "./sum.js";

/** Tells whether text holds a finite number the page can add. */
const isNumber = (text) => text !== "" && Number.isFinite(Number(text));

/** Formats a finite sum for display, hiding tiny floating-point noise without dropping real digits. */
export const formatSum = (value) => {
  if (!Number.isFinite(value)) {
    return "";
  }
  if (Math.abs(value) >= 1e21) {
    return BigInt(value).toString();
  }
  if (Number.isInteger(value)) {
    return String(value);
  }
  const rounded = Number(value.toFixed(12));
  const isNoise = Math.abs(rounded - value) <= Math.abs(value) * Number.EPSILON * 4;
  return String(isNoise ? rounded : value);
};

/** Adds two numeric inputs as display text, or returns "" while an input is invalid or the sum is too large. */
export const sumText = (first, second) => {
  const left = String(first).trim();
  const right = String(second).trim();
  if (!isNumber(left) || !isNumber(right)) {
    return "";
  }
  const total = sum(left, right);
  if (!Number.isFinite(total)) {
    return "";
  }
  return formatSum(total);
};
