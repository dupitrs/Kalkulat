let history = JSON.parse(localStorage.getItem('history')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateHistory();

    // klavene
    document.addEventListener('keydown', handleKeyboardInput);
});

function handleKeyboardInput(event) {
    const inputField = document.getElementById('inputField');

    if (event.key >= '0' && event.key <= '9') { 
        appendToInput(event.key);
    } else if (event.key === '.') { 
        appendToInput('.');
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') { 
        if (!isOperator(inputField.value.slice(-1))) {
            appendToInput(event.key);
        }
    } else if (event.key === 'Enter') { 
        calculate();
    } else if (event.key === 'Backspace') { 
        deleteLastCharacter();
    } else if (event.key === 'Escape') { 
        clearInput();
    }
}

function appendToInput(value) {
    const inputField = document.getElementById('inputField');
    inputField.value += value;
}

function isOperator(value) {
    return value === '+' || value === '-' || value === '*' || value === '/';
}

function deleteLastCharacter() {
    const inputField = document.getElementById('inputField');
    inputField.value = inputField.value.slice(0, -1); 
}

function clearInput() {
    const inputField = document.getElementById('inputField');
    inputField.value = '';
}

function calculate() {
    const inputField = document.getElementById('inputField');
    try {
        const result = eval(inputField.value);
        const expression = inputField.value;
        inputField.value = result;
        addToHistory(expression, result);
    } catch (error) {
        inputField.value = 'Error';
    }
}

function addToHistory(expression, result) {
    history.push({ expression, result });
    if (history.length > 5) {
        history.shift(); // Limit history to 3 items
    }
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; 

    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${entry.expression} = ${entry.result} 
        <button onclick="deleteHistoryEntry(${index})">Dzēst</button>`;
        historyList.appendChild(li);
    });
}

function deleteHistoryEntry(index) {
    history.splice(index, 1); 
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}

function clearHistory() {
    history = [];
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}
