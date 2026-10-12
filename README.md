# devboxes-integration-fixture

## Statistics

A dependency-free statistics library. Every function is a named export.

```js
import {
  sum,
  mean,
  median,
  mode,
  variance,
  stddev,
  percentile,
  quartiles,
  zscores,
  correlation,
  histogram,
} from "./src/index.js";

sum(2, 3); // 5
mean([1, 2, 3, 4]); // 2.5
median([3, 1, 2]); // 2
mode([3, 1, 3, 1, 2]); // [1, 3]
variance([2, 4, 4, 4, 5, 5, 7, 9]); // 4 (population)
variance([2, 4, 4, 4, 5, 5, 7, 9], { sample: true }); // 4.571428571428571
stddev([2, 4, 4, 4, 5, 5, 7, 9]); // 2
percentile([1, 2, 3, 4], 25); // 1.75
quartiles([1, 2, 3, 4, 5]); // { q1: 2, q2: 3, q3: 4, iqr: 2 }
zscores([1, 2, 3, 4, 5]); // [-1.414…, -0.707…, 0, 0.707…, 1.414…]
correlation([1, 2, 3], [2, 4, 6]); // 1
histogram([0, 1, 2, 3, 4], 2); // [{ start: 0, end: 2, count: 2 }, { start: 2, end: 4, count: 3 }]
```
