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

let displayString = "";
let firstNumber = "";
let secondNumber = "";
let operation = "";
let operationHeld = false;

const updateDisplay = (displayString) => {
  const display = document.querySelector(".display");
  display.innerHTML = displayString;
};

const attachButtonListeners = () => {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (operationHeld) {
        console.log(`Operation stored: ${operation}`);
        if (button.className !== "button button--operator") {
          displayString += button.innerHTML;
        } else if (button.innerHTML === "=") {
          secondNumber = displayString;
          console.log(`Second number entered: ${secondNumber}`);
        } else {
          alert(
            "An operator is already stored. Either add more digits or press the '=' key."
          );
        }
        updateDisplay(displayString);
      } else {
        if (button.className === "button button--operator") {
          firstNumber = displayString;
          console.log(`First number entered: ${firstNumber}`);
          displayString = button.innerHTML;
          operation = button.innerHTML;
          operationHeld = true;
          updateDisplay(displayString);
          displayString = "";
        } else {
          displayString += button.innerHTML;
          updateDisplay(displayString);
        }
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  attachButtonListeners();
});

/*
    alert(operate("+", 2, 3));
    alert(operate("-", 5, 2));
    alert(operate("*", 4, 3));
    alert(operate("/", 8, 2));
    alert(operate("/", 8, 0)); // should return undefined
    alert(operate("x", 8, 2)); // should return "INVALID OPERATOR"
    // Test cases
*/
