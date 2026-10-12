import { variance } from "./variance.js";

export const stddev = (values, options) => Math.sqrt(variance(values, options));
