import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const page = {};
runInNewContext(script, page);

test("page has two number inputs and a result area", () => {
  assert.equal(html.match(/type="number"/g)?.length, 2);
  assert.match(html, /<output id="result"/);
});

test("sumInputs adds the two entered numbers", () => {
  assert.equal(page.sumInputs("2", "3"), "5");
});

test("sumInputs accepts decimals and negatives", () => {
  assert.equal(page.sumInputs("-1.5", "2.25"), "0.75");
});

test("sumInputs ignores surrounding whitespace", () => {
  assert.equal(page.sumInputs(" 1 ", "2"), "3");
});

test("sumInputs returns no result until both inputs are valid numbers", () => {
  assert.equal(page.sumInputs("", "3"), "");
  assert.equal(page.sumInputs("2", " "), "");
  assert.equal(page.sumInputs("two", "3"), "");
});
