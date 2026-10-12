import { test } from "node:test";
import assert from "node:assert/strict";
import { variance } from "../src/variance.js";
import { stddev } from "../src/stddev.js";

test("variance computes the population variance by default", () => {
  assert.equal(variance([2, 4, 4, 4, 5, 5, 7, 9]), 4);
});

test("variance computes the sample variance when requested", () => {
  assert.equal(variance([2, 4, 4, 4, 5, 5, 7, 9], { sample: true }), 32 / 7);
});

test("variance throws a RangeError for an empty array", () => {
  assert.throws(() => variance([]), RangeError);
});

test("stddev computes the population standard deviation by default", () => {
  assert.equal(stddev([2, 4, 4, 4, 5, 5, 7, 9]), 2);
});

test("stddev computes the sample standard deviation when requested", () => {
  assert.equal(stddev([2, 4, 4, 4, 5, 5, 7, 9], { sample: true }), Math.sqrt(32 / 7));
});
