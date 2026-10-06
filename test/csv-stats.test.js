import { test } from "node:test";
import assert from "node:assert/strict";
import { columnStats } from "../src/csv-stats.js";

test("returns no stats for an empty file", () => {
  assert.deepEqual(columnStats(""), {});
});

test("returns no stats for a header-only file", () => {
  assert.deepEqual(columnStats("a,b\n"), {});
});

test("omits a non-numeric column", () => {
  const stats = columnStats("name,age\nAlice,30\nBob,40");
  assert.deepEqual(Object.keys(stats), ["age"]);
  assert.equal(stats.name, undefined);
  assert.equal(stats.age.count, 2);
});

test("handles a column with a single value", () => {
  const stats = columnStats("value\n42");
  assert.deepEqual(stats.value, {
    count: 1,
    min: 42,
    max: 42,
    mean: 42,
    median: 42,
    stdDev: 0,
  });
});

test("computes count, min, max, mean, median and population std dev", () => {
  const stats = columnStats("n\n2\n4\n4\n4\n5\n5\n7\n9");
  assert.deepEqual(stats.n, {
    count: 8,
    min: 2,
    max: 9,
    mean: 5,
    median: 4.5,
    stdDev: 2,
  });
});

test("treats empty cells as missing and still reports the column", () => {
  const stats = columnStats("n,label\n1,x\n,y\n3,z");
  assert.deepEqual(stats.n, {
    count: 2,
    min: 1,
    max: 3,
    mean: 2,
    median: 2,
    stdDev: 1,
  });
});

test("a column with no values is not reported", () => {
  const stats = columnStats("n,label\n,x\n,y");
  assert.deepEqual(stats, {});
});
