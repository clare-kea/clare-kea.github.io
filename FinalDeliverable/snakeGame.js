console.log("JS Connected");

// set up
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const grid = 20;
const size = canvas.width;

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const volumeText = document.getElementById("volumeText");
// game 
let snake = [];
let snakeLength = 1;

let x = 200;
let y = 200;

let xSpeed = grid;
let ySpeed = 0;

let foodX = 0;
let foodY = 0;
let foodType = "goodS";

let volume = 0;
let playing = false;

let exitX = size - grid;
let exitY = 200;


function updateVolText(){
    volumeText.innerText = "Your Volume: " + volume;
}

// food stuff
function spawnFood() {
    let validSpot = false;
    // dont want food to spawn inside exit 
    while (validSpot === false) {
        foodX = Math.floor(Math.random() * (size / grid)) * grid;
        foodY = Math.floor(Math.random() * (size / grid)) * grid;
        
        if (foodX === exitX && foodY === exitY){
            validSpot = false;
        } else {
            validSpot = true;
        }
    }

    let randomNum = Math.random();

    if (randomNum < 0.2){
        foodType = "goodB";
    } else if (randomNum < 0.5){
        foodType = "bad";
    } else {
        foodType = "goodS";
    }
}

// reset 
function resetGame() {
  snake = [];
  snakeLength = 1;

  x = 200;
  y = 200;

  xSpeed = grid;
  ySpeed = 0;

  volume = 0;

  updateVolText();

  spawnFood();
}

// try again 
function tryAgain(message) {
  playing = false;
  restartBtn.style.display = "block";
  alert(message);
}


function draw() {
  if (playing === false) {
    return;
  }

  ctx.clearRect(0, 0, size, size);

  ctx.fillStyle = "black";

  ctx.fillRect(0,0,size,size);

  // move
  x = x + xSpeed;
  y = y + ySpeed;

  // exit wall collisions 
  if (
    x < exitX + grid &&
    x + grid > exitX &&
    y < exitY + grid &&
    y + grid > exitY
  ) {

    let choice = prompt(
      "Exit reached! Is this the volume that you don't want to have? " + volume + " (yes/no)"
    );

    if (choice === "no") {

      tryAgain(
        "Game ended. Final Volume: " + volume);

    } else {

      volume = 0;
      updateVolText();

      tryAgain(
        "Volume reset to 0.");
    }

    return;
  }

  // other wall collisions
  let hitRightWall = x >= size;

  let hitLeftWall = x < 0;

  let hitTopWall = y < 0;

  let hitBottomWall = y >= size;

  if (hitLeftWall || hitTopWall || hitBottomWall || hitRightWall) {
    volume = 0;
    updateVolText();

    tryAgain(
      "You hit the wall. Volume reset to 0."
    );
    return;
  }

  // snake length
  snake.push({ x: x, y: y });

  while (snake.length > snakeLength) {
    snake.shift();
  }

  // self collision
  for (let i = 0; i < snake.length - 1; i++) {
    if (snake[i].x === x && snake[i].y === y) {
      volume = 0;
      updateVolText();
      tryAgain("You ran into yourself. Volume reset to 0.");
      return;
    }
  }

  // draw and eat food
  if (x === foodX && y === foodY){
    if (foodType === "goodS"){
        let smallAdd = Math.floor(Math.random() * 10) + 1;
        volume = volume + smallAdd;
        snakeLength = snakeLength + 1;
    }
    else if (foodType === "goodB"){
        let BigAdd = Math.floor(Math.random() * 11) + 10;
        volume = volume + BigAdd;
        snakeLength = snakeLength + 1;
    }
    else {
        let randomSubtract = 
            Math.floor(Math.random() * 10) + 1;
            volume = volume - randomSubtract;
            if (volume < 0) {
                volume = 0;
            }
        }

        updateVolText();
        if (volume >= 100){
            
            volume = 100;
            updateVolText();

            setTimeout(function() {
                tryAgain("You reached the max volume.");
            }, 50);
            return;
        }
        spawnFood();
     }

     if (foodType === "goodS"){
        ctx.fillStyle = "lime";
     }
     else if (foodType === "goodB"){
        ctx.fillStyle = "orange";
     }
     else {
        ctx.fillStyle = "crimson";
     }

     ctx.fillRect(foodX, foodY, grid, grid);

     // draw exit
     ctx.fillStyle = "deepSkyBlue";
     ctx.fillRect(exitX, exitY, grid, grid);

     // draw snake
     ctx.fillStyle = "darkViolet";

     for (let i = 0; i < snake.length; i++){
        ctx.fillRect(snake[i].x, snake[i].y, grid, grid);
     }
    }

// control
document.addEventListener("keydown", function(event) {

  if (event.key === "ArrowUp" && ySpeed === 0) {
    xSpeed = 0;
    ySpeed = grid;
  }

  if (event.key === "ArrowDown" && ySpeed === 0) {
    xSpeed = 0;
    ySpeed = -grid;
  }

  if (event.key === "ArrowLeft" && xSpeed === 0) {
    xSpeed = grid;
    ySpeed = 0;
  }

  if (event.key === "ArrowRight" && xSpeed === 0) {
    xSpeed = -grid;
    ySpeed = 0;
  }
});

// start button
startBtn.addEventListener("click", function() {
  resetGame();
  playing = true;
  restartBtn.style.display = "none";
});

// restart button
restartBtn.addEventListener("click", function() {
  resetGame();
  playing = true;
  restartBtn.style.display = "none";
});

// start the game 
updateVolText();
spawnFood();
setInterval(draw, 120);