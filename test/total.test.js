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

test("formatTotal groups thousands in positive amounts", () => {
  assert.equal(formatTotal(123456789), "1,234,567.89");
  assert.equal(formatTotal(100000), "1,000.00");
  assert.equal(formatTotal(99999999), "999,999.99");
  assert.equal(formatTotal(100000000), "1,000,000.00");
});

test("formatTotal groups thousands in negative amounts", () => {
  assert.equal(formatTotal(-123456789), "-1,234,567.89");
});

test("formatTotal keeps the plain total when options are empty", () => {
  assert.equal(formatTotal(123456789, {}), "1,234,567.89");
});

test("formatTotal shows a total in a customer's currency and locale", () => {
  assert.equal(formatTotal(123456, { currency: "USD", locale: "en-US" }), "$1,234.56");
  assert.equal(formatTotal(123456, { currency: "EUR", locale: "de-DE" }), "1.234,56\u00a0€");
  assert.equal(formatTotal(123456, { currency: "EUR", locale: "fr-FR" }), "1\u202f234,56\u00a0€");
  assert.equal(formatTotal(123456, { currency: "GBP", locale: "en-GB" }), "£1,234.56");
});

test("formatTotal follows the locale for negative and zero amounts", () => {
  assert.equal(formatTotal(-150, { currency: "EUR", locale: "de-DE" }), "-1,50\u00a0€");
  assert.equal(formatTotal(0, { currency: "EUR", locale: "de-DE" }), "0,00\u00a0€");
});

test("formatTotal uses the currency's own minor unit", () => {
  assert.equal(formatTotal(150, { currency: "USD", locale: "en-US" }), "$1.50");
  assert.equal(formatTotal(123456, { currency: "JPY", locale: "ja-JP" }), "\uffe5123,456");
});

test("formatTotal groups and separates by locale without a currency", () => {
  assert.equal(formatTotal(123456, { locale: "de-DE" }), "1.234,56");
  assert.equal(formatTotal(123456, { locale: "fr-FR" }), "1\u202f234,56");
});

test("formatTotal uses the default locale when only a currency is given", () => {
  const expected = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(1234.56);
  assert.equal(formatTotal(123456, { currency: "USD" }), expected);
});

test("formatTotal rejects unknown currencies", () => {
  assert.throws(() => formatTotal(150, { currency: "XYZ" }), /Unknown currency code: "XYZ"/);
  assert.throws(() => formatTotal(150, { currency: "US" }), /Unknown currency code: "US"/);
});

test("formatTotal rejects invalid and unknown locales", () => {
  assert.throws(() => formatTotal(150, { locale: "en_US" }), /Invalid locale: "en_US"/);
  assert.throws(() => formatTotal(150, { locale: "not-a-locale" }), /Unsupported locale: "not-a-locale"/);
});
