class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperandTextElement.innerText = "";
    this.previousOperandTextElement.innerText = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperandTextElement.innerText = this.currentOperandTextElement.innerText.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperandTextElement.innerText.includes(".")) {
      return;
    }
    this.currentOperandTextElement.innerText += number;
  }

  chooseOperation(operation) {
    if (this.currentOperandTextElement.innerText === "") {
      return;
    }
    if (this.previousOperandTextElement.innerText !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperandTextElement.innerText = this.currentOperandTextElement.innerText;
    this.currentOperandTextElement.innerText = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperandTextElement.innerText);
    const current = parseFloat(this.currentOperandTextElement.innerText);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    switch (this.operation) {
      case "/":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "+":
        computation = prev + current;
        break;
      default:
        return;
    }
    this.currentOperandTextElement.innerText = computation.toString();
    this.operation = undefined;
    this.previousOperandTextElement.innerText = "";
  }
  
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperandTextElement.innerText;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${parseFloat(this.previousOperandTextElement.innerText)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});