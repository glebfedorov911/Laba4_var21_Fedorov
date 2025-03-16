

export class FillPagination {
    #currentQuestion;
    #showedQuestions;
    #answeredQuestions;
    #pages;

    constructor(currentQuestion, showedQuestions, answeredQuestions, pages) {
        this.#currentQuestion = currentQuestion;
        this.#answeredQuestions = answeredQuestions;
        this.#showedQuestions = showedQuestions;
        this.#pages = pages;
    }

    fill() {
        for (let i = 0; i < this.#pages.length; i++) {
            this.#fillCurrentQuestion(this.#pages[i]);
            this.#fillAnsweredQuestions(this.#pages[i]);
            this.#fillShowedQuestions(this.#pages[i]);
        }
    }

    #fillCurrentQuestion(page) {
        if (page.innerText == this.#currentQuestion) {
            page.classList = 'page current';
        }
    }

    #fillShowedQuestions(page) {
        if (this.#showedQuestions.includes(page.innerText)
        && !this.#answeredQuestions.includes(page.innerText)
        && page.innerText != this.#currentQuestion) {
            page.classList = 'page viewed';
        }
    }

    #fillAnsweredQuestions(page) {
        if (this.#answeredQuestions.includes(page.innerText)
        && page.innerText != this.#currentQuestion) {
            page.classList = 'page answered';
        }
    }
}