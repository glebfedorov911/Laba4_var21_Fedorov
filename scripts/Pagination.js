

export class Pagination {
    #currentPage;
    #countPages;

    constructor(currentPage, countPages) {
        this.#currentPage = Number(currentPage);
        this.#countPages = Number(countPages);
    }

    next() {
        if (this.#currentPage + 1 <= this.#countPages) {
            this.#currentPage++;
        }
        return this.#currentPage;
    }

    prev() {
        if (this.#currentPage - 1 >= 1) {
            this.#currentPage--;
        }
        return this.#currentPage;
    }

    goToFirst() {
        this.#currentPage = 1;
        return this.#currentPage;
    }

    goToLast() {
        this.#currentPage = this.#countPages;
        return this.#currentPage;
    }

    goToPage(num) {
        if (num <= this.#countPages && num >= 1) {
            this.#currentPage = num;
        }
        return this.#currentPage;
    }
}