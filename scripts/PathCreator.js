class PathCreator {
    #window;
    #filename;

    constructor(window, filename) {
        this.#window = window;
        this.#filename = filename;
    }

    /**
     * Метод для создания url.
     * @returns {void}.
     */
    getUrl() {
        return this._createPathname();
    }

    /**
     * Метод для создания пути.
     * @returns {string} - pathname для страницы.
     */
    _createPathname() {
        let pathname = this.#window.location.pathname;
        let spltedPathnameToNextPage = pathname.split("/").slice(0, -1);
        return spltedPathnameToNextPage.join("/") + `/${this.#filename}`;
    }
}

export class PathHashCreator extends PathCreator {
    #hashCollection;

    constructor(window, filename, hashCollection) {
        super(window, filename);
        this.#hashCollection = hashCollection;
    }

    /**
     * Метод для создания url.
     * @returns {void}.
     */
    getUrl() {
        return this._createPathname() + this.#createHash();
    }

    /**
     * Метод для создания hash'а.
     * @returns {string} - hash в строчной записи.
     */
    #createHash() {
        let hashPage = '';
        for(let i in this.#hashCollection) {
            hashPage += hashPage == ''
            ? `#${i}=${this.#hashCollection[i]}`
            : `&${i}=${this.#hashCollection[i]}`;
        }
        return hashPage;
    }
}