const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

let gameOn = false;

let squirrelArray = [] //obstacle  = squirrel array

let animationId;
let squirrelId; // obstacle  = squirrel

const background = new Image()
background.src = './images/forest-bg.png'

const dugImg = new Image()
dugImg.src = './images/dug-walking.png'

const squirrelImg = new Image()
squirrelImg.src = './images/squirrel.png'

const dug = {
  x: 100,
  y: 300,
  width: 200,
  height: 175,


  update() {

    ctx.drawImage(dugImg, this.x, this.y, this.width, this.height);
  },

  newPosition(event) {

    switch (event.code) {
      case 'ArrowLeft':
        this.x -= 5
        break;
      case 'ArrowRight':
        this.x += 5
        break;
      case 'ArrowUp':
        this.y -= 10;
        break;
      case 'ArrowDown':
        this.y += 20;
        break;
    }
  }
}


class Squirrel {

  constructor() {
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - 100);
    this.bottomY = this.y + 100;
    this.width = 429;
  }
  update() {
    this.x -= 2
  }
  draw() {
    ctx.drawImage(squirrelImg, this.x, this.y, 100, 100); //keep the 100s
  }
}

function generateSquirrels() {
  console.log("new squirrel")
  squirrelArray.push(new Squirrel())
  console.log("squirrel", squirrelArray)
}


function checkCollision(squirrel) {
  if (
    dug.x + 20 < squirrel.x + 100 &&
    dug.x + dug.width > squirrel.x + 10 &&
    dug.y + 20 < squirrel.bottomY - 10 &&
    dug.y + dug.height > squirrel.y + 10
  ) {
    return true;
  }
  return false;
}
console.log(squirrelImg.width, "this is the squirrel image width");
function animationLoop() {

  ctx.clearRect(0, 0, 1200, 600);
  ctx.drawImage(background, 0, 0, 1200, 600);

  dug.update()
  for (let i = 0; i < squirrelArray.length; i++) {

    if (squirrelArray[i].x < 0) {
      squirrelArray.splice(i, 1)
    }
    squirrelArray[i].update()
    squirrelArray[i].draw()

    if (checkCollision(squirrelArray[i])) {
      console.log("dug", dug)
      console.log("squirrel 104", squirrelArray[i])
      gameOn = false;
      clearInterval(animationId);
      clearInterval(squirrelId);
      ctx.font = '50px Arial';
      ctx.fillStyle = 'red';
      ctx.fillText('Game Over', 500, 300);
    }

  }

}
// squirrelArray.forEach((squirrel, i, arr) => {
//   if (squirrel.x < 0) {
//     arr.splice(i, 1)
//   }
//   squirrel.update()
//   squirrel.draw()

//   if (checkCollision(squirrel)) {
//     gameOn = false;
//     clearInterval(animationId);
//     clearInterval(squirrelId);
//     ctx.font = '50px Arial';
//     ctx.fillStyle = 'red';
//     ctx.fillText('Game Over', 500, 300);
//   }
// })


function startGame() {
  gameOn = true;
  animationId = setInterval(animationLoop, 16);
  squirrelId = setInterval(generateSquirrels, 3000); // probably 3000 better

}

window.onload = function () {
  document.getElementById("start-button").onclick = function () {

    if (!gameOn) {

      let logo = document.getElementById('logo');
      logo.style.visibility = 'hidden';
      logo.style.height = '0px';

      let container = document.getElementById('game-board');
      container.style.visibility = 'visible';
      container.style.height = '600px';

      let gameBoard = document.getElementById('my-canvas');
      gameBoard.height = '600';
      gameBoard.width = '1200';

      startGame();
    }

  };

  document.addEventListener("keydown", (event) => {

    dug.newPosition(event)


  });

};