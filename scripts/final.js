


/**
 * функция для получения всех ответов и вопросов.
 */
function getAllAnswersAndQuestions() {
    let answers = JSON.parse(localStorage.getItem('answers')) || {};
    let questions = JSON.parse(localStorage.getItem('questions'));
    localStorage.clear();
    localStorage.setItem('answers', JSON.stringify(answers));
    localStorage.setItem('questions', JSON.stringify(questions));
    return [questions, answers]
}

/**
 * функция для редиректа на главную страницу.
 */
function goHome() {
    localStorage.clear();
    window.location.replace("index.html");
}

/**
 * функция для проверки ответов на корректность.
 * @param {object} answers - ответы.
 * @param {object} questions - вопросы.
 */
function checkAnswersToCorrect(answers, questions) {
    let marks = {};
    for(let i in questions) {
        let question = questions[i];
        let fail = true;
        let userAnswer = answers[question.question];
        if (!userAnswer) {
            fail = true;
        } else {
            let corrects = question.correct;
            if (corrects.length != userAnswer.length) {
                fail = true;
            }
            else {
                for(let j in corrects) {
                    if (userAnswer.includes(corrects[j])) {
                        fail = false;
                    } else {
                        fail = true;
                        break;
                    }
                }
            }
        }
        if (fail) {
            marks[question.question] = 0;
        } else {
            marks[question.question] = 1;
        }
    }
    return marks;
}

/**
 * функция для проверки ответов на корректность.
 * @param {object} marks - правильность ответа.
 * @param {object} questions - вопросы.
 */
function showResult(questions, marks, answers) {
    let tbody = document.querySelector("tbody");
    let countMark = 0;
    let numQuestion = 0;
    for(let question in marks) {
        let typeCorrect = marks[question] == 1 ? "Верно" : "Ошибка";
        let result = [numQuestion + 1, question, answers[question], questions[numQuestion].correct, typeCorrect, marks[question]];
        numQuestion += 1
        let tr = document.createElement("tr");
        for (let r in result) {
            let classTypeCorrect = result[4] == "Верно" ? "correct" : "incorrect"
            let td = document.createElement("td");
            if (r == 2 && (result[r] == undefined || result[r] == "" || result[r] == "-------")) {
                td.innerText = 'Ответ не был дан';
            } else {
                td.innerText = result[r];
            }
            if (r == 4 && result[r] == "Верно") {
                countMark++;
            }
            tr.appendChild(td);
            td.className = classTypeCorrect;
        }
        tbody.appendChild(tr);
    }
    let totalScore = document.querySelector(".total-score");
    totalScore.innerText = `Общий счет: ${countMark} балл(ов/а)`;
}

let homeBtn = document.querySelector(".home-btn");
homeBtn.addEventListener("click", function () {
    goHome();
})

let result = getAllAnswersAndQuestions();
let questions = result[0];
let answers = result[1];
let marks = checkAnswersToCorrect(answers, questions);
showResult(questions, marks, answers);