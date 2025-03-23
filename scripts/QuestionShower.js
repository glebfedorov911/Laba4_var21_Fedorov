

class QuestionShower {
    _tagQuestion;
    _tagAnswer;
    _question;
    _answers;

    constructor(tagQuestion, tagAnswer, question, answers) {
        this._tagQuestion = tagQuestion;
        this._tagAnswer = tagAnswer;
        this._question = question;
        this._answers = answers;
    }

    show() {
        throw new Error("Этот метод должен быть реализован в подклассе");
    }

    _questionHandler() {
        throw new Error("Этот метод должен быть реализован в подклассе");
    }

    _setQuestion() {
        this._tagQuestion.innerText = this._question;
    }

    _setAnswerToEmpty() {
        this._tagAnswer.innerHTML = '';
    }

    _createSelectForAnswers(type, answer) {
        let label = document.createElement('label');
        this._setAttributes(label, 'class', 'answer-label');

        let newButtonToAnswer = document.createElement('input');
        this._setAttributes(newButtonToAnswer, 'type', type)
            ._setAttributes(newButtonToAnswer, 'class', 'answer-checkbox')
            ._setAttributes(newButtonToAnswer, 'name', 'answer');

        label.appendChild(newButtonToAnswer);

        let answerText = document.createTextNode(answer);
        label.append(answerText);

        this._tagAnswer.appendChild(label);
    }

    _createButton (textOnButton) {
        let newButtonToAnswer = document.createElement('input');
        this._setAttributes(newButtonToAnswer, 'type', 'button')
            ._setAttributes(newButtonToAnswer, 'value', textOnButton)
            ._setAttributes(newButtonToAnswer, 'class', 'answer');
        this._tagAnswer.appendChild(newButtonToAnswer);
    }

    _setAttributes(element, attr, value) {
        element.setAttribute(attr, value);
        return this;
    }
}

class OneAnswerQuestionShower extends QuestionShower {

    constructor(tagQuestion, tagAnswer, question, answers) {
        super(tagQuestion, tagAnswer, question, answers);
    }

    show() {
        this._setQuestion();
        this._setAnswerToEmpty();
        this._questionHandler();
        this._createButton('Отправить ответ');
    }

    _questionHandler() {
        Object.values(this._answers).forEach(answer => {
            this._createSelectForAnswers('radio', answer);
        })
    }
}

class MultiAnswerQuestionShower extends QuestionShower {

    constructor(tagQuestion, tagAnswer, question, answers) {
        super(tagQuestion, tagAnswer, question, answers);
    }

    show() {
        this._setQuestion();
        this._setAnswerToEmpty();
        this._questionHandler();
        this._createButton('Отправить ответ');
    }

    _questionHandler() {
        Object.values(this._answers).forEach(answer => {
            this._createSelectForAnswers('checkbox', answer);
        })
    }
}

class OpenAnswerQuestionShower extends QuestionShower {

    constructor(tagQuestion, tagAnswer, question, answers) {
        super(tagQuestion, tagAnswer, question, answers);
    }

    show() {
        this._setQuestion();
        this._setAnswerToEmpty();
        this._questionHandler();
    }

    _questionHandler() {
        let newTextToAnswer = document.createElement('input');
        this._setAttributes(newTextToAnswer, 'type', 'text')
            ._setAttributes(newTextToAnswer, 'class', 'answer-text')
            ._setAttributes(newTextToAnswer, 'placeholder', 'Ваш ответ');

        this._tagAnswer.appendChild(newTextToAnswer);

        this._createButton('Отправить ответ');
    }
}

class OneListAnswerQuestionShower extends QuestionShower {
    constructor(tagQuestion, tagAnswer, question, answers) {
        super(tagQuestion, tagAnswer, question, answers);
    }

    show() {
        this._setQuestion();
        this._setAnswerToEmpty();
        this._questionHandler();
    }

    _questionHandler() {
        let select = document.createElement('select');
        select.className = 'answer-label';
        this._createOption(select, "-------");
        this._createAnswers(select);

        this._tagAnswer.appendChild(select);
        this._createButton('Отправить ответ');
    }

    _createAnswers(select) {
        this._answers.forEach((answer) => {
            this._createOption(select, answer);
        })
    }

    _createOption(select, answer) {
        let option = document.createElement('option');
        option.className = 'answer-label';
        option.value = answer;
        option.textContent = answer;
        select.appendChild(option);
    }
}

export class QuestionShowerFabric {
    #tagQuestion;
    #tagAnswer;
    #question;
    #answers;
    #typeShower;

    constructor(tagQuestion, tagAnswer, question, answers, typeShower) {
        this.#tagQuestion = tagQuestion;
        this.#tagAnswer = tagAnswer;
        this.#question = question;
        this.#answers = answers;
        this.#typeShower = typeShower;
    }

    createShower() {
        switch (this.#typeShower) {
            case 'one':
                return new OneAnswerQuestionShower(this.#tagQuestion, this.#tagAnswer,
                    this.#question, this.#answers);
                break;
            case 'multiple':
                return new MultiAnswerQuestionShower(this.#tagQuestion, this.#tagAnswer,
                    this.#question, this.#answers);
                break;
            case 'open':
                return new OpenAnswerQuestionShower(this.#tagQuestion, this.#tagAnswer,
                    this.#question, this.#answers);
                break;
            case 'one-list':
                return new OneListAnswerQuestionShower(this.#tagQuestion, this.#tagAnswer,
                    this.#question, this.#answers);
            default:
                throw new Error("Неизвестный тип");
                break;
        }
    }
}