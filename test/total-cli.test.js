import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../bin/total.js", import.meta.url));

/** Runs the command-line tool and captures how it exited. */
const runTotal = (...args) => {
  const { stdout, stderr, status } = spawnSync(process.execPath, [cli, ...args], {
    encoding: "utf8",
  });
  return { stdout, stderr, status };
};

const assertUsage = (result) => {
  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.match(result.stderr, /^Usage: .*total\.js <amount-in-cents>/);
  assert.match(result.stderr, /amount in cents/);
  assert.doesNotMatch(result.stderr, /NaN/);
};

test("prints usage without an amount", () => {
  assertUsage(runTotal());
});

test("prints usage for an amount that is not a number", () => {
  assertUsage(runTotal("abc"));
  assertUsage(runTotal("1.2.3"));
});

test("prints usage for an empty amount", () => {
  assertUsage(runTotal(""));
});

test("prints the formatted total for a number of cents", () => {
  assert.deepEqual(runTotal("150"), { stdout: "1.50\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("-150"), { stdout: "-1.50\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("0"), { stdout: "0.00\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("12345"), { stdout: "123.45\n", stderr: "", status: 0 });
});
