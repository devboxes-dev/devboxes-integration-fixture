import { test } from "node:test";
import assert from "node:assert/strict";
import { divide, sum } from "../src/sum.js";

test("sum adds two numbers", () => {
  assert.equal(sum(2, 3), 5);
});

test("divide divides two numbers", () => {
  assert.equal(divide(6, 3), 2);
});

test("divide throws when dividing by zero", () => {
  assert.throws(() => divide(6, 0));
});
