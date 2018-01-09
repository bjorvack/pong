class Keyboard {
    constructor() {
        this._pressedKeys = [];

        document.addEventListener('keydown', (event) => {
            this._pressedKeys.push(event.keyCode);
            this._pressedKeys = this._pressedKeys.filter((item, pos) => {
                return this._pressedKeys.indexOf(item) == pos;
            });
        });

        document.addEventListener('keyup', (event) => {
            let index = this._pressedKeys.indexOf(event.keyCode);

            if (index > -1) {
                this._pressedKeys.splice(index, 1);
            }
        });
    }

    isKeyPressed(keyCode) {
        return this._pressedKeys.indexOf(keyCode) > -1;
    }

    get pressedKeys() {
        return this._pressedKeys;
    }
}