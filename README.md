# devboxes-integration-fixture

Safe fixture-path validation for normalized relative POSIX paths that stay
within a logical fixtures root. The validator does not access the filesystem
or network.

## `validateFixturePath(value)`

```js
const { validateFixturePath } = require('./src/fixture-path.js');

validateFixturePath('fixtures/sample.js'); // true
validateFixturePath('../etc/passwd'); // false
```

Returns `true` only for a non-empty normalized relative POSIX path (slash
separators, no empty / `.` / `..` segments). Returns `false` otherwise.

### Accepted examples

- `example.json`
- `nested/dir/file.txt`
- `fixtures/sample.js`
- `a-b_c.d`

### Rejected examples

- `` (empty)
- `/etc/passwd` (absolute path)
- `C:/windows/system32` (absolute Windows path)
- `.` / `./file.json` / `foo/./bar` (dot segments)
- `..` / `foo/../bar` / `../fixtures/x` (dot-dot segments)
- `foo\bar` (backslashes)
- `foo\0bar` (NUL bytes)
- `foo.json?x=1` (query strings)
- `foo.json#section` (fragments)
- `foo/%2e%2e/bar`, `%2e%2e/etc/passwd`, `foo%2fbar` (percent-encoded traversal)
- `foo//bar`, `foo/` (not normalized)

## Test

```sh
npm test
```
