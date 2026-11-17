# devboxes-integration-fixture

## Usage

Print an invoice total from an amount in cents:

```sh
node bin/total.js 150   # prints 1.50
node bin/total.js -150  # prints -1.50
```

Run it without a number, or with something that is not a number, and it prints how to use it and exits with a non-zero status.
