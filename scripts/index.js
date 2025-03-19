const DEFAULT_TIME = 10;

let startButton = document.querySelector(".start-btn");
let time = document.querySelector("#time");
let mixQuestions = document.querySelector("#mix-questions");
let mixAnswers = document.querySelector("#mix-answers");

time.addEventListener('input', function () {
    convertTimeToDiaposoneFrom1To60(this);
});

/**
 * Конвертирует время в диапазон от 1 до 60.
 * @param {HTMLInputElement} time - Элемент input времени.
 * @returns {void}
 */
function convertTimeToDiaposoneFrom1To60(time) {
    if (time.value < 1) {
        time.value = 1;
    }
    else if (time.value > 60) {
        time.value = 60;
    } else {
        time.value = time.value;
    }
}

startButton.addEventListener("click", function() {
    saveDataToLocalStorage();
    window.location.replace('question.html');
})

/**
 * Сохраняет данные в локальное хранилище для перехода на страницу с вопросом.
 * @returns {void}
 */
function saveDataToLocalStorage() {
    localStorage.setItem('q', 1);
    localStorage.setItem('t', get_time_value(time.value));
    localStorage.setItem('mq', mixQuestions.checked);
    localStorage.setItem('ma', mixAnswers.checked);
}

/**
 * Функция для получения времени (если отсутствует, то ставится дефолтное).
 * @returns {int} - время.
 */
function get_time_value() {
    if (time.value == "") {
        time.value = DEFAULT_TIME;
    }
    return time.value;
}