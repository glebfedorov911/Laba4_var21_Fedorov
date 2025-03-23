

/**
 * Класс для окрашивания пагинации.
 */
export class FillPagination {
    #currentQuestion;
    #showedQuestions;
    #answeredQuestions;
    #pages;

    /**
     * Конструктор.
     * @param {str} currentQuestion - имя файла.
     * @param {array} showedQuestions - просмотренные вопросы.
     * @param {array} answeredQuestions - отвеченные вопросы.
     * @param {array} pages - все страницы.
     */
    constructor(currentQuestion, showedQuestions, answeredQuestions, pages) {
        this.#currentQuestion = currentQuestion;
        this.#answeredQuestions = answeredQuestions;
        this.#showedQuestions = showedQuestions;
        this.#pages = pages;
    }

    /**
     * функция для окрашивания пагинации.
     */
    fill() {
        for (let i = 0; i < this.#pages.length; i++) {
            this.#fillCurrentQuestion(this.#pages[i]);
            this.#fillAnsweredQuestions(this.#pages[i]);
            this.#fillShowedQuestions(this.#pages[i]);
        }
    }

    /**
     * функция для окрашивания текущего вопроса.
     * @param {str} page - страница.
     */
    #fillCurrentQuestion(page) {
        if (page.innerText == this.#currentQuestion) {
            page.classList = 'page current';
        }
    }

    /**
     * функция для окрашивания просмотренного вопроса.
     * @param {str} page - страница.
     */
    #fillShowedQuestions(page) {
        if (this.#showedQuestions.includes(page.innerText)
        && !this.#answeredQuestions.includes(page.innerText)
        && page.innerText != this.#currentQuestion) {
            page.classList = 'page viewed';
        }
    }

    /**
     * функция для окрашивания отвеченного вопроса.
     * @param {str} page - страница.
     */
    #fillAnsweredQuestions(page) {
        if (this.#answeredQuestions.includes(page.innerText)
        && page.innerText != this.#currentQuestion) {
            page.classList = 'page answered';
        }
    }
}