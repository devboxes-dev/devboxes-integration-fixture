const assertNumbers = (...args) => {
  for (const arg of args) {
    if (typeof arg !== "number") {
      throw new TypeError(`Expected a number but received ${typeof arg}`);
    }
  }
};

export const sum = (a, b) => {
  assertNumbers(a, b);
  return a + b;
};
export const multiply = (a, b) => {
  assertNumbers(a, b);
  return a * b;
};
