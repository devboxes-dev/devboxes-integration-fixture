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

test("sumText shows nothing until both inputs are numbers", () => {
  assert.equal(sumText("", "3"), "");
  assert.equal(sumText("2", ""), "");
  assert.equal(sumText("  ", "3"), "");
  assert.equal(sumText("abc", "3"), "");
  assert.equal(sumText("2", "1.2.3"), "");
});
