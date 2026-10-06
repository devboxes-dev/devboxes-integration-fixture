// CSV column statistics built on the RFC 4180 parser.
//
// The first record is treated as the header row. A column is considered
// numeric when it has at least one value and every non-empty value is a finite
// number; empty cells are treated as missing. For each numeric column,
// columnStats returns count, min, max, mean, median and the population
// standard deviation, keyed by column name. Non-numeric and empty columns are
// omitted.
import { parseCsv } from "./csv.js";

const toNumber = (value) => {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const number = Number(trimmed);
  return Number.isFinite(number) ? number : undefined;
};

const summarize = (values) => {
  const count = values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((total, value) => total + value, 0) / count;

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(count / 2);
  const median =
    count % 2 === 1 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;

  // Population variance (divide by N).
  const variance =
    values.reduce((total, value) => total + (value - mean) ** 2, 0) / count;

  return { count, min, max, mean, median, stdDev: Math.sqrt(variance) };
};

export function columnStats(text) {
  const rows = parseCsv(text);
  if (rows.length === 0) return {};

  const header = rows[0];
  const dataRows = rows.slice(1);
  const stats = {};

  for (let column = 0; column < header.length; column += 1) {
    const values = [];
    let numeric = true;

    for (const row of dataRows) {
      const parsed = toNumber(row[column] ?? "");
      if (parsed === null) continue; // missing cell
      if (parsed === undefined) {
        numeric = false;
        break;
      }
      values.push(parsed);
    }

    if (numeric && values.length > 0) {
      stats[header[column]] = summarize(values);
    }
  }

  return stats;
}
