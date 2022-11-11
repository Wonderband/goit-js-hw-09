import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStartEl = document.querySelector('[data-start]');
const datePickerEl = document.querySelector('#datetime-picker');
btnStartEl.disabled = true;
btnStartEl.addEventListener('click', startTimer);

let dateSelected = null;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            Notify.failure("Please choose a date in the future");
            // alert();
            return;
        }
        btnStartEl.disabled = false;        
        dateSelected = selectedDates[0];
        // Якщо обрати дату та час так, щоб таймер дійшов до нуля, до дивись нижче...   
    },
};
const datePicker = flatpickr("#datetime-picker", options);

function startTimer() {  
    btnStartEl.disabled = true;
    datePickerEl.disabled = true;
    timerId = setInterval(decrementSeconds, 1000);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

function decrementSeconds() {  
    if (dateSelected < Date.now()) {
        Notify.failure("Future has come! Change your date!");
        clearInterval(timerId); 
        datePickerEl.disabled = false;
        return;
    }
    const {days, hours, minutes, seconds} = convertMs(dateSelected - Date.now());    
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds); 
    // В консоль виводиться остання секунда, тобто 0,все ОК
    // а в елемент ДОМ (поле секунд) прописується тільки після закриття Alert!?! 
    // Але в коді раніше стоїть зміна контенту... 
    // console.log(seconds);
    if (!days && !hours && !minutes && !seconds) {
        clearInterval(timerId);
        // Якщо розкоментувати Alert,  нуль секунд з'явиться на таймері тільки після закриття Alert
        // alert('Timer stopped!');
        Notify.info('Timer stopped!');  
        datePickerEl.disabled = false;        
    }            
}

function addLeadingZero(value) {
    return String(value).padStart(2,'0');
}