#!/usr/bin/env node
import { formatTotal } from "../src/total.js";

const printUsage = () => {
  console.error("Usage: bin/total.js <amount-in-cents> [--currency <code>] [--locale <tag>]");
  console.error('Prints the amount in cents as a decimal total, such as "150" as "1.50".');
  console.error('With --currency, the amount is in that currency, such as --currency EUR --locale de-DE as "1,50 €".');
};

const args = process.argv.slice(2);
let amount;
let currency;
let locale;
let usageError;

for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];
  if (argument === "--currency" || argument === "--locale") {
    const value = args[index + 1];
    if (value === undefined || value.trim() === "" || value.startsWith("--")) {
      usageError = `The ${argument} option needs a value.`;
      break;
    }
    if (argument === "--currency") {
      currency = value;
    } else {
      locale = value;
    }
    index += 1;
  } else if (argument.startsWith("--")) {
    usageError = `Unknown option: ${argument}`;
    break;
  } else if (amount === undefined) {
    amount = argument;
  }
}

const cents = Number(amount);

if (
  usageError !== undefined ||
  amount === undefined ||
  amount.trim() === "" ||
  !Number.isInteger(cents)
) {
  if (usageError !== undefined) {
    console.error(usageError);
  }
  printUsage();
  process.exitCode = 1;
} else {
  try {
    console.log(formatTotal(cents, { currency, locale }));
  } catch (error) {
    const options = [
      currency === undefined ? undefined : `--currency "${currency}"`,
      locale === undefined ? undefined : `--locale "${locale}"`,
    ]
      .filter((option) => option !== undefined)
      .join(" and ");
    console.error(`Cannot use ${options}: ${error.message}`);
    printUsage();
    process.exitCode = 1;
  }
}
