const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const clear = document.querySelector(".clear");
const operators = document.querySelectorAll(".operator");
const del = document.querySelector(".delete")
const equal = document.querySelector(".equal");

let num1 = null;
let currentInput = "";
let operator = null;

numbers.forEach(button => {
  button.addEventListener("click", () => {
    currentInput += button.textContent;
    console.log(currentInput);
    updateDisplay(currentInput);
  });
});

operators.forEach(button => {
  button.addEventListener("click", () => {
    num1 = currentInput;
    currentInput = "";
    operator = button.textContent;
    console.log(operator);
    console.log(num1);
    updateDisplay(operator);
  })
});

clear.addEventListener("click", () => {
  currentInput = "";
  operator = "";
  num1 = ""
  updateDisplay(currentInput);
});

equal.addEventListener("click", () => {
  const result = operate(num1, operator, currentInput)
  updateDisplay(result);
});


function add(a, b) {
  return a + b;
};

function subtract(a, b) {
  return a - b
};

function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by 0"
  }
  return a / b;
};

function operate(x, operator, y) {
  Number(x);
  Number(y);

  switch (operator) {
    case "+": 
      return add(x, y);

    case "-": 
      return subtract(x, y);

    case "*": 
    return multiply(x, y);

    case "/": 
      return divide(x, y);

    default:
      return "Invalid operator";
  }
}

function updateDisplay(text) {
  display.textContent = text;
}

//updateDisplay("123") // Remember to cap at 12 numbers total so you dont overflow screen.
// console.log(add(4, 8));
// console.log(subtract(8, 4));
// console.log(multiply(4, 8));
// console.log(divide(8, 4));


// let x = Number(prompt("Choose num"));
// console.log(x);
// let oper = "+";
// let y = Number(prompt("Choose num"));

// console.log(operate(x, oper, y));