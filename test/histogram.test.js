import { test } from "node:test";
import assert from "node:assert/strict";
import { histogram } from "../src/histogram.js";

test("histogram creates equal-width bins and counts values into them", () => {
  assert.deepEqual(histogram([0, 1, 2, 3, 4], 2), [
    { start: 0, end: 2, count: 2 },
    { start: 2, end: 4, count: 3 },
  ]);
});

test("histogram counts a value equal to the maximum in the last bin", () => {
  const bins = histogram([1, 2, 3, 4], 4);
  assert.equal(bins[3].count, 1);
  assert.equal(bins[3].end, 4);
});

test("histogram handles a constant array with a single bin", () => {
  assert.deepEqual(histogram([5, 5, 5], 1), [{ start: 5, end: 5, count: 3 }]);
});
