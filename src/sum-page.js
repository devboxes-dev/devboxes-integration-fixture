import { sum } from "./sum.js";

/** Returns the sum of two input values as text, or "" until both are numbers. */
export const sumText = (a, b) => {
  if (String(a).trim() === "" || String(b).trim() === "") {
    return "";
  }
  const total = sum(a, b);
  return Number.isFinite(total) ? String(total) : "";
};

/** Shows the sum of the two inputs whenever either one changes. */
export const wire = (root = document) => {
  const a = root.querySelector("#a");
  const b = root.querySelector("#b");
  const output = root.querySelector("#sum");
  const update = () => {
    output.textContent = sumText(a.value, b.value);
  };
  a.addEventListener("input", update);
  b.addEventListener("input", update);
  update();
  return update;
};
