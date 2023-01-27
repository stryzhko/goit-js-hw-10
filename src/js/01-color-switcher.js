const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', startChangeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);
refs.stopBtn.disabled = true;

let timerId = null;

function startChangeColor() {
  timerId = setInterval(() => {
      refs.startBtn.disabled = true;
      refs.stopBtn.disabled = false;
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function stopChangeColor() {
  clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
