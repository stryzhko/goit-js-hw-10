// Import library
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    inputDatePicker : document.querySelector('#datetime-picker'),
    btnStart : document.querySelector('[data-start]'),
    days : document.querySelector('[data-days]'),
    hours : document.querySelector('[data-hours]'),
    minutes : document.querySelector('[data-minutes]'),
    seconds : document.querySelector('[data-seconds]'),
};

let timeDifference = 0;
let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
  },
};

refs.btnStart.setAttribute('disabled', true);

flatpickr(refs.inputDatePicker, options);

refs.btnStart.addEventListener('click', onBtnStart);
// Reset timer on btn
window.addEventListener('keydown', e => {
  if (e.code === 'Escape' && timerId) {
    clearInterval(timerId);

    refs.inputDatePicker.removeAttribute('disabled');
    refs.btnStart.setAttribute('disabled', true);

    refs.seconds.textContent = '00';
    refs.minutes.textContent = '00';
    refs.hours.textContent = '00';
    refs.days.textContent = '00';
  }
});

// Start timer
function onBtnStart() {
  timerId = setInterval(startTimer, 1000);
}

//date checking and rendering of date difference
function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    refs.btnStart.setAttribute('disabled', true);
    return Notify.failure('Please choose a date in the future');
  }

  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
  refs.btnStart.removeAttribute('disabled');
}

//Timer
function startTimer() {
  refs.btnStart.setAttribute('disabled', true);
  refs.inputDatePicker.setAttribute('disabled', true);

  timeDifference -= 1000;

  if (refs.seconds.textContent <= 0 && refs.minutes.textContent <= 0) {
    Notify.success('Time end');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}

// Rendering date
function renderDate(formatDate) {
  refs.seconds.textContent = formatDate.seconds;
  refs.minutes.textContent = formatDate.minutes;
  refs.hours.textContent = formatDate.hours;
  refs.days.textContent = formatDate.days;
}
 function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

