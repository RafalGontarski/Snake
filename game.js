initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)
   let welcomePage = document.getElementById('start-panel');
   welcomePage.classList.add('hidden');
   let playPanel = document.getElementById('play-panel');
   playPanel.classList.remove('hidden');


   function sound(src){
      this.sound = document.createElement('audio');
      this.sound.src = src;
      this.sound.setAttribute('preload', 'auto');
      this.sound.setAttribute('controls', 'none');
      this.sound.style.display ='none';
      document.body.appendChild(this.sound)
      this.play = function (){
         this.sound.play();
      }
      this.stop = function (){
         this.sound.pause()
      }
   }
   function playTheme(){
      myMusic.play();
   }
   function stopMusic(){
      myMusic.stop();
   }
   
   let myMusic = new sound('sound/eyeOfTheTiger.mp3');
   let myEatingSound = new sound('sound/ra.wav');
   let boomSound = new sound('sound/boom.mp3')

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

   snakeBody[snakeBody.length - 1].classList.add('snakeTail');
   snakeBody[0].classList.add('snakeHead');

   console.log(snakeBody);


   //tworzenie jablka
   let aple;

   function createAple() {
      function genAple(){
      let posX = Math.round(Math.random()* (15 -3) +3);
      let posY = Math.round(Math.random()* (15 -1) +1);
      return [posX, posY];
      }

      let positionAple = genAple();
      aple = document.querySelector('[posX = "' + positionAple[0] + '"][posY = "' +
      positionAple[1] + '"]');

      while(aple.classList.contains('snakeBody')) {
         let positionAple = genAple();
         aple = document.querySelector('[posX = "' + positionAple[0] + '"][posY = "' +
         positionAple[1] + '"]')
      }

      aple.classList.add('aple');
   }

   createAple();



   let input = document.createElement('input');
   const bodyElement = document.querySelector('.title');

   bodyElement.after(input);
   input.style.cssText = `
   margin: auto;
   margin-top: 20px;
   font-size: 30px;
   display:block;
   margin-bottom:15px;
   `;

   let score = 0;
   input.value = `Youre score: ${score}`;

   let direction = 'right';
   let step = false;


   function steps() {
      let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
      snakeBody[0].classList.remove('snakeHead');
      snakeBody[snakeBody.length-1].classList.remove('snakeTail');
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

      //wydluzanie snaka
      if (snakeBody[0].getAttribute('posX')== aple.getAttribute('posX') && snakeBody[0].getAttribute('posY')== aple.getAttribute('posY')) {
         console.log(true)
         aple.classList.remove('aple');
         let xElem = snakeBody[snakeBody.length - 1].getAttribute('posX');
         let yElem = snakeBody[snakeBody.length - 1].getAttribute('posY');
         snakeBody.push(document.querySelector('[posX = "' + xElem + '"][posY = "' + yElem + '"]'));
         myEatingSound.play();
         createAple();
         score++;
         document.getElementById('score').innerText = `Score: ${score}`
         // input.value = `Youre score: ${score}`;
      }

      if (snakeBody[0].classList.contains('snakeBody')) {
         setTimeout(() => {
              alert(`Game over! Youre score: ${score}`)
              snakeBody[0].style.backgroundSize = "cover";
         }, 200);

         clearInterval(timeSet);
         snakeBody[0].style.background = 'url(/img/1234567.png) center no-repeat';
         snakeBody[0].style.backgroundSize = "cover";
         boomSound.play();
      }

      snakeBody[0].classList.add('snakeHead');
      snakeBody[snakeBody.length-1].classList.add('snakeTail');

      for (let i = 0; i <snakeBody.length; i++) {
         snakeBody[i].classList.add('snakeBody');
      }

      step = true;
   }



   let difficultLevel;
   if (score < 2){difficultLevel = 300}
   else {difficultLevel = 150};
   let timeSet = setInterval(steps, difficultLevel);



   window.addEventListener('keydown', function(e) {
      if (step == true) {
         if (e.key == "ArrowLeft" && direction!= 'right') {
            direction = 'left';
            step = false;
            snakeBody[0].style.cssText =`transform: rotate(-180deg);`;
         }else if (e.key == "ArrowUp" && direction!= 'down') {
            direction = 'up';
            step = false;
            snakeBody[0].style.cssText =`transform: rotate(-90deg);`;
         }else if (e.key == "ArrowRight" && direction!= 'left') {
            direction = 'right';
            step = false;
         }else if (e.key == "ArrowDown" && direction!= 'up') {
            direction = 'down';
            step = false;
           snakeBody[0].style.cssText =`transform: rotate(90deg);`;
         }
      }

   });

}