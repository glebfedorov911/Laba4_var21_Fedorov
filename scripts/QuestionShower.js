

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

    _setQuestion() {
        this._tagQuestion.innerText = this._question;
    }

    _setAnswerToEmpty() {
        this._tagAnswer.innerHTML = '';
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
        Object.values(this._answers).forEach(answer => {
            this._createButton(answer);
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
        Object.values(this._answers).forEach(answer => {
            this._questionHandler(answer);
        })
        this._createButton('Отправить ответ');
    }

    _questionHandler(answer) {
        let label = document.createElement('label');
        this._setAttributes(label, 'class', 'answer-label');

        let newButtonToAnswer = document.createElement('input');
        this._setAttributes(newButtonToAnswer, 'type', 'checkbox')
            ._setAttributes(newButtonToAnswer, 'class', 'answer-checkbox');

        label.appendChild(newButtonToAnswer);

        let answerText = document.createTextNode(answer);
        label.append(answerText);

        this._tagAnswer.appendChild(label);
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
            default:
                throw new Error("Неизвестный тип");
                break;
        }
    }
}