


/**
 * Класс для показа вопроса (родитель)
 */
class QuestionShower {
    _tagQuestion;
    _tagAnswer;
    _question;
    _answers;

    /**
     * Конструктор.
     * @param {HTMLInputElement} tagQuestion - тег вопроса.
     * @param {HTMLInputElement} tagAnswer - тег ответов.
     * @param {string} question - вопрос.
     * @param {array} answers - ответы.
     */
    constructor(tagQuestion, tagAnswer, question, answers) {
        this._tagQuestion = tagQuestion;
        this._tagAnswer = tagAnswer;
        this._question = question;
        this._answers = answers;
    }

    /**
     * Отображает вопрос на странице.
    */
    show() {
        throw new Error("Этот функция должен быть реализован в подклассе");
    }

    /**
     * Вспомогательный функция для создания вопроса и ответа.
    */
    _questionHandler() {
        throw new Error("Этот функция должен быть реализован в подклассе");
    }

    /**
     * Вспомогательный функция для отображение вопроса текстом.
    */
    _setQuestion() {
        this._tagQuestion.innerText = this._question;
    }

    /**
     * Вспомогательный функция для очищения поля с ответами.
    */
    _setAnswerToEmpty() {
        this._tagAnswer.innerHTML = '';
    }

    /**
     * Вспомогательный функция для создания чекбокса или радио с ответами.
     * @param {string} type - тип элемента.
     * @param {string} answer - ответ.
    */
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

    /**
     * функция для установки атрибутов.
     * @param {HTMLInputElement} element - текст на кнопке.
     * @param {string} attr - аттрибут.
     * @param {string} value - значение.
    */
    _setAttributes(element, attr, value) {
        element.setAttribute(attr, value);
        return this;
    }
}

/**
 * Класс для показа вопроса (один ответ)
 */
class OneAnswerQuestionShower extends QuestionShower {

    /**
     * Конструктор.
     * @param {HTMLInputElement} tagQuestion - тег вопроса.
     * @param {HTMLInputElement} tagAnswer - тег ответов.
     * @param {string} question - вопрос.
     * @param {array} answers - ответы.
     */
    constructor(tagQuestion, tagAnswer, question, answers) {
        super(tagQuestion, tagAnswer, question, answers);
    }

    /**
     * Отображает вопрос на странице.
    */
    show() {
        this._setQuestion();
        this._setAnswerToEmpty();
        this._questionHandler();
    }

    /**
     * Вспомогательный функция для создания вопроса и ответа.
    */
    _questionHandler() {
        Object.values(this._answers).forEach(answer => {
            this._createSelectForAnswers('radio', answer);
        })
    }
}

/**
 * Класс для показа вопроса (несколько ответов)
 */
class MultiAnswerQuestionShower extends QuestionShower {

    /**
     * Конструктор.
     * @param {HTMLInputElement} tagQuestion - тег вопроса.
     * @param {HTMLInputElement} tagAnswer - тег ответов.
     * @param {string} question - вопрос.
     * @param {array} answers - ответы.
     */
    constructor(tagQuestion, tagAnswer, question, answers) {
        super(tagQuestion, tagAnswer, question, answers);
    }

    /**
     * Отображает вопрос на странице.
    */
    show() {
        this._setQuestion();
        this._setAnswerToEmpty();
        this._questionHandler();
    }

    /**
     * Вспомогательный функция для создания вопроса и ответа.
    */
    _questionHandler() {
        Object.values(this._answers).forEach(answer => {
            this._createSelectForAnswers('checkbox', answer);
        })
    }
}

/**
 * Класс для показа вопроса (открытый ответ)
 */
class OpenAnswerQuestionShower extends QuestionShower {

    /**
     * Конструктор.
     * @param {HTMLInputElement} tagQuestion - тег вопроса.
     * @param {HTMLInputElement} tagAnswer - тег ответов.
     * @param {string} question - вопрос.
     * @param {array} answers - ответы.
     */
    constructor(tagQuestion, tagAnswer, question, answers) {
        super(tagQuestion, tagAnswer, question, answers);
    }

    /**
     * Отображает вопрос на странице.
    */
    show() {
        this._setQuestion();
        this._setAnswerToEmpty();
        this._questionHandler();
    }

    /**
     * Вспомогательный функция для создания вопроса и ответа.
    */
    _questionHandler() {
        let newTextToAnswer = document.createElement('input');
        this._setAttributes(newTextToAnswer, 'type', 'text')
            ._setAttributes(newTextToAnswer, 'class', 'answer-text')
            ._setAttributes(newTextToAnswer, 'placeholder', 'Ваш ответ');

        this._tagAnswer.appendChild(newTextToAnswer);

    }
}

/**
 * Класс для показа вопроса (выпадающий список ответов)
 */
class OneListAnswerQuestionShower extends QuestionShower {

    /**
     * Конструктор.
     * @param {HTMLInputElement} tagQuestion - тег вопроса.
     * @param {HTMLInputElement} tagAnswer - тег ответов.
     * @param {string} question - вопрос.
     * @param {array} answers - ответы.
     */
    constructor(tagQuestion, tagAnswer, question, answers) {
        super(tagQuestion, tagAnswer, question, answers);
    }

    /**
     * Отображает вопрос на странице.
    */
    show() {
        this._setQuestion();
        this._setAnswerToEmpty();
        this._questionHandler();
    }

    /**
     * Вспомогательный функция для создания вопроса и ответа.
    */
    _questionHandler() {
        let select = document.createElement('select');
        select.className = 'answer-label';
        this._createOption(select, "-------");
        this._createAnswers(select);

        this._tagAnswer.appendChild(select);
    }

    /**
     * Cоздание ответов циклом.
    */
    _createAnswers(select) {
        this._answers.forEach((answer) => {
            this._createOption(select, answer);
        })
    }

    /**
     * Создание option для select'a.
    */
    _createOption(select, answer) {
        let option = document.createElement('option');
        option.className = 'answer-label';
        option.value = answer;
        option.textContent = answer;
        select.appendChild(option);
    }
}


/**
 * Класс-фабрика для создания классов отображения вопросов.
 */
export class QuestionShowerFabric {
    #tagQuestion;
    #tagAnswer;
    #question;
    #answers;
    #typeShower;

    /**
     * Конструктор.
     * @param {HTMLInputElement} tagQuestion - тег вопроса.
     * @param {HTMLInputElement} tagAnswer - тег ответов.
     * @param {string} question - вопрос.
     * @param {array} answers - ответы.
     */
    constructor(tagQuestion, tagAnswer, question, answers, typeShower) {
        this.#tagQuestion = tagQuestion;
        this.#tagAnswer = tagAnswer;
        this.#question = question;
        this.#answers = answers;
        this.#typeShower = typeShower;
    }

    /**
     * Создание класса отображения вопроса.
     */
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