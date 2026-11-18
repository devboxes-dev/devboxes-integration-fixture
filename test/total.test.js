import { test } from "node:test";
import assert from "node:assert/strict";
import { formatTotal, totalWithTax } from "../src/total.js";

test("totalWithTax adds a whole-percent tax rate", () => {
  assert.equal(totalWithTax(1999, 19), 2379);
  assert.equal(totalWithTax(1000, 25), 1250);
  assert.equal(totalWithTax(1999, 100), 3998);
  assert.equal(totalWithTax(150, 0), 150);
  assert.equal(totalWithTax(0, 19), 0);
});

test("totalWithTax keeps thousands-sized amounts exact", () => {
  assert.equal(totalWithTax(123456789, 19), 146913579);
});

test("totalWithTax rounds half a cent away from zero", () => {
  assert.equal(totalWithTax(50, 19), 60);
  assert.equal(totalWithTax(5, 19), 6);
  assert.equal(totalWithTax(1, 19), 1);
  assert.equal(totalWithTax(-150, 19), -179);
});

test("totalWithTax taxes negative amounts and keeps their sign", () => {
  assert.equal(totalWithTax(-1999, 19), -2379);
  assert.equal(totalWithTax(-50, 19), -60);
});

test("totalWithTax keeps totals above the safe integer range exact", () => {
  const total = totalWithTax(9007199254740991, 1);
  assert.equal(typeof total, "bigint");
  assert.equal(total, 9097271247288401n);
  assert.equal(formatTotal(total), "90,972,712,472,884.01");
});

test("totalWithTax returns a number while the total stays a safe integer", () => {
  assert.equal(typeof totalWithTax(1999, 19), "number");
  assert.equal(typeof totalWithTax(0, 19), "number");
});

test("formatTotal writes a total from an absurd tax rate as a decimal number", () => {
  const total = totalWithTax(150, 1e300);
  assert.equal(typeof total, "bigint");
  assert.match(formatTotal(total), /^\d{1,3}(,\d{3})*\.\d{2}$/);
});

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

test("formatTotal groups thousands in positive amounts", () => {
  assert.equal(formatTotal(123456789), "1,234,567.89");
  assert.equal(formatTotal(100000), "1,000.00");
  assert.equal(formatTotal(99999999), "999,999.99");
  assert.equal(formatTotal(100000000), "1,000,000.00");
});

test("formatTotal groups thousands in negative amounts", () => {
  assert.equal(formatTotal(-123456789), "-1,234,567.89");
});
