import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCsv, stringifyCsv } from "../src/csv.js";

test("parses simple comma-separated fields", () => {
  assert.deepEqual(parseCsv("a,b,c\n1,2,3"), [
    ["a", "b", "c"],
    ["1", "2", "3"],
  ]);
});

test("parses quoted fields", () => {
  assert.deepEqual(parseCsv('"a","b","c"'), [["a", "b", "c"]]);
});

test("unescapes doubled double quotes inside quoted fields", () => {
  assert.deepEqual(parseCsv('"he said ""hi""",x'), [['he said "hi"', "x"]]);
});

test("keeps commas embedded in quoted fields", () => {
  assert.deepEqual(parseCsv('"a,b",c'), [["a,b", "c"]]);
});

test("keeps newlines embedded in quoted fields", () => {
  assert.deepEqual(parseCsv('"line1\nline2",c'), [["line1\nline2", "c"]]);
});

test("keeps CRLF embedded in quoted fields", () => {
  assert.deepEqual(parseCsv('"line1\r\nline2",c'), [["line1\r\nline2", "c"]]);
});

test("handles CRLF line endings", () => {
  assert.deepEqual(parseCsv("a,b\r\nc,d\r\n"), [
    ["a", "b"],
    ["c", "d"],
  ]);
});

test("handles LF line endings", () => {
  assert.deepEqual(parseCsv("a,b\nc,d\n"), [
    ["a", "b"],
    ["c", "d"],
  ]);
});

test("ignores an empty trailing line", () => {
  assert.deepEqual(parseCsv("a,b\n"), [["a", "b"]]);
  assert.deepEqual(parseCsv("a,b\r\n"), [["a", "b"]]);
});

test("preserves a trailing empty field before the line break", () => {
  assert.deepEqual(parseCsv("a,b,\n"), [["a", "b", ""]]);
});

test("returns no records for empty input", () => {
  assert.deepEqual(parseCsv(""), []);
});

test("parses an optional header followed by records", () => {
  assert.deepEqual(parseCsv('name,note\n"Smith, John","said ""hi"""'), [
    ["name", "note"],
    ["Smith, John", 'said "hi"'],
  ]);
});

test("stringifyCsv leaves fields unquoted when they need no quoting", () => {
  assert.equal(stringifyCsv([["a", "b"], ["1", "2"]]), "a,b\r\n1,2");
});

test("stringifyCsv quotes fields containing commas, quotes or newlines", () => {
  assert.equal(stringifyCsv([["a,b"]]), '"a,b"');
  assert.equal(stringifyCsv([['say "hi"']]), '"say ""hi"""');
  assert.equal(stringifyCsv([["line1\nline2"]]), '"line1\nline2"');
  assert.equal(stringifyCsv([["line1\r\nline2"]]), '"line1\r\nline2"');
});

test("stringifyCsv round-trips an empty input", () => {
  assert.deepEqual(parseCsv(stringifyCsv([])), []);
});

test("stringifyCsv round-trips a single empty field", () => {
  const rows = [[""]];
  assert.equal(stringifyCsv(rows), '""');
  assert.deepEqual(parseCsv(stringifyCsv(rows)), rows);
});

test("stringifyCsv round-trips tricky literal cases", () => {
  const rows = [
    ["a", "b", "c"],
    ["", "only-empty-middle", ""],
    ['quote " inside', "comma, inside", "newline\ninside"],
    ["crlf\r\ninside", 'mixed ", \n and ""', "ends with quote\""],
    ["spaces  preserved", "  leading", "trailing  "],
  ];
  assert.deepEqual(parseCsv(stringifyCsv(rows)), rows);
});

test("stringifyCsv round-trips 200 generated random rows", () => {
  // Deterministic PRNG so the generated rows are reproducible.
  let state = 0x12345678;
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };

  const alphabet = ["a", "b", "Z", " ", ",", '"', "\n", "\r", "\r\n", "1", "-"];
  const randomField = () => {
    const length = Math.floor(random() * 8);
    let value = "";
    for (let i = 0; i < length; i += 1) {
      value += alphabet[Math.floor(random() * alphabet.length)];
    }
    return value;
  };

  const rows = [];
  for (let i = 0; i < 200; i += 1) {
    const fieldCount = 1 + Math.floor(random() * 5);
    const row = [];
    for (let j = 0; j < fieldCount; j += 1) {
      row.push(randomField());
    }
    rows.push(row);
  }

  assert.deepEqual(parseCsv(stringifyCsv(rows)), rows);
});
