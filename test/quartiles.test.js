import { test } from "node:test";
import assert from "node:assert/strict";
import { quartiles } from "../src/quartiles.js";

test("quartiles returns the three quartiles and the interquartile range", () => {
  assert.deepEqual(quartiles([1, 2, 3, 4, 5]), {
    q1: 2,
    q2: 3,
    q3: 4,
    iqr: 2,
  });
});

test("quartiles interpolates for even lengths", () => {
  assert.deepEqual(quartiles([1, 2, 3, 4]), {
    q1: 1.75,
    q2: 2.5,
    q3: 3.25,
    iqr: 1.5,
  });
});
