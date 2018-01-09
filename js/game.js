class Game {
    constructor (canvasId, color = '#222222')
    {
        this._canvas = new Canvas(
            document.getElementById(canvasId),
            color,
            frames
        );

        this._keyboard = new Keyboard();
        this._running = false;

        this._paddle = new Paddle(
            25,
            (this._canvas.height / 2) - 50
        );

        this._opponent = new Paddle(
            this._canvas.width - 25,
            (this._canvas.height / 2) - 50
        );

        this._ball = new Ball(
            (this._canvas.width / 2) - 5,
            (this._canvas.height / 2) - 5,
            10
        );

        this._score = [
            0,
            0
        ];
    }

    start () {
        this._startTime = new Date().getMilliseconds();
        this._running = true;
        this._run();
    }

    stop () {
        this._running = false;
    }

    _run () {
        if (this._running) {
            this.update();
            this.draw();

            requestAnimationFrame( () => {
                this._run();
            });
        }
    }

    update () {
        const speed = 80;
        const now = new Date().getMilliseconds();
        const deltaTime = (now - this._startTime) < 0 ? 0 : (now - this._startTime);
        this._startTime = now;

        this.handlePlayer(speed, deltaTime);
        this.handleBall(speed, deltaTime);
    }

    handleBall(speed, deltaTime) {
        const movement = speed * deltaTime / 1000;

        this._ball.move(
            this._ball.x + movement * this._ball.movement['x'],
            this._ball.y + movement * this._ball.movement['y']
        );

        // PADDELS
        if (this._ball.collidesWith(this._opponent.x, this._opponent.y, this._opponent.width, this._opponent.height ) ||
            this._ball.collidesWith(this._paddle.x, this._paddle.y, this._paddle.width, this._paddle.height)
        ) {
            this._ball.bounce(-1, 1);
        }

        // BOTTOM - TOP
        if (this._ball.collidesWith(0, -100, this._canvas.width, 100) ||
            this._ball.collidesWith(0, this._canvas.height, this._canvas.width, 100)
        ) {
            this._ball.bounce(1, -1);
        }

        if (this._ball.collidesWith(-100, 0, 100, this._canvas.height)) {
            this._score[1] ++;

            this._ball.reset(
                (this._canvas.width / 2) - 5,
                (this._canvas.height / 2) - 5
            );
        }

        if (this._ball.collidesWith(this._canvas.width, 0, 100, this._canvas.height)) {
            this._score[0] ++;
            this._ball.reset(
                (this._canvas.width / 2) - 5,
                (this._canvas.height / 2) - 5
            );
        }
    }

    handlePlayer (speed, deltaTime) {
        const movement = speed * deltaTime / 1000;

        if (this._keyboard.isKeyPressed(38)) { // UP
            this._paddle.move(
                this._paddle.x,
                (this._paddle.y - movement) < 0 ? 0 : (this._paddle.y - movement)
            );
        }

        if (this._keyboard.isKeyPressed(40)) { // DOWN
            this._paddle.move(
                this._paddle.x,
                (this._paddle.y + movement) > (this._canvas.height - this._paddle.height) ?
                    (this._canvas.height - this._paddle.height) : (this._paddle.y + movement)
            );
        }
    }

    draw () {
        this._canvas.clear();

        this._canvas.context.strokeStyle = '#FFFFFF';
        this._canvas.context.beginPath();
        this._canvas.context.moveTo(this._canvas.width / 2, 0);
        this._canvas.context.lineTo(this._canvas.width / 2, this._canvas.height);
        this._canvas.context.stroke();

        this._canvas.context.fillStyle = this._paddle.color;
        this._canvas.context.fillRect(
            this._paddle.x,
            this._paddle.y,
            this._paddle.width,
            this._paddle.height
        )

        this._canvas.context.fillStyle = this._opponent.color;
        this._canvas.context.fillRect(
            this._opponent.x,
            this._opponent.y,
            this._opponent.width,
            this._opponent.height
        )

        this._canvas.context.fillStyle = this._ball.color;
        this._canvas.context.fillRect(
            this._ball.x,
            this._ball.y,
            this._ball.radius,
            this._ball.radius
        )

        this._canvas.context.font = "30px Arial";
        this._canvas.context.fillStyle = "#FFFFFF";
        this._canvas.context.textAlign = "center";
        this._canvas.context.fillText(
            this._score[0] + ' / ' + this._score[1],
            this._canvas.width / 2,
            50
        )
    }
}