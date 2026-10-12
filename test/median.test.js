import { test } from "node:test";
import assert from "node:assert/strict";
import { median } from "../src/median.js";

test("median returns the middle value for an odd length", () => {
  assert.equal(median([3, 1, 2]), 2);
});

test("median averages the two middle values for an even length", () => {
  assert.equal(median([4, 1, 3, 2]), 2.5);
});

test("median does not mutate the input array", () => {
  const values = [3, 1, 2];
  median(values);
  assert.deepEqual(values, [3, 1, 2]);
});

test("median throws a RangeError for an empty array", () => {
  assert.throws(() => median([]), RangeError);
});
