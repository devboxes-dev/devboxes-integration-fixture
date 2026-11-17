#!/usr/bin/env node
import { formatTotal } from "../src/total.js";

const argument = process.argv[2];
const cents = Number(argument);

if (argument === undefined || argument.trim() === "" || !Number.isFinite(cents)) {
  console.error("Usage: bin/total.js <amount-in-cents>");
  console.error('Prints the amount in cents as a decimal total, such as "150" as "1.50".');
  process.exitCode = 1;
} else {
  console.log(formatTotal(cents));
}
