const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
console.log(stopBtn);
let timerId = null
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
startBtn.addEventListener('click', () => {
    disabledBtn();
    timerId = setInterval(() => {
document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
})
stopBtn.addEventListener('click', () => {
    disabledBtn();
    clearInterval(timerId);
})

function disabledBtn() {
    if (!startBtn.disabled) {
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }
    else {
startBtn.disabled = false;
stopBtn.disabled = true;
    }
}