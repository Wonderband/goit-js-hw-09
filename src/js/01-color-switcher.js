function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  
const bodyEl = document.querySelector('body');
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

let intervalId = null;

btnStartEl.addEventListener('click', changeBodyColors);
btnStopEl.addEventListener('click', stopChangeBodyColors);
btnStopEl.disabled = true;

function changeBodyColors() {
    btnStartEl.disabled = true;  
    btnStopEl.disabled = false;  
    intervalId = setInterval(() => bodyEl.style.backgroundColor = getRandomHexColor(), 1000);    
}

function stopChangeBodyColors() {
    clearInterval(intervalId);
    btnStartEl.disabled = false;
    btnStopEl.disabled = true;  
}