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
  assert.match(result.stderr, /--tax <percent>/);
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

test("prints usage for a fractional amount", () => {
  assertUsage(runTotal("1.5"));
  assertUsage(runTotal("-0.5"));
  assertUsage(runTotal("2.25"));
});

test("prints the formatted total for a number of cents", () => {
  assert.deepEqual(runTotal("150"), { stdout: "1.50\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("-150"), { stdout: "-1.50\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("0"), { stdout: "0.00\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("12345"), { stdout: "123.45\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("123456789"), { stdout: "1,234,567.89\n", stderr: "", status: 0 });
});

test("prints the total with a whole-percent tax rate", () => {
  assert.deepEqual(runTotal("1999", "--tax", "19"), { stdout: "23.79\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("1000", "--tax", "25"), { stdout: "12.50\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("1999", "--tax", "100"), { stdout: "39.98\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("150", "--tax", "0"), { stdout: "1.50\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("123456789", "--tax", "19"), { stdout: "1,469,135.79\n", stderr: "", status: 0 });
});

test("prints the total with tax for negative amounts", () => {
  assert.deepEqual(runTotal("-150", "--tax", "19"), { stdout: "-1.79\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("-1999", "--tax", "19"), { stdout: "-23.79\n", stderr: "", status: 0 });
});

test("rounds half a cent away from zero", () => {
  assert.deepEqual(runTotal("50", "--tax", "19"), { stdout: "0.60\n", stderr: "", status: 0 });
  assert.deepEqual(runTotal("5", "--tax", "19"), { stdout: "0.06\n", stderr: "", status: 0 });
});

test("prints large taxed totals exactly", () => {
  assert.deepEqual(runTotal("9007199254740991", "--tax", "1"), {
    stdout: "90,972,712,472,884.01\n",
    stderr: "",
    status: 0,
  });
  assert.deepEqual(runTotal("-9007199254740991", "--tax", "1"), {
    stdout: "-90,972,712,472,884.01\n",
    stderr: "",
    status: 0,
  });
});

test("prints absurd tax rates as a decimal total", () => {
  for (const amount of ["150", "-150"]) {
    const result = runTotal(amount, "--tax", "1e300");
    assert.equal(result.status, 0);
    assert.equal(result.stderr, "");
    assert.match(result.stdout, /^-?\d{1,3}(,\d{3})*\.\d{2}\n$/);
  }
  const longRate = runTotal("150", "--tax", "999999999999999999999");
  assert.equal(longRate.status, 0);
  assert.equal(longRate.stderr, "");
  assert.match(longRate.stdout, /^\d{1,3}(,\d{3})*\.\d{2}\n$/);
});

test("prints usage for a missing or invalid tax rate", () => {
  assertUsage(runTotal("150", "--tax"));
  assertUsage(runTotal("150", "--tax", "abc"));
  assertUsage(runTotal("150", "--tax", ""));
  assertUsage(runTotal("150", "--tax", "7.5"));
  assertUsage(runTotal("150", "--tax", "-19"));
  assertUsage(runTotal("150", "--tax=19"));
  assertUsage(runTotal("150", "--tax", "19", "extra"));
  assertUsage(runTotal("150", "foo"));
  assertUsage(runTotal("--tax", "19"));
  assertUsage(runTotal("150", "--tax", "19", "--tax", "5"));
});
