console.log("JS Connected");

// set up
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const grid = 20;
const size = canvas.width;

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

// game 
let snake = [];
let snakeLength = 1;

let x = 200;
let y = 200;

let xSpeed = grid;
let ySpeed = 0;

let foodX = 0;
let foodY = 0;
let foodType = "good";

let volume = 0;
let playing = false;

let exitX = size - grid;
let exitY = 200;

// food stuff
function spawnFood() {
  foodX = Math.floor(Math.random() * (size / grid)) * grid;
  foodY = Math.floor(Math.random() * (size / grid)) * grid;

  if (Math.random() < 0.15) {
    foodType = "bad";
  } else {
    foodType = "good";
  }
}

// reset mechanic
function resetGame() {
  snake = [];
  snakeLength = 1;

  x = 200;
  y = 200;

  xSpeed = grid;
  ySpeed = 0;

  volume = 0;

  spawnFood();
}

// try again 
function tryAgainScreen(message) {
  playing = false;
  restartBtn.style.display = "block";
  alert(message);
}

// draw
function draw() {
  if (!playing) return;

  ctx.clearRect(0, 0, size, size);

  // move
  x = x + xSpeed;
  y = y + ySpeed;

  // wall collision (not exit wall)
  if (x < 0 || y < 0 || y >= size) {
    volume = 0;
    tryAgainScreen("You hit the wall. Volume reset to 0.");
    return;
  }

  // exit wall collision
  if (x < exitX + grid && x + grid > exitX && y < exitY + grid && y + grid > exitY) {
    let choice = prompt("Exit reached! Keep this volume? " + volume + " (yes/no)");

    if (choice === "yes") {
      tryAgainScreen("Game ended. Final Volume: " + volume);
    } else {
      volume = 0;
      tryAgainScreen("Volume reset to 0.");
    }
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
      tryAgainScreen("You hit yourself. Volume reset to 0.");
      return;
    }
  }

  // eating food 
  if (x === foodX && y === foodY) {
    if (foodType === "good") {
      volume = volume + 1;
      snakeLength = snakeLength + 1;
    } else {
      volume = volume - 1;
      if (volume < 0) volume = 0;
    }

    spawnFood();
  }

  // draw food
  if (foodType === "good"){
    ctx.fillStyle = "green";
  } else {
    ctx.fillStyle = "red";
  }

  ctx.fillRect(foodX, foodY, grid, grid);

  // draw exit 
  ctx.fillStyle = "blue";
  ctx.fillRect(exitX, exitY, grid, grid);

  // draw snake 
  ctx.fillStyle = "purple";

  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, grid, grid);
  }

  // volume text
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Volume: " + volume, 10, 20);
}

// control
document.addEventListener("keydown", function(event) {

  if (event.key === "ArrowUp" && ySpeed === 0) {
    xSpeed = 0;
    ySpeed = -grid;
  }

  if (event.key === "ArrowDown" && ySpeed === 0) {
    xSpeed = 0;
    ySpeed = grid;
  }

  if (event.key === "ArrowLeft" && xSpeed === 0) {
    xSpeed = -grid;
    ySpeed = 0;
  }

  if (event.key === "ArrowRight" && xSpeed === 0) {
    xSpeed = grid;
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
spawnFood();
setInterval(draw, 120);