import throttle from 'lodash.throttle';



const submitFormEl = document.querySelector('.feedback-form');
const LOCAL_KEY = 'feedback-form-state';
let formData = {};
submitFormEl.addEventListener('submit', feedbackInput);

function feedbackInput(event) {
    event.preventDefault();
    localStorage.removeItem(LOCAL_KEY);  // Видаленя ключа в локал кеш
    console.log(formData);
    event.currentTarget.reset();

};

submitFormEl.addEventListener('input', throttle(inputResult, 500));
function inputResult(event) {
    formData[event.target.name] = event.target.value.trim(); // вибір таргета і результат 
    localStorage.setItem(LOCAL_KEY, JSON.stringify(formData)); // записуємо в локал кеш як обьєкт!
};
submitFormEl.addEventListener('input', throttle(inputResult, 500));

refreshForm();

function refreshForm() {
    try {
        var savedData = localStorage.getItem(LOCAL_KEY);
        if (!savedData) return;
            formData = JSON.parse(savedData);
            Object.entries(formData).forEach(([key, val]) => {
                submitFormEl.elements[key].value = val;
            });
    } catch ({message}) {
        console.log(message);
    }
};