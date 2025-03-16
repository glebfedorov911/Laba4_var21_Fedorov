import { FillPagination } from "/scripts/FillPagination.js";
import { Pagination } from "/scripts/Pagination.js";
import { JsonParser } from "/scripts/FileParser.js";
import { QuestionShowerFabric } from "/scripts/QuestionShower.js";
import { LocalStorageManager } from "/scripts/LocalStorageManager.js";
import { MixData } from "/scripts/MixData.js";


function goHome() {
    let localStorageManager = createLocalStorageManager();
    localStorageManager.clear();
    window.location.replace("index.html");
}

function createStateForPagination() {
    let localStorageManager = createLocalStorageManager();

    if (!localStorageManager.getItem('showed')) {
        localStorageManager.setItem('showed', JSON.stringify([]));
    }

    if (!localStorageManager.getItem('answered')) {
        localStorageManager.setItem('answered', JSON.stringify([]));
    }

    if (!localStorageManager.getItem('userAnswer')) {
        localStorageManager.setItem('userAnswer', JSON.stringify([]));
    }
}

function createLocalStorageManager() {
    return new LocalStorageManager();
}

function goToNextQuestion() {
    let pagination = createPagination();
    let localStorageManager = createLocalStorageManager();
    localStorageManager.setItem('q', pagination.next());
}

function goToPrevQuestion() {
    let pagination = createPagination();
    let localStorageManager = createLocalStorageManager();
    localStorageManager.setItem('q', pagination.prev());
}

function goToFirstQuestion() {
    let pagination = createPagination();
    let localStorageManager = createLocalStorageManager();
    localStorageManager.setItem('q', pagination.goToFirst());
}

function goToLastQuestion() {
    let pagination = createPagination();
    let localStorageManager = createLocalStorageManager();
    localStorageManager.setItem('q', pagination.goToLast());
}

function goToPage(pageNumber) {
    let pagination = createPagination();
    let localStorageManager = createLocalStorageManager();
    localStorageManager.setItem('q', pagination.goToPage(pageNumber));
}

function createPagination() {
    let localStorageManager = createLocalStorageManager();
    let currentQuestion = Number(localStorageManager.getItem('q'));

    return new Pagination(
        currentQuestion, questions.length
    )
}

function showQuestions() {
    let localStorageManager = createLocalStorageManager();

    let tagQuestion = document.querySelector('.question');
    let tagAnswers = document.querySelector('.answers');
    let currentQuestion = Number(localStorageManager.getItem('q')) - 1;
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
    createStateForPagination();
    fillPagination();

    let answerButtons = document.querySelectorAll(".answer");
    let answerCheckbox = document.querySelectorAll(".answer-checkbox");

    answerButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            setAnswered();
            goToNextQuestion();
            stateUpdate();
        })
    })
}

function fillPagination() {
    let localStorageManager = createLocalStorageManager();
    let fillPagination = new FillPagination(
        Number(localStorageManager.getItem('q')),
        localStorageManager.getItem('showed'),
        localStorageManager.getItem('answered'),
        pagesNavigation
    );
    fillPagination.fill();
}

function setAnswered() {
    let localStorageManager = createLocalStorageManager();

    let answered = JSON.parse(localStorageManager.getItem('answered')) || [];
    answered.push(Number(localStorageManager.getItem('q')));
    localStorageManager.setItem('answered', JSON.stringify(answered));
}

function setShowed() {
    let localStorageManager = createLocalStorageManager();

    let showed = JSON.parse(localStorageManager.getItem('showed')) || [];
    showed.push(Number(localStorageManager.getItem('q')));
    localStorageManager.setItem('showed', JSON.stringify(showed));
}

function mixQuestions() {
    let localStorageManager = createLocalStorageManager();
    let questions = getQuestions('v1_geo.json');

    if (localStorageManager.getItem('mq') == 'true') {
        let mixData = new MixData(getQuestions('v1_geo.json'));
        return mixData.getArray();
    }

    return questions
}

function mixAnswers(questions) {
    let localStorageManager = createLocalStorageManager();

    if (localStorageManager.getItem('ma') == 'true') {
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].variants) {
                continue;
            }
            let mixData = new MixData(questions[i].variants);
            questions[i].variants = mixData.getArray();
        }
    }
    return questions;
}

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