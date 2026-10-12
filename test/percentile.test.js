import { test } from "node:test";
import assert from "node:assert/strict";
import { percentile } from "../src/percentile.js";

test("percentile interpolates linearly between values", () => {
  assert.equal(percentile([1, 2, 3, 4], 50), 2.5);
});

test("percentile returns the endpoints at the boundaries", () => {
  assert.equal(percentile([15, 20, 35, 40, 50], 0), 15);
  assert.equal(percentile([15, 20, 35, 40, 50], 100), 50);
});

test("percentile throws a RangeError for p outside 0..100", () => {
  assert.throws(() => percentile([1, 2, 3], -1), RangeError);
  assert.throws(() => percentile([1, 2, 3], 101), RangeError);
});
