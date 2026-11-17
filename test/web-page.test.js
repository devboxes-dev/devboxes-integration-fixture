import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { createServer } from "../bin/serve.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const artifacts = fileURLToPath(new URL("../.artifacts/", import.meta.url));

let server;
let browser;
let baseUrl;

before(async () => {
  server = createServer(root);
  await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  await new Promise((closed) => server.close(closed));
});

/** Opens the page and returns it with its two number inputs. */
const openPage = async () => {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/`);
  return { page, a: page.locator("#a"), b: page.locator("#b"), sum: page.locator("#sum") };
};

test("page shows the sum as the numbers are typed", async () => {
  const { page, a, b, sum } = await openPage();

  await a.fill("2");
  await b.fill("3");
  assert.equal(await sum.textContent(), "5");

  await a.fill("10");
  assert.equal(await sum.textContent(), "13");

  await mkdir(artifacts, { recursive: true });
  await page.screenshot({ path: `${artifacts}sum-page.png` });

  await page.close();
});

test("page adds decimals and negatives", async () => {
  const { page, a, b, sum } = await openPage();

  await a.fill("2.5");
  await b.fill("0.5");
  assert.equal(await sum.textContent(), "3");

  await a.fill("-2");
  await b.fill("3");
  assert.equal(await sum.textContent(), "1");

  await page.close();
});

test("page shows nothing until both inputs are numbers", async () => {
  const { page, a, b, sum } = await openPage();

  assert.equal(await sum.textContent(), "");

  await a.fill("2");
  assert.equal(await sum.textContent(), "");

  await b.fill("3");
  assert.equal(await sum.textContent(), "5");

  await b.fill("");
  assert.equal(await sum.textContent(), "");

  await page.close();
});
