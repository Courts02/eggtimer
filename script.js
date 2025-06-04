let timerInterval = null;
let timerRemaining = 0;
let isPaused = false;
let timerReady = false;
const timerEndSound = new Audio('alarm.wav');

function setTimer(seconds) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerRemaining = seconds;
    isPaused = false;
    timerReady = true;
    updateDisplay();
}

function startTimer() {
    if (!timerReady || timerRemaining <= 0) return;

    clearInterval(timerInterval); // clear any old interval
    isPaused = false;
    timerInterval = setInterval(tick, 1000);
    timerReady = false; // we’ve started now
}

function tick() {
    if (isPaused || timerRemaining <= 0) return;

    timerRemaining--;
    updateDisplay();

    if (timerRemaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerEndSound.play();
        alert("Egg's ready!");
    }
}

function stopTimer() {
    isPaused = true;
    clearInterval(timerInterval);
    timerInterval = null;
}

function resumeTimer() {
    if (timerRemaining > 0 && isPaused) {
        isPaused = false;
        timerInterval = setInterval(tick, 1000);
    }
}

function cancelTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerRemaining = 0;
    isPaused = false;
    timerReady = false;
    updateDisplay();
}

function updateDisplay() {
    let minutes = Math.floor(timerRemaining / 60);
    let seconds = timerRemaining % 60;
    document.getElementById("timer").innerText =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// 🍳 Egg Type Buttons just SET the time now
document.getElementById("soft-boiled").addEventListener("click", () => setTimer(240));
document.getElementById("medium-boiled").addEventListener("click", () => setTimer(420));
document.getElementById("hard-boiled").addEventListener("click", () => setTimer(720));

// 🕹 Start and Stop Controls
document.getElementById("start-btn").addEventListener("click", () => {
    if (isPaused) {
        resumeTimer();
    } else {
        startTimer();
    }
});
document.getElementById("stop-btn").addEventListener("click", stopTimer);
document.getElementById("timer").addEventListener("click", cancelTimer);
