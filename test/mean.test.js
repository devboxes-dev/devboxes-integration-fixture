import { test } from "node:test";
import assert from "node:assert/strict";
import { mean } from "../src/mean.js";

test("mean averages a single value", () => {
  assert.equal(mean([4]), 4);
});

test("mean averages multiple values", () => {
  assert.equal(mean([1, 2, 3, 4]), 2.5);
});

test("mean throws a RangeError for an empty array", () => {
  assert.throws(() => mean([]), RangeError);
});
