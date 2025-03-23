

/**
 * Класс для смешивание данных.
 */
export class MixData {
    #array;

    /**
     * Конструктор.
     * @param {array} array - массив.
     */
    constructor(array) {
        this.#array = array;
    }

    /**
     * функция для получения смешанного массива.
     */
    getArray() {
        return this.#mixData(this.#array);
    }

    /**
     * функция перемешивания данных.
     */
    #mixData() {
        for (let i = this.#array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.#array[i], this.#array[j]] = [this.#array[j], this.#array[i]];
        }
        return this.#array;
    }
}