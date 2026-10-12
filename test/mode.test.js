import { test } from "node:test";
import assert from "node:assert/strict";
import { mode } from "../src/mode.js";

test("mode returns the single most frequent value", () => {
  assert.deepEqual(mode([1, 2, 2, 3]), [2]);
});

test("mode returns multiple values sorted when tied", () => {
  assert.deepEqual(mode([3, 1, 1, 3, 2]), [1, 3]);
});

test("mode of distinct values returns all values sorted", () => {
  assert.deepEqual(mode([5, 4, 6]), [4, 5, 6]);
});
