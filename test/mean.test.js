import { test } from "node:test";
import assert from "node:assert/strict";
import { mean } from "../src/mean.js";

test("mean averages a list of numbers", () => {
  assert.equal(mean([1, 2, 3, 4]), 2.5);
});

test("mean of a single value is that value", () => {
  assert.equal(mean([42]), 42);
});

test("mean throws a RangeError for an empty array", () => {
  assert.throws(() => mean([]), RangeError);
});
