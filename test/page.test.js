import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const inlineScript = html.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";

const element = (value = "") => ({
  value,
  textContent: "",
  listeners: {},
  addEventListener(type, handler) {
    this.listeners[type] = handler;
  },
});

/** Loads the page's inline script against a minimal fake DOM. */
const loadPage = () => {
  const elements = { a: element(), b: element(), result: element() };
  const document = { getElementById: (id) => elements[id] };
  vm.runInNewContext(inlineScript, { document });
  return elements;
};

/** Types into both inputs and fires the matching input event. */
const type = (elements, a, b) => {
  elements.a.value = a;
  elements.a.listeners.input();
  elements.b.value = b;
  elements.b.listeners.input();
  return elements.result.textContent;
};

test("the page has two number inputs and a sum output", () => {
  assert.equal(html.match(/<input\b[^>]*\btype="number"/g)?.length, 2);
  assert.match(html, /<label for="a">/);
  assert.match(html, /<label for="b">/);
  assert.match(html, /<output id="result"/);
});

test("the page starts with a sum of 0", () => {
  assert.equal(loadPage().result.textContent, "0");
});

test("the page updates the sum as both numbers are typed", () => {
  const elements = loadPage();
  assert.equal(type(elements, "2", "3"), "5");
});

test("the page adds decimals and negative numbers", () => {
  const elements = loadPage();
  assert.equal(type(elements, "2.5", "0.5"), "3");
  assert.equal(type(elements, "-2", "3"), "1");
});

test("the page treats an empty field as zero", () => {
  const elements = loadPage();
  assert.equal(type(elements, "", ""), "0");
  assert.equal(type(elements, "", "4"), "4");
  assert.equal(type(elements, "4", ""), "4");
});
