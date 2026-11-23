import assert from "node:assert/strict";
import { chromium } from "playwright";
import { startServer } from "../server.js";

/** Values to type into the fields, with the sum the page should show for them. */
const cases = [
  ["2", "3", "5"],
  ["2.5", "-1", "1.5"],
  ["0.1", "0.2", "0.3"],
  ["-4", "-6", "-10"],
];

const { server, url } = await startServer({ port: 0 });
let browser;
try {
  browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined });
  const page = await browser.newPage();
  const problems = [];
  page.on("pageerror", (error) => problems.push(String(error)));
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(message.text());
  });

  await page.goto(url);
  const first = page.locator("#first");
  const second = page.locator("#second");
  const sum = page.locator("#sum");
  const clear = page.locator("#clear");

  for (const [left, right, expected] of cases) {
    await first.fill(left);
    await second.fill(right);
    assert.equal(await sum.textContent(), expected, `${left} + ${right}`);
    console.log(`${left} + ${right} = ${expected}`);
  }

  await first.fill("");
  assert.match(await sum.textContent(), /Enter two numbers/);
  await first.fill("12");
  await second.fill("34");
  await clear.click();
  assert.equal(await first.inputValue(), "");
  assert.equal(await second.inputValue(), "");
  assert.match(await sum.textContent(), /Enter two numbers/);
  assert.deepEqual(problems, [], "the page logged errors");
  console.log("Browser check passed.");
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
