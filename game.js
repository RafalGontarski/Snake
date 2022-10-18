const snakeElements = [];
let food;
let snakeDirection = translateNumberToDirection(getRandomInt(0,3));
let gameOver = false;

 createBoard();
 initSnake();

function initSnake() {
    let xPosition = getRandomInt(8,12);
    let yPosition = getRandomInt(8,12);
    console.log(xPosition, yPosition);
    console.log(snakeDirection);

    for (let i = 0; i < 3; i++) {
        if(snakeDirection === 'up') yPosition++;
        if(snakeDirection === 'down') yPosition--;
        if(snakeDirection === 'right') xPosition++;
        if(snakeDirection === 'left') xPosition--;

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
        let nextX = snakeElements[0]['dataset']['x'];

        if(snakeDirection === 'up') nextY++;
        if(snakeDirection === 'down') nextY--;
        if(snakeDirection === 'right') nextX++;
        if(snakeDirection === 'left') nextX--;

        if(isGameOver(nextX,nextY)) clearInterval(gameInterval);
        else {
            const nextSnakeElement = getBoardElement(nextX, nextY);

            snakeElements.unshift(nextSnakeElement);
            nextSnakeElement.classList.add('snake');

            if(nextSnakeElement !== food) {
                snakeElements.pop().classList.remove('snake');
            } else {
                food.classList.remove('food');
                createFood();
            }
        }
    }, 200);
}

function createFood(){
    let xPosition;
    let yPosition;

    do{
        xPosition = getRandomInt(1,20);
        yPosition = getRandomInt(1,20);
    } while (
        snakeElements.some(({ dataset }) => dataset.x == xPosition && dataset.y == yPosition
        )
    );

    food = getBoardElement(xPosition, yPosition);
    food.classList.add('food');
}

function getBoardElement(x,y){
    return document.querySelector(
        `[data-x="${x}"][data-y="${y}"]`);
}

function controlSnake() {
    window.addEventListener('keydown', function(e){
        e.preventDefault();

        if(e.keyCode === 37) {
            if (snakeDirection !== 'right')    snakeDirection = 'left';
        }
        if(e.keyCode === 38) {
            if (snakeDirection !== 'up')    snakeDirection = 'down';
        }
        if(e.keyCode === 39) {
            if (snakeDirection !== 'left')    snakeDirection = 'right';
        }
        if(e.keyCode === 40) {
            if (snakeDirection !== 'down')    snakeDirection = 'up';
        }
    });
}

function isGameOver(x,y){
    if (
        x < 1 ||
        x > 20 ||
        y < 1 ||
        y > 20 ||
        snakeElements.some(({ dataset }) => dataset.x == x && dataset.y == y)
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

function getRandomInt(min, max) {
    return Math.round(Math.random()*(max - min)) + min;
}

function translateNumberToDirection(number) {
    if (number === 0) return 'up';
    if (number === 1) return 'right';
    if (number === 2) return 'down';
    if (number === 3) return 'left';
}


