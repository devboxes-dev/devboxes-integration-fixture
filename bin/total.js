#!/usr/bin/env node
import { formatTotal, totalWithTax } from "../src/total.js";

/** Reads a whole number from text, or undefined when the text is not one. */
const wholeNumber = (text) => {
  if (text === undefined || text.trim() === "") {
    return undefined;
  }
  const value = Number(text);
  return Number.isInteger(value) ? value : undefined;
};

/** Reads the optional tax rate from the arguments after the amount, or undefined when they are malformed. */
const parseTax = (args) => {
  if (args.length === 0) {
    return 0;
  }
  if (args.length !== 2 || args[0] !== "--tax") {
    return undefined;
  }
  const percent = wholeNumber(args[1]);
  return percent === undefined || percent < 0 ? undefined : percent;
};

const [argument, ...rest] = process.argv.slice(2);
const cents = wholeNumber(argument);
const percent = cents === undefined ? undefined : parseTax(rest);

if (cents === undefined || percent === undefined) {
  console.error("Usage: bin/total.js <amount-in-cents> [--tax <percent>]");
  console.error('Prints the amount in cents as a decimal total, such as "150" as "1.50".');
  console.error('Adds an optional whole-percent tax rate, such as "--tax 19" for 19%, rounded to the cent.');
  process.exitCode = 1;
} else {
  console.log(formatTotal(totalWithTax(cents, percent)));
}
