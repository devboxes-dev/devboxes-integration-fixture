import { test } from "node:test";
import assert from "node:assert/strict";
import { sum, multiply } from "../src/sum.js";

test("sum adds two numbers", () => {
  assert.equal(sum(2, 3), 5);
});

test("multiply multiplies two numbers", () => {
  assert.equal(multiply(2, 3), 6);
});

test("sum throws TypeError for non-number arguments", () => {
  assert.throws(() => sum(2, "3"), TypeError);
});

test("multiply throws TypeError for non-number arguments", () => {
  assert.throws(() => multiply("2", 3), TypeError);
});
