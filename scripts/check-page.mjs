import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const pageUrl = pathToFileURL(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "index.html"),
).href;

const executablePath = process.env.AGENT_BROWSER_EXECUTABLE_PATH;
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const page = await browser.newPage();
const errors = [];

page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));

await page.goto(pageUrl);

const check = async (a, b, expected) => {
  await page.fill("#a", a);
  await page.fill("#b", b);
  const actual = (await page.textContent("#result")).trim();
  if (actual !== expected) {
    throw new Error(`expected ${a || "(empty)"} + ${b || "(empty)"} = ${expected}, got ${actual}`);
  }
  console.log(`ok ${a || "(empty)"} + ${b || "(empty)"} = ${actual}`);
};

try {
  await check("2", "3", "5");
  await check("2.5", "0.5", "3");
  await check("-2", "3", "1");
  await check("", "", "0");
  await check("", "4", "4");

  await page.screenshot({ path: "test-results/sum-page.png" });

  if (errors.length > 0) {
    throw new Error(`console errors:\n${errors.join("\n")}`);
  }
} finally {
  await browser.close();
}
