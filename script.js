let currentoperator = '';
let currentNumber = '';
let previousNumber = '';

const body = document.querySelector('body')
const numberButtons = document.querySelectorAll('.number')
const previousNumberDisplay = document.querySelector('.user-input')
const currentNumberDisplay = document.querySelector('.answer')
const equal = document.querySelector('.equal')
const operatorButtons = document.querySelectorAll('.operator')
const decimalbutton = document.querySelector('.decimal')
const clear = document.querySelectorAll('.clear')
const swap = document.querySelector('.swap')

body.addEventListener('keypress', (e) => keyboardControl(e.key))

swap.addEventListener('click', (e) => swapNum(e))

operatorButtons.forEach(operator => {
    operator.addEventListener('click', (e) => operatorHandler(e.target.textContent))
})

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => numberHandler(e.target.textContent))
})

equal.addEventListener('click', e => evaluate())

decimalbutton.addEventListener('click', e => AddDecimal())

clear.forEach(clear => {
    clear.addEventListener('click', e => clearCalc(e.target.id))
})

function numberHandler(number) {
    number = number.toString();
    currentNumber = currentNumber + number
    updatecalculator()
}

function operatorHandler(operator) {
    currentoperator = operator
    if (currentNumber != '') {
        previousNumber = currentNumber;
        currentNumber = '';
    }
    updatecalculator()
}

function evaluate() {
    previousNumber = Number(previousNumber)
    currentNumber = Number(currentNumber)
    if (currentNumber && currentoperator && previousNumber != '') {
        switch(currentoperator) {
            case('+'):
            previousNumber += currentNumber
            break;
            case('-'):
            previousNumber -= currentNumber
            break;
            case('x'):
            previousNumber *= currentNumber
            break;
            case('÷'):
            previousNumber = previousNumber / currentNumber
            break;
            case('%'):
            previousNumber = currentNumber * (previousNumber / 100)
            break;
        }
        previousNumber = roundNumber(previousNumber);
        previousNumber = previousNumber.toString();
        displayResults();
    }
}


function updatecalculator() {
    currentNumber.length <= 11 ? currentNumberDisplay.textContent = currentNumber : alert("number to bigg")
        previousNumberDisplay.textContent = `${previousNumber} ${currentoperator}`
}

function clearCalc(cleartype) {
    if(cleartype == 'allclear') {
        currentNumber = '';
        currentoperator = '';
        previousNumber = '';
    } else {
        currentNumber = '';
    }
    updatecalculator()
}

function swapNum(e) {
    if (currentNumber != '')
    currentNumber = Number(currentNumber) * -1
    currentNumber = currentNumber.toString();
    updatecalculator()
}

function roundNumber(number) {
    return Math.round(previousNumber * 1000) / 1000
}

function AddDecimal() {
    if (!currentNumber.includes(".")) {
        currentNumber += ".";
        currentNumberDisplay.textContent = currentNumber;
      }
}

function displayResults() {
    if (previousNumber.length <= 11) {
      currentNumberDisplay.textContent = previousNumber;
    } else {
      currentNumberDisplay.textContent = previousNumber.slice(0, 11) + "...";
    }
    previousNumberDisplay.textContent = "";
    currentoperator = "";
    currentNumber = "";
  }

  function keyboardControl(keypressed) {
    if (keypressed >= 0 && keypressed <= 9) {
        numberHandler(keypressed.toString())
    }else if (keypressed == '.') {
        AddDecimal()
    } else if (keypressed == 'Enter' && currentNumber != '' && previousNumber != '') {
        evaluate()
    } else if (keypressed == 'Delete') {
        clearCalc(clear)
    } else if (keypressed == "-" || keypressed == '+' || keypressed == '/' || keypressed == '%') {
        operatorHandler(keypressed)
    } else if (keypressed == '*') {
        operatorHandler('x')
    }
}






