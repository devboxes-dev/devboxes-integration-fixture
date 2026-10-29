import { test } from "node:test";
import assert from "node:assert/strict";
import { clamp } from "../src/clamp.js";

test("clamp raises a value below the range to min", () => {
  assert.equal(clamp(-5, 0, 10), 0);
});

test("clamp leaves a value inside the range unchanged", () => {
  assert.equal(clamp(5, 0, 10), 5);
});

test("clamp lowers a value above the range to max", () => {
  assert.equal(clamp(15, 0, 10), 10);
});
