# devboxes-integration-fixture

## Statistics

A small, dependency-free statistics library. Every function is exported from `src/index.js`.

### sum

```js
import { sum } from "./src/index.js";

sum(2, 3); // 5
```

### mean

```js
mean([1, 2, 3, 4]); // 2.5
```

### median

```js
median([3, 1, 2]); // 2
median([4, 1, 3, 2]); // 2.5
```

### mode

```js
mode([1, 2, 2, 3]); // [2]
```

### variance

```js
variance([2, 4, 4, 4, 5, 5, 7, 9]); // 4 (population)
variance([2, 4, 4, 4, 5, 5, 7, 9], { sample: true }); // 4.571...
```

### stddev

```js
stddev([2, 4, 4, 4, 5, 5, 7, 9]); // 2 (population)
stddev([2, 4, 4, 4, 5, 5, 7, 9], { sample: true }); // 2.138...
```

### percentile

```js
percentile([1, 2, 3, 4], 50); // 2.5
```
