const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");
const pomoButton = document.querySelector("#pomoButton");
const shortBreakButton = document.querySelector("#shortBreakButton");
const longBreakButton = document.querySelector("#longBreakButton");
const timer = document.querySelector("#timer");

const pomoTime = [25]; 
const shortBreakTime = [5];
const longBreakTime = [10];

window.addEventListener('load', (event) => {
    start.addEventListener('click', function () {
        timeToCount(pomoTime[0]);
    });

    stop.addEventListener('click', function () {

    });

    reset.addEventListener('click', function () {

    });

    pomoButton.addEventListener('click', function() {

    });

    shortBreakButton.addEventListener('click', function () {

    });

    longBreakButton.addEventListener('click', function() {

    });
});

let timeStart = new Date();

function updateTime() {
    timeStart = new Date();
}

function timeToCount(min) {
    updateTime();
    timerText(min, 0);
    let timer = setInterval(() => {
        let d = new Date();
        timerText(min, (d % timeStart));
        if ((d % timeStart) >= (min * 60000)) {
            clearInterval(timer);
        }
    }, 1000)
}

function timerText(targetTime, timeElapsed) {
    targetTime *= 60000;
    let timeToPrint = targetTime - timeElapsed;
    if (timeToPrint < 1) {
        timeToPrint = 0;
    }
    timer.textContent = msToMinSec(timeToPrint);
}

function msToMinSec(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}




