import { test } from "node:test";
import assert from "node:assert/strict";
import { sum } from "../src/sum.js";

test("sum adds two numbers", () => {
  assert.equal(sum(2, 3), 5);
});

test("sum adds numbers supplied as text", () => {
  assert.equal(sum("2", "3"), 5);
  assert.equal(sum(" 2 ", "3"), 5);
});

test("sum adds decimal and negative text", () => {
  assert.equal(sum("2.5", "0.5"), 3);
  assert.equal(sum("-2", "3"), 1);
});

test("sum adds mixed numbers and text", () => {
  assert.equal(sum("2", 3), 5);
  assert.equal(sum(2, "3"), 5);
});
