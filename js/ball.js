class Ball {
    constructor (x, y, radius = 10, color = '#FFFFFF') {
        this._radius = radius;
        this._color = color;

        this.reset(x, y);
    }

    reset(x, y) {
        const angle = Math.random() * 360;

        this._movement = {
            'x': Math.cos(angle),
            'y': Math.sin(angle)
        }

        this._x = x;
        this._y = y;
    }

    move (x, y) {
        this._x = x;
        this._y = y;
    }

    collidesWith(x, y, width, height) {
        return !(this.x > x + width ||
            this.x + this.radius < x ||
            this.y > y + height ||
            this.y + this.radius < y);
    }

    bounce (x, y) {
        this._movement['x'] *= x;
        this._movement['y'] *= y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get radius() {
        return this._radius;
    }

    get color() {
        return this._color;
    }

    get movement() {
        return this._movement;
    }
}