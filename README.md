# devboxes-integration-fixture

## `validateFixturePath`

Validates an untrusted fixture path and returns a normalized relative POSIX path under the logical `fixtures/` root. It does not touch the filesystem or network.

```js
const { validateFixturePath } = require('./src/fixture-path');

validateFixturePath('fixtures/example.json');
// => 'fixtures/example.json'

validateFixturePath('example.json');
// => 'fixtures/example.json'
```

Invalid input throws `Error` with the message `invalid fixture path`. Rejected cases include:

- empty input
- absolute paths (`/etc/passwd`)
- `.` or `..` segments
- backslashes, NUL bytes, query strings, and fragments
- percent-encoded traversal (`%2e%2e`, `%2f`)
