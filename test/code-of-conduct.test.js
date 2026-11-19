import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const codeOfConduct = await readFile(new URL("../CODE_OF_CONDUCT.md", import.meta.url), "utf8");
const prose = codeOfConduct.replace(/\s+/g, " ");

test("keeps the Contributor Covenant 2.1 sections in order", () => {
  const headings = [...codeOfConduct.matchAll(/^#{2,3} (.+)$/gm)].map(([, heading]) => heading);
  assert.deepEqual(headings, [
    "Our Pledge",
    "Our Standards",
    "Enforcement Responsibilities",
    "Scope",
    "Enforcement",
    "Enforcement Guidelines",
    "1. Correction",
    "2. Warning",
    "3. Temporary Ban",
    "4. Permanent Ban",
    "Attribution",
  ]);
  assert.match(prose, /version 2\.1/);
  assert.match(prose, /https:\/\/www\.contributor-covenant\.org\/version\/2\/1\/code_of_conduct\.html/);
});

test("reports incidents privately to the maintainers through GitHub", () => {
  assert.match(prose, /reported privately to the project maintainers through GitHub/);
  assert.match(prose, /do not report incidents through public issues, pull requests, or discussions/i);
  assert.match(prose, /All complaints will be reviewed and investigated promptly and fairly\./);
});

test("covers issues, pull requests, and discussions", () => {
  assert.match(prose, /This Code of Conduct applies within all community spaces, including this repository's issues, pull requests, and discussions/);
});

test("keeps every enforcement level and its consequence", () => {
  assert.equal((codeOfConduct.match(/\*\*Community Impact\*\*:/g) ?? []).length, 4);
  assert.equal((codeOfConduct.match(/\*\*Consequence\*\*:/g) ?? []).length, 4);
  for (const consequence of [
    /A private, written warning from community leaders/,
    /No interaction with the people involved/,
    /A temporary ban from any sort of interaction or public communication/,
    /A permanent ban from any sort of public interaction within the community/,
  ]) {
    assert.match(prose, consequence);
  }
});

test("leaves no unfilled template markers", () => {
  assert.doesNotMatch(codeOfConduct, /\[INSERT|\[NOTE:|TODO/);
});
