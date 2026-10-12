import { test } from "node:test";
import assert from "node:assert/strict";
import { stddev } from "../src/stddev.js";

test("stddev is the square root of the population variance", () => {
  assert.equal(stddev([2, 4, 4, 4, 5, 5, 7, 9]), 2);
});

test("stddev is the square root of the sample variance", () => {
  assert.equal(stddev([2, 4, 4, 4, 5, 5, 7, 9], { sample: true }), Math.sqrt(32 / 7));
});
