# devboxes-integration-fixture

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

Type a number into each field and the sum appears below them as you type. Decimals and negative numbers work, such as `2.5` and `-1`. Set `PORT` to use another port, such as `PORT=8080 npm start`.

## Tests and lint

Run the tests from the repository root with `npm test`, and check the code with `npm run lint`.
