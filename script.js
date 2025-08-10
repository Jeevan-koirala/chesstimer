let defaultTime = 300; 
let time1 = defaultTime;
let time2 = defaultTime;
let active = 1;
let interval = null;
let paused = false;

const timeDisplay1 = document.getElementById("time1");
const timeDisplay2 = document.getElementById("time2");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const timeSelect = document.getElementById("timeSelect");

function format(time) {
  const min = Math.floor(time / 60).toString().padStart(2, "0");
  const sec = (time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

function tickAnimation(clockElement) {
  clockElement.classList.add("tick");
  setTimeout(() => clockElement.classList.remove("tick"), 150);
}

function update() {
  timeDisplay1.textContent = format(time1);
  timeDisplay2.textContent = format(time2);
}

function startTimer() {
  if (interval || paused) return;
  interval = setInterval(() => {
    if (active === 1 && time1 > 0) {
      time1--;
      tickAnimation(timeDisplay1);
    } else if (active === 2 && time2 > 0) {
      time2--;
      tickAnimation(timeDisplay2);
    }
    update();
    if (time1 <= 0 || time2 <= 0) clearInterval(interval);
  }, 1000);
}

function switchPlayer() {
  if (paused) return;
  clearInterval(interval);
  interval = null;
  active = active === 1 ? 2 : 1;
  player1.classList.toggle("active", active === 1);
  player2.classList.toggle("active", active === 2);
  startTimer();
}

player1.addEventListener("click", () => {
  if (active === 1) switchPlayer();
});
player2.addEventListener("click", () => {
  if (active === 2) switchPlayer();
});

pauseBtn.addEventListener("click", () => {
  if (!paused) {
    paused = true;
    clearInterval(interval);
    interval = null;
    pauseBtn.textContent = "▶️ Resume";
  } else {
    paused = false;
    pauseBtn.textContent = "⏸️ Pause";
    startTimer();
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  paused = false;
  pauseBtn.textContent = "⏸️ Pause";

  defaultTime = parseInt(timeSelect.value) * 60;
  time1 = time2 = defaultTime;
  active = 1;

  player1.classList.add("active");
  player2.classList.remove("active");
  update();
});

timeSelect.addEventListener("change", () => {
  defaultTime = parseInt(timeSelect.value) * 60;
  time1 = time2 = defaultTime;
  update();
});

update(); 
