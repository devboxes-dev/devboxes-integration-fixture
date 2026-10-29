/** Limits a value to the inclusive range from min to max. */
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
