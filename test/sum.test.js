import { test } from "node:test";
import assert from "node:assert/strict";
import { max, sum } from "../src/sum.js";

test("sum adds two numbers", () => {
  assert.equal(sum(2, 3), 5);
});

test("max returns the larger of two numbers", () => {
  assert.equal(max(2, 3), 3);
  assert.equal(max(5, 1), 5);
});
