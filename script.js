// DOM ELEMENTS & CONSTANTS
const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const clear = document.querySelector(".clear");
const operators = document.querySelectorAll(".operator");
const del = document.querySelector(".delete");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");
const max = 10;

// VARIABLES
let num1 = null;
let currentInput = "";
let operator = null;
let justEvaluated = false;

// EVENT LISTENERS - KEYBOARD
window.addEventListener("keydown", (event) => {
  console.log(event.key);

  if (justEvaluated) {
    currentInput = "";
    justEvaluated = false;
  }

  if (currentInput === "Err") {
    currentInput = "";
  }

  if (currentInput === null || currentInput.length >= max) {
    return;
  }

  if ("0123456789".includes(event.key)) {
    currentInput += event.key;
    updateDisplay(currentInput);
  }

  function handleOperator(op) {
    if (num1 !== null && operator !== null && currentInput === "") return;

    if (num1 !== null && operator !== null && currentInput !== "") {
      const result = operate(num1, operator, currentInput);
      num1 = result;
      updateDisplay(result);
    }

    num1 = currentInput;
    currentInput = "";
    operator = op;
    console.log(operator);
    console.log(num1);
    updateDisplay(operator);
  }

  switch (event.key) {
    case ".":
      if (!currentInput.includes(".")) {
        currentInput += decimal.textContent;
        updateDisplay(currentInput);
      };
      break;

    case "/":
    case "*":
    case "-":
    case "+":
      handleOperator(event.key);
      break;

    case "Backspace":
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
      break;

    case "Enter":
      if (num1 !== null && operator !== null && currentInput !== "") {
        const result = operate(num1, operator, currentInput);

        if (result === "Why?" || result === "Err") {
          updateDisplay(result);
          num1 = null;
          operator = null;
          currentInput = "";
          justEvaluated = true;
          return;
        }

        currentInput = result;
        updateDisplay(result);
        num1 = null;
        operator = null;
        justEvaluated = true;
      }
      break;

    case "c":
    case "C":
      num1 = null;
      currentInput = "";
      operator = null;
      updateDisplay(currentInput);
      break;
  }
});

// EVENT LISTENERS - BUTTONS
numbers.forEach(button => {
  button.addEventListener("click", () => {
    console.log("input:", currentInput, "length:", currentInput?.length);

    if (justEvaluated || currentInput === "Err") {
      currentInput = "";
      justEvaluated = false;
    }

    if (currentInput === null || currentInput.length >= max) return;

    currentInput += button.textContent;
    updateDisplay(currentInput);
  });
});

decimal.addEventListener("click", () => {
  if (!currentInput.includes(".")) {
    currentInput += decimal.textContent;
    updateDisplay(currentInput);
  };
});

operators.forEach(button => {
  button.addEventListener("click", () => {
    if (num1 !== null && operator !== null && currentInput === "") return;

    if (num1 !== null && operator !== null && currentInput !== "") {
      const result = operate(num1, operator, currentInput);
      num1 = result;
      updateDisplay(result);
    }

    num1 = currentInput;
    currentInput = "";
    operator = button.textContent;
    console.log("operator:", operator);
    console.log("num1:", num1);
    updateDisplay(operator);
  });
});

del.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
});

clear.addEventListener("click", () => {
  num1 = null;
  currentInput = "";
  operator = null;
  updateDisplay(currentInput);
});

equal.addEventListener("click", () => {
  if (num1 !== null && operator !== null && currentInput !== "") {
    const result = operate(num1, operator, currentInput);

    if (result === "Why?" || result === "Err") {
      updateDisplay(result);
      num1 = null;
      operator = null;
      currentInput = "";
      justEvaluated = true;
      return;
    }

    currentInput = result;
    updateDisplay(result);
    num1 = null;
    operator = null;
    justEvaluated = true;
  }
});

// MATH FUNCTIONS
function add(a, b) {
  const ans = a + b;
  return !Number.isInteger(ans) ? parseFloat(ans.toFixed(2)) : ans;
}

function subtract(a, b) {
  const ans = a - b;
  return !Number.isInteger(ans) ? parseFloat(ans.toFixed(2)) : ans;
}

function multiply(a, b) {
  const ans = a * b;
  return !Number.isInteger(ans) ? parseFloat(ans.toFixed(2)) : ans;
}

function divide(a, b) {
  if (b === 0) return "Why?";
  const ans = a / b;
  return !Number.isInteger(ans) ? parseFloat(ans.toFixed(2)) : ans;
}

function operate(x, operator, y) {
  x = Number(x);
  y = Number(y);

  switch (operator) {
    case "+": return add(x, y);
    case "-": return subtract(x, y);
    case "*": return multiply(x, y);
    case "/": return divide(x, y);
    default: return "Err";
  }
}

// DISPLAY FUNCTION
function updateDisplay(text) {
  if (typeof text === "number" && text.toString().length > max) {
    display.textContent = text.toExponential(3);
  } else {
    display.textContent = text;
  }
}
