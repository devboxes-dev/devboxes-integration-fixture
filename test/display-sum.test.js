import { test } from "node:test";
import assert from "node:assert/strict";
import { formatSum, sumText } from "../src/display-sum.js";

test("formatSum hides floating-point noise", () => {
  assert.equal(formatSum(0.1 + 0.2), "0.3");
  assert.equal(formatSum(3), "3");
  assert.equal(formatSum(-1), "-1");
  assert.equal(formatSum(0), "0");
});

test("sumText adds two numeric inputs", () => {
  assert.equal(sumText("2", "3"), "5");
  assert.equal(sumText("2.5", "0.5"), "3");
  assert.equal(sumText("-2", "3"), "1");
  assert.equal(sumText(" 2 ", "3"), "5");
  assert.equal(sumText("0.1", "0.2"), "0.3");
});

test("sumText asks for both numbers while an input is empty or not a number", () => {
  assert.equal(sumText("", ""), "");
  assert.equal(sumText("2", ""), "");
  assert.equal(sumText("", "3"), "");
  assert.equal(sumText("abc", "3"), "");
  assert.equal(sumText("2", "abc"), "");
  assert.equal(sumText("Infinity", "3"), "");
});
