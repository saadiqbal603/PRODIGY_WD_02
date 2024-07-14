let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

function startStopwatch() {
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTime, 10);
  startStopBtn.textContent = "Pause";
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  updatedTime = new Date().getTime();
  difference += updatedTime - startTime;
  startStopBtn.textContent = "Start";
}

function resetStopwatch() {
  clearInterval(timerInterval);
  display.textContent = "00:00:00";
  difference = 0;
  running = false;
  startStopBtn.textContent = "Start";
  lapList.innerHTML = "";
  lapCounter = 0;
}

function updateTime() {
  updatedTime = new Date().getTime();
  const currentTime = difference + updatedTime - startTime;

  const hours = Math.floor(
    (currentTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((currentTime % 1000) / 10);

  display.textContent =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00");
}

function toggleStopwatch() {
  if (!running) {
    startStopwatch();
  } else {
    pauseStopwatch();
  }
  running = !running;
}

function recordLap() {
  if (running) {
    lapCounter++;
    const lapTime = display.textContent;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
}

startStopBtn.addEventListener("click", toggleStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);

resetStopwatch();
