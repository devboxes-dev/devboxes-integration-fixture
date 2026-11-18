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

test("lists the currency options in the usage text", () => {
  const { stderr } = runTotal();
  assert.match(stderr, /--currency <code>/);
  assert.match(stderr, /--locale <tag>/);
  assert.match(stderr, /amount is in that currency/);
});

test("prints the total in a customer's currency and locale", () => {
  assert.deepEqual(runTotal("123456", "--currency", "EUR", "--locale", "de-DE"), {
    stdout: "1.234,56\u00a0€\n",
    stderr: "",
    status: 0,
  });
  assert.deepEqual(runTotal("123456", "--currency", "USD", "--locale", "en-US"), {
    stdout: "$1,234.56\n",
    stderr: "",
    status: 0,
  });
});

test("accepts the currency options before the amount", () => {
  assert.deepEqual(runTotal("--currency", "USD", "--locale", "en-US", "123456"), {
    stdout: "$1,234.56\n",
    stderr: "",
    status: 0,
  });
});

test("prints usage when a currency option has no value", () => {
  const cases = [
    ["150", "--currency"],
    ["150", "--locale"],
    ["--currency", "--locale", "de-DE", "150"],
  ];
  for (const args of cases) {
    const result = runTotal(...args);
    assert.equal(result.status, 1);
    assert.equal(result.stdout, "");
    assert.match(result.stderr, /needs a value/);
    assert.match(result.stderr, /^Usage: .*total\.js <amount-in-cents>/m);
  }
});

test("reports an unknown currency", () => {
  const result = runTotal("150", "--currency", "XYZ");
  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.match(result.stderr, /--currency "XYZ"/);
  assert.match(result.stderr, /Unknown currency code: "XYZ"/);
  assert.doesNotMatch(result.stderr, /\n\s+at /);
});

test("reports an unsupported locale", () => {
  const result = runTotal("150", "--locale", "not-a-locale");
  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.match(result.stderr, /--locale "not-a-locale"/);
  assert.doesNotMatch(result.stderr, /\n\s+at /);
});

test("prints usage for a fractional amount with currency options", () => {
  assertUsage(runTotal("1.5", "--currency", "EUR", "--locale", "de-DE"));
});
