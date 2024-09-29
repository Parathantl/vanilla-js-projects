const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A journey of a thousand miles begins with a single step.",
    "Fortune favors the brave.",
    "Actions speak louder than words.",
    "Every cloud has a silver lining.",
    "Practice makes perfect."
];

let timer;
let startTime;
let quoteLength;
let inputCharacters;

const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const startBtn = document.getElementById('startBtn');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');

startBtn.addEventListener('click', startGame);

function startGame() {
    startBtn.disabled = true;
    quoteInputElement.disabled = false;
    quoteInputElement.focus();
    resetValues();
    
    const quote = getRandomQuote();
    displayQuote(quote);
    
    quoteInputElement.addEventListener('input', handleTyping);
}

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayQuote(quote) {
    quoteDisplayElement.textContent = '';
    quote.split('').forEach(character => {
        const span = document.createElement('span');
        span.innerText = character;
        quoteDisplayElement.appendChild(span);
    });
    
    quoteLength = quote.length;
    inputCharacters = 0;
    startTimer();
}

function startTimer() {
    startTime = new Date();
    timer = setInterval(() => {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        timerElement.textContent = elapsedTime;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function handleTyping() {
    const quoteArray = quoteDisplayElement.querySelectorAll('span');
    const inputArray = quoteInputElement.value.split('');
    
    inputCharacters = inputArray.length;
    
    let correctCharacters = 0;
    quoteArray.forEach((characterSpan, index) => {
        const character = inputArray[index];
        
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
            correctCharacters++;
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
        }
    });
    
    // Check if the typing is complete
    if (inputArray.length === quoteArray.length) {
        stopTimer();
        calculateWPM();
        calculateAccuracy(correctCharacters);
        quoteInputElement.disabled = true;
        startBtn.disabled = false;
    }
}

function calculateWPM() {
    const elapsedTimeInSeconds = (new Date() - startTime) / 1000;
    const wordsTyped = inputCharacters / 5;
    const wordsPerMinute = Math.floor((wordsTyped / elapsedTimeInSeconds) * 60);
    wpmElement.textContent = wordsPerMinute;
}

function calculateAccuracy(correctCharacters) {
    const accuracy = Math.floor((correctCharacters / quoteLength) * 100);
    accuracyElement.textContent = accuracy;
}

function resetValues() {
    timerElement.textContent = '0';
    wpmElement.textContent = '0';
    accuracyElement.textContent = '0';
    quoteInputElement.value = '';
}
