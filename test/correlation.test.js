import { test } from "node:test";
import assert from "node:assert/strict";
import { correlation } from "../src/correlation.js";

test("correlation is 1 for a perfect positive relationship", () => {
  assert.equal(correlation([1, 2, 3], [2, 4, 6]), 1);
});

test("correlation is -1 for a perfect negative relationship", () => {
  assert.equal(correlation([1, 2, 3], [6, 4, 2]), -1);
});

test("correlation throws a RangeError for different lengths", () => {
  assert.throws(() => correlation([1, 2], [1, 2, 3]), RangeError);
});

test("correlation throws a RangeError for fewer than two values", () => {
  assert.throws(() => correlation([1], [2]), RangeError);
});
