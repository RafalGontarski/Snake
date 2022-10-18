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


let direction = 'right';

function steps() {
   let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
   snakeBody[0].classList.remove('snakeHead');
   snakeBody[snakeBody.length-1].classList.remove('snakeBody');
   snakeBody.pop();
   
   
   if (direction == 'right') {
      //warunek przechodzenia przez sciany
      if (snakeCoordinates[0] < 15) {
         snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] +1)+ '"][posY = "' +
         snakeCoordinates[1] + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' +
         snakeCoordinates[1] + '"]'));
      }
   } else if (direction == 'left') {
      if (snakeCoordinates[0] > 1) {
         snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] -1)+ '"][posY = "' +
         snakeCoordinates[1] + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "15"][posY = "' +
         snakeCoordinates[1] + '"]'));
      }
   } else if (direction == 'up') {
      if (snakeCoordinates[1] < 15) {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' +
         (+snakeCoordinates[1]+1) + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
      }
   } else if (direction == 'down') {
      if (snakeCoordinates[1] > 1) {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' +
         (+snakeCoordinates[1]-1) + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "15"]'));
      }
   }
   
   snakeBody[0].classList.add('snakeHead');
   for (let i = 0; i <snakeBody.length; i++) {
      snakeBody[i].classList.add('snakeBody');
   }
}


let timeSet = setInterval(steps, 300);

window.addEventListener('keydown', function(e) {
   if (e.key == "ArrowLeft" && direction!== "ArrowRight") {
      direction = 'left';
      console.log(true);
   }

   else if (e.key == "ArrowUp" && direction!== "ArrowDown") {
      direction = 'up';
      console.log(true);
   }

   else if (e.key == "ArrowRight" && direction!== "ArrowLeft") {
      direction = 'right';
      console.log(true);
   }

   else if (e.key == "ArrowDown" && direction!== "ArrowUp") {
      direction = 'down';
      console.log(true);
   }
});