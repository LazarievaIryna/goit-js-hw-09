import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateTimeInput: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  daysValue: document.querySelector('span[data-days]'),
  hoursValue: document.querySelector('span[data-hours]'),
  minutesValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
};
refs.btnStart.disabled = true;
let chooseDate = new Date();
let date = new Date();

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days =
    Math.floor(ms / day) < 10
      ? addLeadingZero(Math.floor(ms / day))
      : Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chooseDate = selectedDates[0];
    if (chooseDate < date) {
      window.alert('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }
  },
};
flatpickr(refs.dateTimeInput, options);
refs.btnStart.addEventListener('click', startTimer);

function startTimer() {
  refs.btnStart.disabled = true;
  refs.dateTimeInput.disabled = true;
  deltaTime();
}
function deltaTime() {
  const timerId = setInterval(() => {
    const delta = chooseDate - Date.now();

    const dateOffset = convertMs(delta);
    // console.log(dateOffset);
    if (delta <= 0) {
      clearInterval(timerId);
    } else {
      timerView(dateOffset);
    }
  }, 1000);
}
function timerView(dateOffset) {
  refs.daysValue.textContent = dateOffset.days;
  refs.hoursValue.textContent = dateOffset.hours;
  refs.minutesValue.textContent = dateOffset.minutes;
  refs.secondsValue.textContent = dateOffset.seconds;
}
