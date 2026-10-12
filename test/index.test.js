import { test } from "node:test";
import assert from "node:assert/strict";
import * as stats from "../src/index.js";

const exportedFunctions = [
  "sum",
  "mean",
  "median",
  "mode",
  "variance",
  "stddev",
  "percentile",
  "quartiles",
  "zscores",
  "correlation",
  "histogram",
];

test("index re-exports every statistics function", () => {
  for (const name of exportedFunctions) {
    assert.equal(typeof stats[name], "function", `expected ${name} to be a function`);
  }
});
