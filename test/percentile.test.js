import { test } from "node:test";
import assert from "node:assert/strict";
import { percentile } from "../src/percentile.js";

test("percentile returns an exact value at a known point", () => {
  assert.equal(percentile([1, 2, 3, 4], 50), 2.5);
});

test("percentile interpolates linearly between values", () => {
  assert.equal(percentile([1, 2, 3, 4], 25), 1.75);
});

test("percentile returns the minimum and maximum at the bounds", () => {
  assert.equal(percentile([5, 1, 3], 0), 1);
  assert.equal(percentile([5, 1, 3], 100), 5);
});

test("percentile throws a RangeError when p is out of range", () => {
  assert.throws(() => percentile([1, 2, 3], -1), RangeError);
  assert.throws(() => percentile([1, 2, 3], 101), RangeError);
});
