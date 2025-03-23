

/**
 * Класс для пагинации.
 */
export class Pagination {
    #currentPage;
    #countPages;

    /**
     * Конструктор.
     * @param {string} currentPage - текущая страница.
     * @param {string} countPages - количество страниц.
     */
    constructor(currentPage, countPages) {
        this.#currentPage = Number(currentPage);
        this.#countPages = Number(countPages);
    }

    /**
     * Получение номера следующей страницы.
     */
    next() {
        if (this.#currentPage + 1 <= this.#countPages) {
            this.#currentPage++;
        }
        return this.#currentPage;
    }

    /**
     * Получение номера предыдущей страницы.
     */
    prev() {
        if (this.#currentPage - 1 >= 1) {
            this.#currentPage--;
        }
        return this.#currentPage;
    }

    /**
     * Получение номера первой страницы.
     */
    goToFirst() {
        this.#currentPage = 1;
        return this.#currentPage;
    }

    /**
     * Получение номера последний страницы.
     */
    goToLast() {
        this.#currentPage = this.#countPages;
        return this.#currentPage;
    }

    /**
     * функция для получения номера конкретной страницы.
     * @param {number} num - номер страницы.
     */
    goToPage(num) {
        if (num <= this.#countPages && num >= 1) {
            this.#currentPage = num;
        }
        return this.#currentPage;
    }
}