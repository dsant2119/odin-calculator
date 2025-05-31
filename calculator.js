console.log("Hello world!");

//  CREATE ADD SUBTRACT MULTIPLY DIVIDE FUNCTIONS

const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  if (num2 === 0) return undefined;
  else return num1 / num2;
};

const operate = (operator, num1, num2) => {
  if (operator === "+") return add(num1, num2);
  if (operator === "-") return subtract(num1, num2);
  if (operator === "*") return multiply(num1, num2);
  if (operator === "/") return divide(num1, num2);
  else return "INVALID OPERATOR";
};

let displayString = "0";

const updateDisplay = (displayString) => {
  const display = document.querySelector(".item display");
  display.innerHTML = displayString;
};

/*
    alert(operate("+", 2, 3));
    alert(operate("-", 5, 2));
    alert(operate("*", 4, 3));
    alert(operate("/", 8, 2));
    alert(operate("/", 8, 0)); // should return undefined
    alert(operate("x", 8, 2)); // should return "INVALID OPERATOR"
    // Test cases
*/
