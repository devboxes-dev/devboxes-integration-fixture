import { sumText } from "./src/display-sum.js";

const first = document.querySelector("#first");
const second = document.querySelector("#second");
const result = document.querySelector("#sum");
const clear = document.querySelector("#clear");

/** Shows the sum of both inputs, or a hint while they are incomplete. */
const updateSum = () => {
  const total = sumText(first.value, second.value);
  result.textContent = total === "" ? "Enter two numbers to see their sum." : total;
};

first.addEventListener("input", updateSum);
second.addEventListener("input", updateSum);
clear.addEventListener("click", () => {
  first.value = "";
  second.value = "";
  updateSum();
});
updateSum();
