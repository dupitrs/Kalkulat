let history = JSON.parse(localStorage.getItem('history')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateHistory();
});

function appendToInput(value) {
    const inputField = document.getElementById('inputField');
    inputField.value += value;
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
    if (history.length > 3) {
        history.shift(); 
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
