

export class MixData {
    #array;

    constructor(array) {
        this.#array = array;
    }

    getArray() {
        return this.#mixData(this.#array);
    }

    #mixData() {
        for (let i = this.#array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.#array[i], this.#array[j]] = [this.#array[j], this.#array[i]];
        }
        return this.#array;
    }
}