// Calculator State
let display = '0';
let previousValue = null;
let operation = null;
let waitingForOperand = false;

// DOM Elements
const displayElement = document.getElementById('display');
const operationIndicator = document.getElementById('operationIndicator');


function updateDisplay() {
    displayElement.textContent = display;
    
    if (operation && previousValue !== null) {
        operationIndicator.textContent = `${previousValue} ${operation}`;
    } else {
        operationIndicator.textContent = '';
    }
}

// Input Digit
function inputDigit(digit) {
    if (waitingForOperand) {
        display = String(digit);
        waitingForOperand = false;
    } else {
        display = display === '0' ? String(digit) : display + digit;
    }
    updateDisplay();
}

// Input Decimal
function inputDecimal() {
    if (waitingForOperand) {
        display = '0.';
        waitingForOperand = false;
    } else if (display.indexOf('.') === -1) {
        display = display + '.';
    }
    updateDisplay();
}

// Clear
function clear() {
    display = '0';
    previousValue = null;
    operation = null;
    waitingForOperand = false;
    updateDisplay();
}

// Backspace
function backspace() {
    if (display.length > 1) {
        display = display.slice(0, -1);
    } else {
        display = '0';
    }
    updateDisplay();
}

// Perform Operation
function performOperation(nextOperation) {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
        previousValue = inputValue;
    } else if (operation) {
        const currentValue = previousValue || 0;
        let newValue = currentValue;

        switch (operation) {
            case '+':
                newValue = currentValue + inputValue;
                break;
            case '-':
                newValue = currentValue - inputValue;
                break;
            case '×':
                newValue = currentValue * inputValue;
                break;
            case '÷':
                if (inputValue !== 0) {
                    newValue = currentValue / inputValue;
                } else {
                    display = 'Error';
                    previousValue = null;
                    operation = null;
                    waitingForOperand = true;
                    updateDisplay();
                    return;
                }
                break;
            default:
                break;
        }

        // Handle decimal precision
        const displayValue = String(newValue);
        const decimalIndex = displayValue.indexOf('.');
        if (decimalIndex !== -1 && displayValue.length - decimalIndex > 10) {
            newValue = parseFloat(newValue.toFixed(8));
        }

        display = String(newValue);
        previousValue = newValue;
    }

    waitingForOperand = true;
    operation = nextOperation;
    updateDisplay();
}

// Handle Button Click
function handleButtonClick(event) {
    const button = event.target;
    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
        case 'digit':
            inputDigit(parseInt(value, 10));
            break;
        case 'decimal':
            inputDecimal();
            break;
        case 'operation':
            performOperation(value);
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;
        default:
            break;
    }
}

// Handle Keyboard Press
function handleKeyPress(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        event.preventDefault();
        inputDigit(parseInt(key, 10));
    } else if (key === '.') {
        event.preventDefault();
        inputDecimal();
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        performOperation('=');
    } else if (key === '+' || key === '-') {
        event.preventDefault();
        performOperation(key);
    } else if (key === '*') {
        event.preventDefault();
        performOperation('×');
    } else if (key === '/') {
        event.preventDefault();
        performOperation('÷');
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        event.preventDefault();
        clear();
    } else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Button click listeners
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    // Keyboard listener
    document.addEventListener('keydown', handleKeyPress);

    // Initial display
    updateDisplay();
});