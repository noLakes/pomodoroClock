const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");
const pomoButton = document.querySelector("#pomoButton");
const shortBreakButton = document.querySelector("#shortBreakButton");
const longBreakButton = document.querySelector("#longBreakButton");
const timer = document.querySelector("#timer");
const timerModes = document.querySelector("#timerModes");
const alarm = document.querySelector("#alarm");
const settings = document.querySelector("#settings");

const pomoTime = [25]; 
const shortBreakTime = [5];
const longBreakTime = [10];

window.addEventListener('load', (event) => {
    start.addEventListener('click', function () {
        if (timeLeft != null && stopped == true) {
            timeToCount(timeLeft / 60000);
        }
        else if (stopped == true && lastCall == null) {
            setActive(pomoButton);
            timeToCount(pomoTime[0]);
        }
    });

    stop.addEventListener('click', function () {
        if (clock != null) {
            clearInterval(clock);
            stopped = true;
        }
    });

    reset.addEventListener('click', function () {
        if (lastCall != null) {
            timeToCount(lastCall);
        }
    });
    
    pomoButton.addEventListener('click', function() {
        if (this.className != 'active') {
            setActive(this);
            timeToCount(pomoTime[0]);
            lastCall = pomoTime[0];
        }
    });

    shortBreakButton.addEventListener('click', function () {
        if (this.className != 'active') {
            setActive(this);
            timeToCount(shortBreakTime[0]);
            lastCall = shortBreakTime[0];
        }
    });

    longBreakButton.addEventListener('click', function() {
        if (this.className != 'active') {
            setActive(this);
            timeToCount(longBreakTime[0]);
            lastCall = longBreakTime[0];
        }
    });
});

let timeStart = null;
let clock = null; 
let timeLeft = null;
let lastCall = null;
let stopped = true;

function updateTime() {
    timeStart = new Date();
}

function timeToCount(min) {
    if (clock != null) {clearTimer()};
    updateTime();
    timerText(min, 0);
    stopped = false;
    clock = setInterval(() => {
        let d = new Date();
        timerText(min, (d % timeStart));
        if ((d % timeStart) >= (min * 60000)) {
            clearTimer();
            alarm.play();
        }
    }, 1000)
}

function clearTimer() {
    if (clock != null) {
        clearInterval(clock);
        clearTimeout(clock);
        clock = null;
        timeLeft = null;
        stopped = true;
    }
}

function timerText(targetTime, timeElapsed) {
    targetTime *= 60000;
    let timeToPrint = targetTime - timeElapsed;
    if (timeToPrint < 1) {
        timeToPrint = 0;
    }
    timer.textContent = msToMinSec(timeToPrint);
    timeLeft = timeToPrint;
}

function msToMinSec(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}

function setActive(x) {
    pomoButton.style.backgroundColor = '';
    pomoButton.setAttribute('class', 'inactive');
    shortBreakButton.style.backgroundColor = '';
    shortBreakButton.setAttribute('class', 'inactive');
    longBreakButton.style.backgroundColor = '';
    longBreakButton.setAttribute('class', 'inactive');
    x.style.backgroundColor = "#0048bd";
    x.setAttribute('class', 'active');
}





