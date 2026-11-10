import { test } from "node:test";
import assert from "node:assert/strict";
import { subtract, sum } from "../src/sum.js";

test("sum adds two numbers", () => {
  assert.equal(sum(2, 3), 5);
});

test("subtract subtracts the second number from the first", () => {
  assert.equal(subtract(5, 3), 2);
});
