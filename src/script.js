"use strict";

let countdown;

const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  //clear any existing timers
  clearInterval(countdown);
  const now = Date.now();
  const future = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(future);

  console.log(seconds);
  countdown = setInterval(() => {
    const newNow = Date.now();
    const secondsLeft = Math.round((future - newNow) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemain = seconds % 60;

  const display = `${minutes < 10 ? "0" : ""}${minutes}:${
    secondsRemain < 10 ? "0" : ""
  }${secondsRemain}`;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  const amPM = hour > 12 ? "PM" : "AM";
  endTime.textContent = `Be Back At ${adjustedHour}: ${
    minutes < 10 ? "0" : ""
  }${minutes} ${amPM}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);

  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);

  this.reset();
});