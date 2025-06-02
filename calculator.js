const state = {
  displayString: "",
  firstNumber: null,
  secondNumber: null,
  operation: null,
  operatorHeld: false,
  numDigits: 8,
};

const resetState = () => {
  state.displayString = "";
  state.firstNumber = null;
  state.secondNumber = null;
  state.operation = null;
  state.operatorHeld = false;
};

const isDigit = (btn) => btn.id.includes("digit");

const isOperator = (btn) => btn.id.includes("op");

const isEquals = (btn) => btn.id.includes("equals");

const isClear = (btn) => btn.id.includes("clear");

const isDelete = (btn) => btn.id.includes("delete");

const isDecimalButton = (btn) => btn.innerHTML.includes(".");

const alreadyHasDecimal = () => state.displayString.includes(".");

const shouldBlockDecimal = (btn) => {
  return alreadyHasDecimal() && isDecimalButton(btn);
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
  if (operator === "+") return Number(add(num1, num2).toFixed(state.numDigits));
  if (operator === "-")
    return Number(subtract(num1, num2).toFixed(state.numDigits));
  if (operator === "*")
    return Number(multiply(num1, num2).toFixed(state.numDigits));
  if (operator === "/")
    return Number(divide(num1, num2).toFixed(state.numDigits));
  else return "INVALID OPERATOR";
};

const updateDisplay = (displayString) => {
  const display = document.querySelector(".display");
  display.innerHTML = displayString;
};

const runCalculation = () => {
  state.firstNumber = calculate(
    state.operation,
    state.firstNumber,
    state.secondNumber
  );
};

const handleButtonClick = (btn) => {
  if (isClear(btn)) {
    resetState();
    updateDisplay(state.displayString);
  } else if (isDelete(btn)) {
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
    if (state.firstNumber !== null && state.operatorHeld) {
      console.log("Operator held");
      if (isDigit(btn)) {
        if (shouldBlockDecimal(btn)) {
          console.log("Decimal point already used");
        } else {
          state.displayString += btn.innerHTML;
          updateDisplay(state.displayString);
        }
      } else if (isEquals(btn)) {
        state.secondNumber = Number(state.displayString);
        console.log(`Second number entered: ${state.secondNumber}`);
        state.operatorHeld = false;
        console.log("Equals pressed. Held operator cleared");
        runCalculation();
        console.log(`Result of calculation: ${state.firstNumber}`);
        state.displayString = state.firstNumber;
        updateDisplay(state.displayString);
        state.displayString = "";
      } else if (isOperator(btn)) {
        state.secondNumber = Number(state.displayString);
        runCalculation();
        console.log(`Updating firstNumber: ${state.firstNumber}`);
        state.displayString = btn.innerHTML;
        state.operation = btn.innerHTML;
        console.log(`Operator set as: ${state.operation}`);
        updateDisplay(state.displayString);
        state.displayString = "";
      }
    } else {
      // operatorHeld is FALSE
      if (state.displayString !== "" && isOperator(btn)) {
        state.firstNumber = Number(state.displayString);
        console.log(`First number entered: ${state.firstNumber}`);
        state.displayString = btn.innerHTML;
        state.operation = btn.innerHTML;
        console.log(`Operator set as: ${state.operation}`);
        state.operatorHeld = true;
        updateDisplay(state.displayString);
        state.displayString = "";
      } else if (isDigit(btn)) {
        if (shouldBlockDecimal(btn))
          console.log("Only one decimal point allowed!");
        else {
          state.displayString += btn.innerHTML;
          updateDisplay(state.displayString);
        }
      }
    }
  }
};

const attachButtonListeners = () => {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => handleButtonClick(button));
  });
};

const attachKeyboardListeners = () => {
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if ((key >= "0" && key <= "9") || key === ".") {
      const simulatedButton = { id: "digit", innerHTML: key };
      handleButtonClick(simulatedButton);
    } else if (["+", "-", "*", "/"].includes(key)) {
      const simulatedButton = { id: "op", innerHTML: key };
      handleButtonClick(simulatedButton);
    } else if (key === "Enter" || key === "=") {
      const buttonEl = document.querySelector("#equals");
      if (buttonEl) handleButtonClick(buttonEl);
    } else if (key === "Backspace") {
      const simulatedButton = { id: "delete" };
      handleButtonClick(simulatedButton);
    } else if (key === "Escape") {
      const simulatedButton = { id: "clear" };
      handleButtonClick(simulatedButton);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  attachButtonListeners();
  attachKeyboardListeners();
});
