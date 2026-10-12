import { test } from "node:test";
import assert from "node:assert/strict";
import { median } from "../src/median.js";

test("median of an odd-length list is the middle value", () => {
  assert.equal(median([3, 1, 2]), 2);
});

test("median of an even-length list averages the two middle values", () => {
  assert.equal(median([4, 1, 3, 2]), 2.5);
});

test("median does not mutate the input array", () => {
  const values = [3, 1, 2];
  median(values);
  assert.deepEqual(values, [3, 1, 2]);
});
