let currentInput = '';
    let operator = '';
    let previousInput = '';
    let shouldResetDisplay = false;

    const calculator = document.getElementById('calculator');
    const calculationDisplay = document.getElementById('calculation');
    const resultDisplay = document.getElementById('result');
    const themeCheckbox = document.getElementById('checkbox');

    themeCheckbox.addEventListener('change', () => {
      calculator.classList.toggle('light');
      calculator.classList.toggle('dark');
    });

    function updateDisplay() {
      if (currentInput === '' && operator === '' && previousInput === '') {
        resultDisplay.textContent = '0';
        calculationDisplay.textContent = '';
      } else {
        const displayValue = currentInput || '0';
        resultDisplay.textContent = formatNumber(displayValue);

        if (previousInput && operator) {
          calculationDisplay.textContent = `${formatNumber(previousInput)} ${operator} ${formatNumber(currentInput)}`;
        } else {
          calculationDisplay.textContent = formatNumber(displayValue);
        }
      }
    }

    function formatNumber(num) {
      const number = parseFloat(num);
      return isNaN(number) ? num : number.toLocaleString();
    }

    function insertNumber(num) {
      if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
      }
      if (currentInput.length < 10) {
        currentInput = currentInput === '0' ? num : currentInput + num;
        updateDisplay();
      }
    }

    function insertOperator(op) {
      if (currentInput !== '' && previousInput !== '' && operator !== '') {
        calculate();
      }
      if (currentInput !== '') {
        previousInput = currentInput;
        currentInput = '';
      }
      operator = op === '*' ? '×' : op;
      shouldResetDisplay = false;
      updateDisplay();
    }

    function calculate() {
      if (previousInput !== '' && currentInput !== '' && operator !== '') {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch (operator) {
          case '+':
            result = prev + current;
            break;
          case '-':
            result = prev - current;
            break;
          case '×':
            result = prev * current;
            break;
          case '/':
            result = current !== 0 ? prev / current : 'Error';
            break;
          default:
            return;
        }

        if (result === 'Error') {
          resultDisplay.textContent = 'Error';
          calculationDisplay.textContent = '';
          currentInput = '';
          previousInput = '';
          operator = '';
        } else {
          currentInput = result.toString();
          previousInput = '';
          operator = '';
          shouldResetDisplay = true;
          calculationDisplay.textContent = `= ${formatNumber(result.toString())}`;
          resultDisplay.textContent = formatNumber(result.toString());
        }
      }
    }

    function clearAll() {
      currentInput = '';
      previousInput = '';
      operator = '';
      shouldResetDisplay = false;
      updateDisplay();
    }

    function clearEntry() {
      currentInput = '';
      updateDisplay();
    }

    document.addEventListener('keydown', (event) => {
      const key = event.key;
      if (key >= '0' && key <= '9') {
        insertNumber(key);
      } else if (key === '+') {
        insertOperator('+');
      } else if (key === '-') {
        insertOperator('-');
      } else if (key === '*') {
        insertOperator('*');
      } else if (key === '/') {
        event.preventDefault();
        insertOperator('/');
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key === 'Escape') {
        clearAll();
      } else if (key === 'Backspace') { 
        clearEntry();
      }
    });

    updateDisplay();
