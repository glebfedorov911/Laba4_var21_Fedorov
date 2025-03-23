import { redirect } from "/scripts/utils.js"


export class Timer {
    constructor(timeInSeconds, timerTag) {
        this._timeInSeconds = timeInSeconds;

        this._timerTag = timerTag;
        this._setTime();
    }

    start() {
        setInterval(() => {
            this._setTime();
            this._finish();
        }, 1000);
    }

    _finish() {
        if (this._timeInSeconds <= 0) {
            redirect();
        }
    }

    _setTime() {
        let time = this._getTime();
        localStorage.setItem("t", time)
        this._timerTag.innerHTML = `⏳ ${time}`;
    }

    _getTime() {
        return this._timeInSeconds--;
    }
}