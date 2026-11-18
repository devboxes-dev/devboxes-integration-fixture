# devboxes-integration-fixture

## Usage

Print an invoice total from an amount in whole cents:

```sh
node bin/total.js 150         # prints 1.50
node bin/total.js -150        # prints -1.50
node bin/total.js 123456789   # prints 1,234,567.89
```

Amounts must be whole cents. Run it without one, or with something that is not a whole number — including a fractional amount such as `1.5` — and it prints how to use it and exits with a non-zero status.

## Showing a customer's currency

Pass `--currency` and/or `--locale` to show the total the way a customer in another country reads it:

```sh
node bin/total.js 123456 --currency USD --locale en-US   # prints $1,234.56
node bin/total.js 123456 --currency EUR --locale de-DE   # prints 1.234,56 €
node bin/total.js 123456 --currency JPY --locale ja-JP   # prints ￥123,456
```

The amount is already in that customer's currency: the tool formats it and does not convert it or use exchange rates. The amount is whole minor units of that currency — cents for USD and EUR, yen for JPY. With `--currency` but no `--locale`, the machine's default locale is used. With `--locale` but no `--currency`, the number is grouped and separated for that locale without a currency symbol. With neither option, the output is the same as above.

An unknown currency code, or a locale that is malformed or unknown, prints an error and exits with a non-zero status.
