

function playSnake() {
    let startPanel = document.getElementById('start-panel');
    startPanel.classList.add('hidden');
    let scorePlacement = document.getElementById('score');
    scorePlacement.classList.remove('hidden');

    let snakeElements = [];
    let food;
    let snakeDirection = translateNumberToDirection(getRandomInt(0, 3));
    let gameOver = false;
    let score = 0;

    createBoard();
    initSnake();
    myPrompt();

    function initSnake() {
        snakeElements = [];
        let xPosition = getRandomInt(8, 12);
        let yPosition = getRandomInt(8, 12);
        // console.log(xPosition, yPosition);
        // console.log(snakeDirection);

        for (let i = 0; i < 3; i++) {
            if (snakeDirection === 'up') yPosition++;
            if (snakeDirection === 'down') yPosition--;
            if (snakeDirection === 'right') xPosition++;
            if (snakeDirection === 'left') xPosition--;

            const snakeElement = getBoardElement(xPosition, yPosition);
            snakeElements.unshift(snakeElement);
            snakeElement.classList.add('snake');
        }
        moveSnake();
        controlSnake();
        createFood();
    }


    function moveSnake() {
        let gameInterval = setInterval(function () {

            let nextY = snakeElements[0]['dataset']['y'];
            if (snakeDirection == 'down' && nextY == 1) nextY = 21;
            else if (snakeDirection == 'up' && nextY == 20) nextY = 0;

            // console.log(nextY)
            // console.log(snakeDirection)

            let nextX = snakeElements[0]['dataset']['x'];
            if (snakeDirection == 'right' && nextX == 20) nextX = 0;
            else if (snakeDirection == 'left' && nextX == 1) nextX = 21;

            if (snakeDirection === 'up') nextY++;
            else if (snakeDirection === 'down') nextY--;
            else if (snakeDirection === 'right') nextX++;
            else if (snakeDirection === 'left') nextX--;

            if (isGameOver(nextX, nextY))
            {
                gameOverMessage();
                destroyBoard();
                createBoard();
                restartScore();
                initSnake();
                clearInterval(gameInterval);
            }
            else
            {
                const nextSnakeElement = getBoardElement(nextX, nextY);

                snakeElements.unshift(nextSnakeElement);
                nextSnakeElement.classList.add('snake');

                if (nextSnakeElement !== food) {
                    snakeElements.pop().classList.remove('snake');
                } else {
                    food.classList.remove('apple');
                    createFood();
                    score += 10;
                    scorePlacement.innerHTML = `SCORE: ${score}`
                    console.log(score)
                }
            }
        }, 100);
    }

    function restartScore(){
        score = 0;
        scorePlacement.innerHTML = `SCORE: ${score}`;
        // return scorePlacement;
    }

    function gameOverMessage() {
        let overMessage = alert('Game Over! Try Again.');
        if (overMessage != null) {
            return overMessage;
        }
    }

    function createFood() {
        let xPosition;
        let yPosition;

        do {
            xPosition = getRandomInt(1, 20);
            yPosition = getRandomInt(1, 20);
        } while (
            snakeElements.some(({dataset}) => dataset.x == xPosition && dataset.y == yPosition
            )
            );

        food = getBoardElement(xPosition, yPosition);
        food.classList.add('apple');
    }

    function getBoardElement(x, y) {
        return document.querySelector(
            `[data-x="${x}"][data-y="${y}"]`);
    }

    function controlSnake() {
        window.addEventListener('keydown', function (e) {
            e.preventDefault();

            if (e.keyCode === 37) {
                if (snakeDirection !== 'right') snakeDirection = 'left';
            }
            if (e.keyCode === 38) {
                if (snakeDirection !== 'up') snakeDirection = 'down';
            }
            if (e.keyCode === 39) {
                if (snakeDirection !== 'left') snakeDirection = 'right';
            }
            if (e.keyCode === 40) {
                if (snakeDirection !== 'down') snakeDirection = 'up';
            }
        });
    }

    function isGameOver(x, y) {
        if (
            // x < 1 ||
            // x > 20 ||
            // y < 1 ||
            // y > 20 ||
            snakeElements.some(({dataset}) => dataset.x == x && dataset.y == y)
        )
            return true;
        return false;
    }

    function createBoard() {

        const board = document.getElementById('root');
        board.className = 'board';
        console.log(board);

        for (let j = 1; j <= 20; j++) {
            for (let i = 1; i <= 20; i++) {
                const div = document.createElement('div');
                div.className = 'board__element';
                div.dataset.y = j;
                div.dataset.x = i;

                board.appendChild(div);
            }
        }
    }

    function destroyBoard(){

        const board = document.getElementById('root');
        board.textContent = '';
    }

    function getRandomInt(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }

    function translateNumberToDirection(number) {
        if (number === 0) return 'up';
        if (number === 1) return 'right';
        if (number === 2) return 'down';
        if (number === 3) return 'left';
    }

    function myPrompt() {
        let person = prompt("Please enter your username", "username");
        if (person != null) {
            document.getElementById("text").innerHTML =
                "Hello " + person + "! Let's play the game!";
        }
    }

}