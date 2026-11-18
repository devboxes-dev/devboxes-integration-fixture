# devboxes-integration-fixture

## Usage

Print an invoice total from an amount in whole cents:

```sh
node bin/total.js 150         # prints 1.50
node bin/total.js -150        # prints -1.50
node bin/total.js 123456789   # prints 1,234,567.89
```

Amounts must be whole cents. Run it without one, or with something that is not a whole number — including a fractional amount such as `1.5` — and it prints how to use it and exits with a non-zero status.

## Tests and lint

Run the tests from the repository root with `npm test`, and check the code with `npm run lint`.
