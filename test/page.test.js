import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

/** Runs the page's inline script against a minimal DOM stub. */
function loadPage() {
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
    ([, source]) => source,
  );
  assert.equal(scripts.length, 1, "index.html should contain one inline script");

  const listeners = {};
  const elements = {
    "sum-form": {
      addEventListener(type, listener) {
        listeners[type] = listener;
      },
    },
    first: { value: "" },
    second: { value: "" },
    result: { textContent: "" },
    error: { textContent: "" },
  };

  vm.runInContext(
    scripts[0],
    vm.createContext({
      document: { getElementById: (id) => elements[id] ?? null },
    }),
  );

  return {
    elements,
    /** Submits the form the way the Add button or the Enter key does. */
    submit() {
      let defaultPrevented = false;
      listeners.submit({ preventDefault: () => (defaultPrevented = true) });
      return defaultPrevented;
    },
  };
}

function submitValues(first, second) {
  const page = loadPage();
  page.elements.first.value = first;
  page.elements.second.value = second;
  return { page, defaultPrevented: page.submit() };
}

test("page has two labelled number inputs and an Add button", () => {
  assert.equal(html.match(/<input\b[^>]*type="number"/g)?.length, 2);
  assert.equal(html.match(/<label\b/g)?.length, 2);
  assert.match(html, /<button[^>]*type="submit"[^>]*>Add<\/button>/);
  assert.match(html, /<output[^>]*id="result"/);
});

test("page uses no external resources", () => {
  assert.doesNotMatch(html, /(src|href)="https?:/);
});

test("adds two numbers", () => {
  const { page } = submitValues("2", "3");
  assert.equal(page.elements.result.textContent, "5");
  assert.equal(page.elements.error.textContent, "");
});

test("adds decimals and negative numbers", () => {
  for (const [first, second, expected] of [
    ["1.5", "2.25", "3.75"],
    ["-4", "4", "0"],
    ["-2.5", "-2.5", "-5"],
  ]) {
    const { page } = submitValues(first, second);
    assert.equal(
      page.elements.result.textContent,
      expected,
      `${first} + ${second}`,
    );
  }
});

test("asks for numbers instead of showing a sum when input is missing", () => {
  for (const [first, second] of [
    ["", ""],
    ["2", ""],
    ["abc", "3"],
  ]) {
    const { page } = submitValues(first, second);
    assert.equal(page.elements.result.textContent, "", `${first} + ${second}`);
    assert.equal(page.elements.error.textContent, "Enter two numbers.");
  }
});

test("recalculates from the current input values", () => {
  const page = loadPage();
  page.elements.first.value = "2";
  page.elements.second.value = "3";
  page.submit();
  assert.equal(page.elements.result.textContent, "5");

  page.elements.first.value = "10";
  page.elements.second.value = "1";
  page.submit();
  assert.equal(page.elements.result.textContent, "11");
});

test("submitting the form is handled without reloading the page", () => {
  const { defaultPrevented } = submitValues("2", "3");
  assert.equal(defaultPrevented, true);
});
