import { FillPagination } from "/scripts/FillPagination.js";
import { Pagination } from "/scripts/Pagination.js";
import { JsonParser } from "/scripts/FileParser.js";
import { QuestionShowerFabric } from "/scripts/QuestionShower.js";
import { MixData } from "/scripts/MixData.js";
import { Timer } from "/scripts/Timer.js";
import { redirect } from "/scripts/utils.js"


function goHome() {
    localStorage.clear();
    window.location.replace("index.html");
}

function createStateLocalStorage() {
    if (!localStorage.getItem('showed')) {
        localStorage.setItem('showed', JSON.stringify([]));
    }

    if (!localStorage.getItem('answered')) {
        localStorage.setItem('answered', JSON.stringify([]));
    }

    if (!localStorage.getItem('userAnswer')) {
        localStorage.setItem('userAnswer', JSON.stringify([]));
    }
}


function goToNextQuestion() {
    let pagination = createPagination();
    localStorage.setItem('q', pagination.next());
}

function goToPrevQuestion() {
    let pagination = createPagination();
    localStorage.setItem('q', pagination.prev());
}

function goToFirstQuestion() {
    let pagination = createPagination();
    localStorage.setItem('q', pagination.goToFirst());
}

function goToLastQuestion() {
    let pagination = createPagination();
    localStorage.setItem('q', pagination.goToLast());
}

function goToPage(pageNumber) {
    let pagination = createPagination();
    localStorage.setItem('q', pagination.goToPage(pageNumber));
}

function createPagination() {
    let currentQuestion = Number(localStorage.getItem('q'));

    return new Pagination(
        currentQuestion, questions.length
    )
}

function showQuestions() {
    let tagQuestion = document.querySelector('.question');
    let tagAnswers = document.querySelector('.answers');
    let currentQuestion = Number(JSON.parse(localStorage.getItem('q'))) - 1;
    let numQuestion = document.querySelector(".num-question");

    let showerFabric = new QuestionShowerFabric(
        tagQuestion, tagAnswers, questions[currentQuestion].question,
        questions[currentQuestion].variants, questions[currentQuestion].mode
    )
    showerFabric.createShower().show();
    numQuestion.innerText = `Вопрос номер: ${currentQuestion + 1}`;
}

function getQuestions(filename) {
    let parser = new JsonParser(filename);
    return parser.getData();
}

function stateUpdate() {
    setShowed();
    showQuestions();
    createStateLocalStorage();
    fillPagination();
    setUserAnswered();

    let answerButtons = document.querySelector(".answer");

    answerButtons.addEventListener("click", function (e) {
        let q = JSON.parse(localStorage.getItem('q'));
        if (q == 8) {
            alert("Вы прошли тест! Нажмите Завершить тест, чтобы узнать результаты!");
        }
        saveUserAnswer();
        goToNextQuestion();
        stateUpdate();
    })

    let stopBtn = document.querySelector(".stop-btn");
    stopBtn.addEventListener("click", function (e) {
        redirect();
    })
}

function setUserAnswered() {
    let currentPage = Number(JSON.parse(localStorage.getItem("q"))) - 1;
    let currentQuestion = JSON.parse(localStorage.getItem("questions"))[currentPage];
    let answers = JSON.parse(localStorage.getItem("answers")) || {};

    if (currentQuestion.mode == "multiple") {
        setMultipleAnswered(currentQuestion, answers);
    } else if (currentQuestion.mode == "one") {
        setOneAnswered(currentQuestion, answers);
    } else if (currentQuestion.mode == "open") {
        setOpenAnswered(currentQuestion, answers);
    } else if (currentQuestion.mode == "one-list") {
        setOneListAnswered(currentQuestion, answers);
    }
}

function setMultipleAnswered(currentQuestion, answers) {
    let currentAnswers = answers[currentQuestion.question];
    if (currentAnswers) {
        let checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(function (checkbox) {
            let label = checkbox.closest('label');
            if (currentAnswers.includes(label.textContent)) {
                checkbox.checked = true;
            }
        })
    }
}

function setOneAnswered(currentQuestion, answers) {
    let currentAnswers = answers[currentQuestion.question];
    if (currentAnswers) {
        let radioes = document.querySelectorAll("input[type='radio']");
        radioes.forEach(function (radio) {
            let label = radio.closest('label');
            if (currentAnswers.includes(label.textContent)) {
                radio.checked = true;
            }
        })
    }
}

function setOpenAnswered(currentQuestion, answers) {
    let currentAnswers = answers[currentQuestion.question];
    if (currentAnswers) {
        let textarea = document.querySelector(".answer-text");
        textarea.value = currentAnswers;
    }
}

function setOneListAnswered(currentQuestion, answers) {
    let currentAnswers = answers[currentQuestion.question];
    if (currentAnswers) {
        let options = document.querySelectorAll("option");
        options.forEach(function (option) {
            let value = option.value;
            if (currentAnswers.includes(value)) {
                option.selected = true;
            }
        })
    }
}

function saveUserAnswer() {
    try {
        let currentPage = Number(JSON.parse(localStorage.getItem("q"))) - 1;
        let currentQuestion = JSON.parse(localStorage.getItem("questions"))[currentPage];
        let answers = JSON.parse(localStorage.getItem("answers")) || {};

        if (currentQuestion.mode == "multiple") {
            answers = saveMultipleAnswer(currentQuestion, answers);
        } else if (currentQuestion.mode == "one") {
            answers = saveOneAnswer(currentQuestion, answers);
        } else if (currentQuestion.mode == "open") {
            answers = saveOpenAnswer(currentQuestion, answers);
        } else if (currentQuestion.mode == "one-list") {
            answers = saveOneListAnswer(currentQuestion, answers)
        }
        localStorage.setItem("answers", JSON.stringify(answers));
    } catch (TypeError) {}
}

function saveMultipleAnswer(currentQuestion, answers) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
    let answer = [];
    for (let i = 0; i  < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            let label = checkboxes[i].closest('label');
            answer.push(label.textContent);
            setAnswered();
        }
    }
    answers[currentQuestion.question] = answer;
    return answers;
}

function saveOneAnswer(currentQuestion, answers) {
    let radioes = document.querySelector("input[type='radio']:checked");
    if (radioes != null) {
        setAnswered();
    }

    answers[currentQuestion.question] = [radioes.closest('label').textContent];
    return answers;
}

function saveOpenAnswer(currentQuestion, answers) {
    let answerText = document.querySelector(".answer-text").value;
    answers[currentQuestion.question] = [answerText];
    if (answerText != "") {
        setAnswered();
    }
    return answers;
}

function saveOneListAnswer(currentQuestion, answers) {
    let select = document.querySelector(".answer-label");
    if(select.value != "-------") {
        setAnswered();
    }
    answers[currentQuestion.question] = [select.value];
    return answers;
}

function fillPagination() {
    let fillPagination = new FillPagination(
        Number(localStorage.getItem('q')),
        localStorage.getItem('showed'),
        localStorage.getItem('answered'),
        pagesNavigation
    );
    fillPagination.fill();
}

function setAnswered() {
    let answered = JSON.parse(localStorage.getItem('answered')) || [];
    answered.push(Number(localStorage.getItem('q')));
    localStorage.setItem('answered', JSON.stringify(answered));
}

function setShowed() {
    let showed = JSON.parse(localStorage.getItem('showed')) || [];
    showed.push(Number(localStorage.getItem('q')));
    localStorage.setItem('showed', JSON.stringify(showed));
}

function mixQuestions() {
    let questions = getQuestions('v1_geo.json');

    if (localStorage.getItem('mq') == 'true') {
        let mixData = new MixData(questions);
        return mixData.getArray();
    }

    return questions
}

function mixAnswers(questions) {
    if (localStorage.getItem('ma') == 'true') {
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].variants) {
                continue;
            }
            let mixData = new MixData(questions[i].variants);
            questions[i].variants = mixData.getArray();
        }
    }

    localStorage.setItem("questions", JSON.stringify(questions))
    return questions;
}

let time = localStorage.getItem('t');
let timerTag = document.querySelector(".timer");
let timer = new Timer(time, timerTag);
timer.start();

let questions = mixQuestions();
questions = mixAnswers(questions);

let buttonHome = document.querySelector(".home-btn");
let nextButton = document.querySelector("#next");
let firstPageButton = document.querySelector("#first");
let prevButton = document.querySelector("#prev");
let lastPageButton = document.querySelector("#last");
let pagesNavigation = document.querySelectorAll(".page");

buttonHome.addEventListener("click", function (e) {
    goHome();
})

document.addEventListener("DOMContentLoaded", function (e) {
    stateUpdate();
})

nextButton.addEventListener("click", function (e) {
    goToNextQuestion();
    stateUpdate();
})

prevButton.addEventListener("click", function (e) {
    goToPrevQuestion();
    stateUpdate();

})

firstPageButton.addEventListener("click", function (e) {
    goToFirstQuestion();
    stateUpdate();
})

lastPageButton.addEventListener("click", function (e) {
    goToLastQuestion();
    stateUpdate();
})

pagesNavigation.forEach(function(page) {
    page.addEventListener("click", function (e) {
        let pageNumber = page.innerText;
        goToPage(pageNumber);
        stateUpdate();
    })
})

document.body.addEventListener('click', function() {
    saveUserAnswer();
})

window.addEventListener("unload", function () {
    time = localStorage.getItem("t");
    localStorage.setItem("t", time-1);
});