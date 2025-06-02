let display = document.querySelector(".display");
let number = document.querySelector(".number");
let clear = document.querySelector(".clear");
let operator = document.querySelector(".operator");
let equal = document.querySelector(".equal");
let num1;
let num2;
let sign;

number.addEventListener("click", () => {
  let num = parseInt("123");
  updateDisplay(num);
});

clear.addEventListener("click", () => {
  updateDisplay("");
});

operator.addEventListener("click", () => {
  updateDisplay("+")
});

equal.addEventListener("click", () => {
  operate(num1, sign, num2)
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
  return a * b;
};

function operate() {
  return;
}

function updateDisplay(text) {
  display.textContent = text;
}

//updateDisplay("123") // Remember to cap at 12 numbers total so you dont overflow screen.
console.log(add(4, 8));
console.log(subtract(8, 4));
console.log(multiply(4, 8));
console.log(divide(8, 4));