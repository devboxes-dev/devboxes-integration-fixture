import { test } from "node:test";
import assert from "node:assert/strict";
import { mode } from "../src/mode.js";

test("mode returns the single most frequent value", () => {
  assert.deepEqual(mode([1, 2, 2, 3]), [2]);
});

test("mode returns every tied value in sorted order", () => {
  assert.deepEqual(mode([3, 1, 3, 1, 2]), [1, 3]);
});

test("mode throws a RangeError for an empty array", () => {
  assert.throws(() => mode([]), RangeError);
});
