import { test } from "node:test";
import assert from "node:assert/strict";
import { variance } from "../src/variance.js";

test("variance computes the population variance by default", () => {
  assert.equal(variance([2, 4, 4, 4, 5, 5, 7, 9]), 4);
});

test("variance computes the sample variance when requested", () => {
  assert.equal(variance([2, 4, 4, 4, 5, 5, 7, 9], { sample: true }), 32 / 7);
});
