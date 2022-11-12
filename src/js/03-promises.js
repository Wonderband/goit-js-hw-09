import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {  
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) 
        resolve(`Fulfilled promise ${position} in ${delay} ms`);
      else 
        reject(`Rejected promise ${position} in ${delay} ms`);    
    }, delay);
  })   
};

function submitHandle(e) {
  e.preventDefault(); 
  const formElements = e.currentTarget.elements;
  const delayVal = Number(formElements.delay.value); 
  const stepVal = Number(formElements.step.value); 
  const amountVal = Number(formElements.amount.value);     
  
  for (let i = 0; i < amountVal; i += 1) {
    const currentDelay = delayVal + i * stepVal;
    if (currentDelay < 0) 
        Notify.failure(`Delay is negative on promise ${i+1}!`);    
    else {
      const promise = createPromise(i + 1, currentDelay);
      promise.then(res => Notify.success(res)).catch(err => Notify.failure(err));   
    } 
  }  
}

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', submitHandle);
