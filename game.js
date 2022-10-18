initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}


let cell = document.getElementsByClassName('col');
let x = 1,
    y = 15;

for (let i=0; i<cell.length; i++) {
   if (x>15) {
      x=1;
      y--;
   }
   cell[i].setAttribute('posX', x);
   cell[i].setAttribute('posY', y);
   x++;
}


function getSnake() {
   let posX = Math.round(Math.random()* (15 -3) +3);
   let posY = Math.round(Math.random()* (15 -1) +1);
   return [posX, posY];
}

let positionSnake = getSnake();
let snakeBody = [document.querySelector('[posX = "' + positionSnake[0] + '"][posY = "' +
 positionSnake[1] + '"]'), document.querySelector('[posX = "' + (positionSnake[0]-1) +
  '"][posY = "' + positionSnake[1] + '"]'), document.querySelector('[posX = "' + (positionSnake[0]-2) + '"][posY = "' + positionSnake[1] + '"]')];


for (let i = 0; i<snakeBody.length; i++) {
   snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('snakeHead');

console.log(snakeBody);

function createAple() {
   let posX = Math.round(Math.random()* (15 -3) +3);
   let posY = Math.round(Math.random()* (15 -1) +1);
   return [posX, posY];
}

let positionAple = createAple();
aple = document.querySelector('[posX = "' + positionAple[0] + '"][posY = "' +
positionAple[1] + '"]');

while(aple.classList.contains('snakeBody')) {
   let positionAple = createAple();
   aple = document.querySelector('[posX = "' + positionAple[0] + '"][posY = "' +
   positionAple[1] + '"]')
}
aple.classList.add('aple');
