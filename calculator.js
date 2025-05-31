const state = {
  displayString: "",
  firstNumber: null,
  secondNumber: null,
  operation: null,
  operatorHeld: false,
};

const resetState = () => {
  state.displayString = "";
  state.firstNumber = null;
  state.secondNumber = null;
  state.operation = null;
  state.operatorHeld = false;
};

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

const calculate = (operator, num1, num2) => {
  if (operator === "+") return add(num1, num2);
  if (operator === "-") return subtract(num1, num2);
  if (operator === "*") return multiply(num1, num2);
  if (operator === "/") return divide(num1, num2);
  else return "INVALID OPERATOR";
};

const updateDisplay = (displayString) => {
  const display = document.querySelector(".display");
  display.innerHTML = displayString;
};

const attachButtonListeners = () => {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("button--clear")) {
        resetState();
        updateDisplay(state.displayString);
      } else {
        if (state.operatorHeld) {
          if (!button.classList.contains("button--operator")) {
            state.displayString += button.innerHTML;
          } else if (button.innerHTML === "=") {
            state.secondNumber = Number(state.displayString);
            console.log(`Second number entered: ${state.secondNumber}`);
            const result = calculate(
              state.operation,
              state.firstNumber,
              state.secondNumber
            );
            console.log(`Result of calculation: ${result}`);
            state.displayString = result;
            updateDisplay(state.displayString);
          } else if (state.firstNumber && state.secondNumber) {
            console.log(
              "Second operator pressed while first two numbers saved."
            );
            state.firstNumber = calculate(
              state.operation,
              state.firstNumber,
              state.secondNumber
            );
            state.displayString = state.firstNumber;
          }
          updateDisplay(state.displayString);
        } else {
          // operatorHeld is FALSE
          if (button.classList.contains("button--operator")) {
            state.firstNumber = Number(state.displayString);
            console.log(`First number entered: ${state.firstNumber}`);
            state.displayString = button.innerHTML;
            state.operation = button.innerHTML;
            state.operatorHeld = true;
            updateDisplay(state.displayString);
            state.displayString = "";
          } else {
            state.displayString += button.innerHTML;
            updateDisplay(state.displayString);
          }
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
