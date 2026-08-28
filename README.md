# Session label

Public API for formatting a native session label with a title.

## `formatSessionLabel(label, title)`

Accepts only the labels `stable` and `native`. Trims and collapses whitespace in `title`, then returns `<label>: <title>`. Rejects unsupported labels and an empty normalized title.

```ts
import { formatSessionLabel } from "./src/session-label";

formatSessionLabel("stable", "Clear signal");
// => "stable: Clear signal"

formatSessionLabel("native", "Clear signal");
// => "native: Clear signal"

formatSessionLabel("stable", "  Hello   world  ");
// => "stable: Hello world"
```

## Tests

```sh
bun test
```
