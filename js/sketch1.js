var skategif;
var obstacles = [];
var numObstacles = 3;
let resetbutton;
let backgroundmusic;


function preload() {
  skategif = loadImage("imgs/skategif.gif");
  obstacleImage = loadImage("imgs/rollerskate.png");
  street = loadImage("imgs/street.gif");
  soundFormats("mp3");
  backgroundmusic = loadSound("imgs/background.mp3");
}

var playerX; // X-coordinate of the player
var playerSize = 60; // Size of the player
var gameLost = false; // Game over state
var gameWon = false; //win state
var timer = 15; //# of seconds for timer

function setup() {
  var canvas = createCanvas(790, 530);
  canvas.parent('canvas');
  song();
  playerX = width / 2;

  for (var i = 0; i < numObstacles; i++) {
    obstacles[i] = new obstacle();
  }

  setInterval(updateTimer, 1000);
}

//RESET BUTTON FUNCTION
function resetSketch() {
  gameLost = false;
  gameWon = false;
  timer = 15;
  
  for (var i = 0; i < numObstacles; i++) {
    obstacles[i].speed = random(6);
    obstacles[i].y = -obstacles[i].size;
    
  }
  clear();
  //reset gamewon, gamelost, timer, obstaclespeed, background , background gif
  //attach this function to a button that shows when u lose
}

function song() {
  backgroundmusic.play();
  backgroundmusic.loop();
  backgroundmusic.setVolume(0.4);
  userStartAudio();
}

function draw() {
  background(street);

  // GAME OVER STATE
  if (gameLost) {
    for (var i = 0; i < numObstacles; i++) {
      obstacles[i].speed = 0;
    }
    timer = "you lost";
    
  //DECLARING RESET BUTTON
  resetbutton = createButton("retry");
  resetbutton.mousePressed(resetSketch);
  resetbutton.position(340, 235);
    background(150, 0, 0);
    //GAME WON STATE
  } else if (gameWon) {
    background("green");
    timer = "you won";
    for (var i = 0; i < numObstacles; i++) {
      obstacles[i].speed = 0;
    }
  }
  text(timer, 20, 20);

  //else if

  // Display the player square
  image(skategif, playerX, height - playerSize, playerSize, playerSize);

  for (var i = 0; i < numObstacles; i++) {
    obstacles[i].display();
    obstacles[i].move();
    obstacles[i].reset();

    if (
      playerX < obstacles[i].x + obstacles[i].size &&
      playerX + playerSize > obstacles[i].x &&
      height - playerSize < obstacles[i].y + obstacles[i].size
    ) {
      gameLost = true;
    }
  }

  //move the blue square depending on arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= 5; // Move the player square left
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerX += 5; // Move the player square right
  }
}

//TIMER RESET
function updateTimer() {
  if (timer > 0) {
    // Decrement the timer by 1
    timer--;
  } else {
    // Display "Game Over" when the timer reaches zero
    clearInterval(); // Stop the interval
    gameWon = true;
  }
}

//OBSTACLES
class obstacle {
  constructor() {
    this.size = 50; //pixel width of ing
    this.x = random(width - this.size);
    this.y = -this.size;
    this.speed = random(6);
  }

  display() {
    image(obstacleImage, this.x, this.y, this.size, this.size);
  }

  move() {
    this.y += this.speed;
  }

  reset() {
    if (this.y > height) {
      this.x = random(width - this.size);
      this.y = -this.size;
    }
  }
}
