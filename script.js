const startStopButton = document.getElementById("start-stop")
const stopBtn = document.getElementById("stop");
const reset = document.getElementById("reset");

const minutesSpan = document.getElementById("js-minutes");
const secondsSpan = document.getElementById("js-seconds");
const timer = document.getElementById("mode-text");
const sessionsText = document.getElementById("sessions-text");
const progressBar = document.getElementById("js-progress");
const audio = document.getElementById("beep");
const modeButton = document.getElementsByClassName("mode-button")[0];

let pomodoro = 25;
let shortBreak = 5;
let longBreak = 15;
let longBreakInterval = 4;
let pomodoroCount = 0;
let currentMode = "pomodoro";
let remainingTime = pomodoro * 60;
let intervalId;

// Update timer display
const updateTimer = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    minutesSpan.textContent = minutes.toString().padStart(2, "0");
    secondsSpan.textContent = seconds.toString().padStart(2, "0");

    timer.textContent = `${currentMode} - ${currentMode === "pomodoro"
            ? pomodoroCount
            : pomodoroCount + 1
        }`;

    updateProgress();

    if (remainingTime <= 0) {
        if (currentMode === "pomodoro") {
            pomodoroCount++;
        }

        if (
            currentMode === "pomodoro" &&
            pomodoroCount % longBreakInterval === 0
        ) {
            currentMode = "long-break";
            remainingTime = longBreak * 60;
        } else {
            currentMode = "short-break";
            remainingTime = shortBreak * 60;
        }

        audio.play();

        updateProgress();
    }

    remainingTime--;
};

// Update progress bar
const updateProgress = () => {
    console.log(remainingTime)
    const percent = Math.round((remainingTime / 1500) * 100);
    updateCircularProgress(percent)
}

let time;

startStopButton.addEventListener('click', ev => {
    if (!time){
        modeButton.classList.add('active')
        startStopButton.disabled = true
        stopBtn.disabled = false
        time = setInterval(updateTimer, 1000);
    // updateTimer()
}
})

function stop() {
    if (time){
        clearInterval(time)
        startStopButton.disabled = false
        stopBtn.disabled = true


        modeButton.classList.remove('active')
        time = null;

    }
}
stopBtn.addEventListener('click', stop)
reset.addEventListener('click', () => {
    stop()
    remainingTime = pomodoro * 60;

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    minutesSpan.textContent = minutes.toString().padStart(2, "0");
    secondsSpan.textContent = seconds.toString().padStart(2, "0");

    timer.textContent = `${currentMode} - ${currentMode === "pomodoro"
            ? pomodoroCount
            : pomodoroCount + 1
        }`;

    updateProgress();
})

function updateCircularProgress(percentage) {
    const progressBar = document.querySelector('.circular-progress');
    const progressColor = progressBar.getAttribute('data-progress-color');
    const bgColor = progressBar.getAttribute('data-bg-color');
   
    // Calculate the degree for the conic gradient based on the percentage
    const degree = percentage * 3.6;
   
    // Update the progress bar's background
    progressBar.style.background = `conic-gradient(${progressColor} ${degree}deg, ${bgColor} 0deg)`;
   
   }