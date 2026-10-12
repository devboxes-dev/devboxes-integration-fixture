import { test } from "node:test";
import assert from "node:assert/strict";
import { zscores } from "../src/zscore.js";

test("zscores standardizes each value", () => {
  assert.deepEqual(zscores([1, 2, 3, 4, 5]), [
    -1.414213562373095,
    -0.7071067811865475,
    0,
    0.7071067811865475,
    1.414213562373095,
  ]);
});

test("zscores throws a RangeError when the standard deviation is zero", () => {
  assert.throws(() => zscores([3, 3, 3]), RangeError);
});
