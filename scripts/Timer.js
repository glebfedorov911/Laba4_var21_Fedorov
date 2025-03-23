import { redirect } from "/scripts/utils.js"


/**
 * Класс для создания таймера.
*/
export class Timer {

    /**
     * Конструктор.
     * @param {HTMLInputElement} timeInSeconds - время в секундах.
     * @param {HTMLInputElement} timerTag - тег таймера.
     */
    constructor(timeInSeconds, timerTag) {
        this._timeInSeconds = timeInSeconds;

        this._timerTag = timerTag;
        this._setTime();
    }

    /**
     * Запуск таймера.
     */
    start() {
        setInterval(() => {
            this._setTime();
            this._finish();
        }, 1000);
    }

    /**
     * Окончание таймера.
     */
    _finish() {
        if (this._timeInSeconds <= 0) {
            redirect();
        }
    }

    /**
     * Установка времени.
     */
    _setTime() {
        let time = this._getTime();
        localStorage.setItem("t", time)
        this._timerTag.innerHTML = `⏳ ${time}`;
    }

    /**
     * Получение времени с вычитанием.
     */
    _getTime() {
        return this._timeInSeconds--;
    }
}