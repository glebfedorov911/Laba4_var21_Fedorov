

/**
 * Класс для чтения файла в формате json.
 */
export class JsonParser {
    EXTENSION = 'json';
    #filename;

    /**
     * Конструктор.
     * @param {str} filename - имя файла.
     */
    constructor(filename) {
        this.#filename = filename;
    }

    /**
     * функция для чтения файла (логирование).
     */
    getData() {
        try {
            return this.#getData();
        } catch (error) {
            throw new Error('Невозможно прочитать файл');
        }
    }

    /**
     * функция для чтения файла (обработка ошибок).
     */
    #getData() {
        this.#checkExtension();

        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/questions/${this.#filename}`, false);
        xhr.send();

        if (xhr.status !== 200) {
            throw new Error(`Файл с именем ${this.#filename} не найден`);
        }

        return JSON.parse(xhr.responseText)
    }

    /**
     * Проверка расширения файла.
     */
    #checkExtension() {
        const fileExtension = this.#filename.split(".").at(-1);
        if (this.EXTENSION !== fileExtension) {
            throw new Error("Неправильный формат файла");
        }
    }
}