const snakeElements = [];
let food;
let snakeDirections = translateNumberToDirection(getRandomInt(0,3));
let gameOver = false;

 createBoard();
 initSnake();

function initSnake() {
    let xPosition = getRandomInt(5,15);
    let yPosition = getRandomInt(5,15);
    console.log(xPosition, yPosition);
    console.log(snakeDirections);
    for (let i = 0; i < 3; i++) {
        if(snakeDirections === 'up') yPosition--;
        if(snakeDirections === 'down') yPosition++;
        if(snakeDirections === 'right') xPosition++;
        if(snakeDirections === 'left') xPosition--;

        const snakeElement = document.querySelector(
            `[data-x="${xPosition}"][data-y="${yPosition}"]`
        );
        snakeElements.unshift(snakeElement);
        snakeElement.classList.add('snake');
    }
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
    return Math.floor(Math.random()*(max - min)) + min;
}

function translateNumberToDirection(number) {
    if (number === 0) return 'up';
    if (number === 1) return 'right';
    if (number === 2) return 'down';
    if (number === 3) return 'left';
}


