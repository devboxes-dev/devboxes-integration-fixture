import { test } from "node:test";
import assert from "node:assert/strict";
import { sumText } from "../src/sum-page.js";

test("sumText adds two numbers as text", () => {
  assert.equal(sumText("2", "3"), "5");
});

test("sumText adds decimals and negatives", () => {
  assert.equal(sumText("2.5", "0.5"), "3");
  assert.equal(sumText("-2", "3"), "1");
});

test("sumText hides binary floating-point noise", () => {
  assert.equal(sumText("0.1", "0.2"), "0.3");
  assert.equal(sumText("1.1", "2.2"), "3.3");
  assert.equal(sumText("0.1", "0.7"), "0.8");
  assert.equal(sumText("0.3", "0.6"), "0.9");
});

test("sumText keeps 15-digit integer sums", () => {
  assert.equal(sumText("123456789012345", "1"), "123456789012346");
});

test("sumText shows nothing until both inputs are numbers", () => {
  assert.equal(sumText("", "3"), "");
  assert.equal(sumText("2", ""), "");
  assert.equal(sumText("  ", "3"), "");
  assert.equal(sumText("abc", "3"), "");
  assert.equal(sumText("2", "1.2.3"), "");
});
