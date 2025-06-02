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
  if (num2 === 0) return "UNDEFINED";
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
      if (button.id.includes("clear")) {
        resetState();
        updateDisplay(state.displayString);
      } else if (button.id.includes("delete")) {
        //  Delete last symbol appended
        if (state.displayString) {
          console.log("DELETING");
          state.displayString = state.displayString.substring(
            0,
            state.displayString.length - 1
          );
        }
        updateDisplay(state.displayString);
      } else {
        if (state.firstNumber && state.operatorHeld) {
          console.log("Operator held");
          if (button.id.includes("digit")) {
            state.displayString += button.innerHTML;
            updateDisplay(state.displayString);
          } else if (button.id.includes("equals")) {
            state.secondNumber = Number(state.displayString);
            console.log(`Second number entered: ${state.secondNumber}`);
            state.operatorHeld = false;
            console.log("Equals pressed. Held operator cleared");
            state.firstNumber = calculate(
              state.operation,
              state.firstNumber,
              state.secondNumber
            );
            console.log(`Result of calculation: ${state.firstNumber}`);
            state.displayString = state.firstNumber;
            updateDisplay(state.displayString);
            state.displayString = "";
          } else if (
            !button.id.includes("equals") &&
            button.id.includes("op")
          ) {
            state.secondNumber = Number(state.displayString);
            state.firstNumber = calculate(
              state.operation,
              state.firstNumber,
              state.secondNumber
            );
            console.log(`Updating firstNumber: ${state.firstNumber}`);
            state.displayString = button.innerHTML;
            state.operation = button.innerHTML;
            console.log(`Operator set as: ${state.operation}`);
            updateDisplay(state.displayString);
            state.displayString = "";
          }
        } else {
          // operatorHeld is FALSE
          if (state.displayString !== "" && button.id.includes("op")) {
            state.firstNumber = Number(state.displayString);
            console.log(`First number entered: ${state.firstNumber}`);
            state.displayString = button.innerHTML;
            state.operation = button.innerHTML;
            console.log(`Operator set as: ${state.operation}`);
            state.operatorHeld = true;
            updateDisplay(state.displayString);
            state.displayString = "";
          } else if (button.id.includes("digit")) {
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
