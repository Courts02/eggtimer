let timerInterval;
let timerRemaining;
const timerEndSound = new Audio('alarm.wav');


function startTimer(seconds){
    clearInterval(timerInterval);
    timerRemaining = seconds;
    updateDisplay();

    timerInterval = setInterval(() => {
        timerRemaining--;
        updateDisplay();

        if(timerRemaining <= 0){
            clearInterval(timerInterval);
            
            timerEndSound.play();
            alert("Egg's ready!");
        }
    }, 1000);
}

function updateDisplay(){
    let minutes = Math.floor(timerRemaining / 60);
    let seconds = timerRemaining % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function cancelTimer(){
    clearInterval(timerInterval);
    timerRemaining = 0;
    updateDisplay();
}

document.getElementById("soft-boiled").addEventListener("click", () => startTimer(240));
document.getElementById("medium-boiled").addEventListener("click", () => startTimer(420)); 
document.getElementById("hard-boiled").addEventListener("click", () => startTimer(720));
document.getElementById("timer").addEventListener("click", cancelTimer) ;
