import { FillPagination } from "/scripts/FillPagination.js";
import { Pagination } from "/scripts/Pagination.js";
import { JsonParser } from "/scripts/FileParser.js";
import { QuestionShowerFabric } from "/scripts/QuestionShower.js";
import { MixData } from "/scripts/MixData.js";


function goHome() {
    localStorage.clear();
    window.location.replace("index.html");
}

function createStateForPagination() {
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

function setMultiple() {
    let answers = JSON.stringify(document.querySelector('answers'));

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

    let answerButtons = document.querySelector(".answer");

    answerButtons.addEventListener("click", function (e) {
        setAnswered();
        saveUserAnswer();
        goToNextQuestion();
        stateUpdate();
    })
}

function saveUserAnswer() {
    let currentPage = Number(JSON.parse(localStorage.getItem("q"))) - 1;
    let currentQuestion = JSON.parse(localStorage.getItem("questions"))[currentPage];
    let answers = JSON.parse(localStorage.getItem("answers")) || {};

    console.log(currentQuestion, currentQuestion.mode);
    if (currentQuestion.mode == "multiple") {
        saveMultipleAnswer(currentQuestion, answers);
    } else if (currentQuestion.mode == "one") {
        saveOneAnswer(currentQuestion, answers);
    } else if (currentQuestion.mode == "open") {
        saveOpenAnswer(currentQuestion, answers);
    }
    console.log(JSON.parse(localStorage.getItem("answers")))

}

function saveMultipleAnswer(currentQuestion, answers) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
    let answer = [];
    for (let i = 0; i  < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            let label = checkboxes[i].closest('label');
            answer.push(label.textContent);
        }
    }
    answers[currentQuestion.question] = answer;
    console.log(answers);
    localStorage.setItem("answers", JSON.stringify(answers));
}

function saveOneAnswer(currentQuestion, answers) {
    let radioes = document.querySelector("input[type='radio']:checked");

    answers[currentQuestion.question] = [radioes.closest('label').textContent];
    localStorage.setItem("answers", JSON.stringify(answers));
}

function saveOpenAnswer(currentQuestion, answers) {
    let answerText = document.querySelector(".answer-text").value;
    answers[currentQuestion.question] = [answerText];
    localStorage.setItem("answers", JSON.stringify(answers));
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
        let mixData = new MixData(getQuestions('v1_geo.json'));
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