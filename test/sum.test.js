import { test } from "node:test";
import assert from "node:assert/strict";
import { min, sum } from "../src/sum.js";

test("sum adds two numbers", () => {
  assert.equal(sum(2, 3), 5);
});

test("min returns the smaller of two numbers", () => {
  assert.equal(min(2, 3), 2);
  assert.equal(min(3, 2), 2);
});
