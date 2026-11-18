import { test } from "node:test";
import assert from "node:assert/strict";
import { startServer } from "../server.js";

/** Starts the page server on a free port, returning its URL and a function that closes it. */
const serve = async () => {
  const { server, url } = await startServer({ port: 0 });
  return { url, close: () => new Promise((resolve) => server.close(resolve)) };
};

test("serves the sum page with two number inputs", async () => {
  const { url, close } = await serve();
  try {
    const response = await fetch(url);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /^text\/html/);
    const html = await response.text();
    assert.equal((html.match(/type="number"/g) ?? []).length, 2);
    assert.match(html, /id="first"/);
    assert.match(html, /id="second"/);
    assert.match(html, /id="sum"/);
    assert.match(html, /src="\/app\.js"/);
  } finally {
    await close();
  }
});

test("serves the page script and the sum logic it imports", async () => {
  const { url, close } = await serve();
  try {
    const pageScript = await fetch(`${url}/app.js`);
    assert.equal(pageScript.status, 200);
    assert.match(pageScript.headers.get("content-type"), /^text\/javascript/);
    assert.match(await pageScript.text(), /from "\.\/src\/display-sum\.js"/);

    const displayModule = await fetch(`${url}/src/display-sum.js`);
    assert.equal(displayModule.status, 200);
    assert.match(displayModule.headers.get("content-type"), /^text\/javascript/);
    assert.match(await displayModule.text(), /from "\.\/sum\.js"/);

    const sumModule = await fetch(`${url}/src/sum.js`);
    assert.equal(sumModule.status, 200);
    assert.match(await sumModule.text(), /export const sum/);
  } finally {
    await close();
  }
});

test("returns not found for files the page does not need", async () => {
  const { url, close } = await serve();
  try {
    const response = await fetch(`${url}/package.json`);
    assert.equal(response.status, 404);
    assert.equal(await response.text(), "Not found");
  } finally {
    await close();
  }
});
