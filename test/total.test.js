import { test } from "node:test";
import assert from "node:assert/strict";
import { formatTotal } from "../src/total.js";

test("formatTotal formats a refund of 150 cents", () => {
  assert.equal(formatTotal(-150), "-1.50");
});

test("formatTotal formats negative amounts under one dollar", () => {
  assert.equal(formatTotal(-50), "-0.50");
  assert.equal(formatTotal(-5), "-0.05");
  assert.equal(formatTotal(-1), "-0.01");
});

test("formatTotal formats larger negative amounts", () => {
  assert.equal(formatTotal(-12345), "-123.45");
  assert.equal(formatTotal(-12300), "-123.00");
});

test("formatTotal formats zero without a sign", () => {
  assert.equal(formatTotal(0), "0.00");
});

test("formatTotal formats positive amounts", () => {
  assert.equal(formatTotal(150), "1.50");
  assert.equal(formatTotal(5), "0.05");
  assert.equal(formatTotal(12345), "123.45");
});
