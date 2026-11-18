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

test("formatSum keeps sums with more than 15 significant digits", () => {
  assert.equal(formatSum(1234567890123456), "1234567890123456");
  assert.equal(formatSum(9007199254740992), "9007199254740992");
  assert.equal(formatSum(123456789012345.6), "123456789012345.6");
  assert.equal(formatSum(0.1234567890123456), "0.1234567890123456");
});

test("sumText keeps exact sums with more than 15 significant digits", () => {
  assert.equal(sumText("1234567890123456", "0"), "1234567890123456");
  assert.equal(sumText("9007199254740992", "0"), "9007199254740992");
  assert.equal(sumText("123456789012345.6", "0"), "123456789012345.6");
  assert.equal(sumText("0.1234567890123456", "0"), "0.1234567890123456");
  assert.equal(sumText("1234567890123456", "1"), "1234567890123457");
});

test("formatSum writes large sums as plain decimal numbers", () => {
  assert.equal(formatSum(1e21), "1000000000000000000000");
  assert.equal(formatSum(-1e21), "-1000000000000000000000");
  assert.equal(sumText("1e21", "0"), "1000000000000000000000");
  assert.equal(sumText("5e20", "5e20"), "1000000000000000000000");
});

test("formatSum keeps tiny sums instead of rounding them down to zero", () => {
  assert.equal(sumText("0.0000000000001", "0"), "1e-13");
});

test("sumText shows the hint when the sum is too large", () => {
  assert.equal(sumText("1e308", "1e308"), "");
  assert.equal(sumText("-1e308", "-1e308"), "");
  assert.equal(formatSum(Infinity), "");
  assert.equal(formatSum(NaN), "");
});

test("sumText asks for both numbers while an input is empty or not a number", () => {
  assert.equal(sumText("", ""), "");
  assert.equal(sumText("2", ""), "");
  assert.equal(sumText("", "3"), "");
  assert.equal(sumText("abc", "3"), "");
  assert.equal(sumText("2", "abc"), "");
  assert.equal(sumText("Infinity", "3"), "");
});
