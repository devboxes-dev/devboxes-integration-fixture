import { test } from "node:test";
import assert from "node:assert/strict";
import * as stats from "../src/index.js";

test("index re-exports every public function", () => {
  for (const name of [
    "sum",
    "mean",
    "median",
    "mode",
    "variance",
    "stddev",
    "percentile",
  ]) {
    assert.equal(typeof stats[name], "function", `${name} should be exported`);
  }
});

test("exports from index behave correctly", () => {
  assert.equal(stats.sum(1, 2), 3);
  assert.equal(stats.mean([1, 2, 3]), 2);
  assert.equal(stats.median([1, 3, 2]), 2);
  assert.deepEqual(stats.mode([1, 1, 2]), [1]);
  assert.equal(stats.variance([1, 1, 1]), 0);
  assert.equal(stats.stddev([1, 1, 1]), 0);
  assert.equal(stats.percentile([1, 2, 3], 100), 3);
});
