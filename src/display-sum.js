import { sum } from "./sum.js";

/** Tells whether text holds a finite number the page can add. */
const isNumber = (text) => text !== "" && Number.isFinite(Number(text));

/** Formats a number for display, hiding floating-point noise such as 0.30000000000000004. */
export const formatSum = (value) => String(Number(value.toPrecision(15)));

/** Adds two numeric inputs as display text, or returns an empty string while either is blank or not a number. */
export const sumText = (first, second) => {
  const left = String(first).trim();
  const right = String(second).trim();
  if (!isNumber(left) || !isNumber(right)) {
    return "";
  }
  return formatSum(sum(left, right));
};
