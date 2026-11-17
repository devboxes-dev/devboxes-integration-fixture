# devboxes-integration-fixture

## Usage

Print an invoice total from an amount in whole cents:

```sh
node bin/total.js 150   # prints 1.50
node bin/total.js -150  # prints -1.50
```

Amounts must be whole cents. Run it without one, or with something that is not a whole number — including a fractional amount such as `1.5` — and it prints how to use it and exits with a non-zero status.

## Web page

`index.html` adds two numbers as you type them. It has no build step, so serve the repository over HTTP and open it:

```sh
npm install   # once, for the browser test
npm start     # prints the page URL, http://localhost:3000 by default
```

Type a number into each field and the sum updates as you type. Set `PORT` to serve on a different port, such as `PORT=8080 npm start`.

`npm test` also opens the page in headless Chromium and checks the sum for whole numbers, decimals, negatives and an unfinished entry. Install that browser once with:

```sh
npx playwright install chromium
```
