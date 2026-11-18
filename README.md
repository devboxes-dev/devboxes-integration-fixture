# devboxes-integration-fixture

`bin/total.js` is a command-line script that prints an invoice total from an amount in whole cents.

## Usage

Print an invoice total from an amount in whole cents:

```sh
node bin/total.js 150         # prints 1.50
node bin/total.js -150        # prints -1.50
node bin/total.js 123456789   # prints 1,234,567.89
```

Amounts must be whole cents. Run it without one, or with something that is not a whole number — including a fractional amount such as `1.5` — and it prints how to use it and exits with a non-zero status.

## Sum page

Start a small local web page and open the printed URL:

```sh
npm start        # prints http://localhost:3000
```

Open the printed URL, such as `http://localhost:3000`, in a browser — the page works in any modern browser.

Type a number into each field and the sum appears below them as you type. Decimals and negative numbers work, such as `2.5` and `-1`. Set `PORT` to use another port, such as `PORT=8080 npm start`.

## Tests and lint

Install the development dependencies with `npm install`, then run the tests from the repository root with `npm test` and check the code with `npm run lint`.

## Browser check

Check that the page works in a real browser with:

```sh
npx playwright install --with-deps chromium   # once; needs root or sudo on Linux
npm run check:browser
```

It starts the page, types several pairs of numbers into the fields, and checks the sum shown for each. On Linux, `--with-deps` also installs the system libraries the browser needs. If you cannot install them that way, install them yourself or set `PLAYWRIGHT_CHROMIUM_PATH` to use a Chromium binary that Playwright did not download.
