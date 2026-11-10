import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { sum } from "../src/sum.js";

test("sum adds two numbers", () => {
  assert.equal(sum(2, 3), 5);
});

test("README lists the function exported by src/sum.js", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
  assert.match(readme, /`sum\(a, b\)`/);
});
