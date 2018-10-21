// Enemies our player must avoid
var Enemy = function(rowStart) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 53;

    // Canvas extremeties
    this.canvasTopEdge = -45;
    this.canvasBottomEdge = 370;
    this.canvasLeftEdge = -2;
    this.canvasRightEdge = 400;
    this.canvasWinZone = 38;

    // Distance for enemy character to move x y.
    this.moveHor = 101;
    this.moveVer = 83;
    this.speedValue = '';

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.height = 171;
    this.width = 101;

    // Crash Zone
    this.crashHeight = this.height - 50;
    this.crashWidth = this.width - 50;

    this.rowStart = rowStart > 0 ? this.y + (this.moveVer * rowStart) : this.y;
    this.start = true;

};

Enemy.prototype.speed = function(min = 150, max = 350) {
  this.speedValue = Math.floor( Math.random() * (max - min) + min );
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if(this.speedValue === ''){
      this.speed();
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 501){
      this.x += this.speedValue * dt;
    } else {
      //reset
      this.speed();
      console.log('New speed', this.speedValue)
      this.x = -85;
    }
    this.render();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if(this.start === true)
      this.y = this.rowStart;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player() {

  // Initial character graphic
  this.sprite = 'images/char-boy.png';
  this.height = 171;
  this.width = 101;

  // Crash Zone
  this.crashHeight = this.height - 50;
  this.crashWidth = this.width - 50;

  // Initial character position
  this.x = 200;
  this.y = 370;

  // Canvas extremeties
  this.canvasTopEdge = -45;
  this.canvasBottomEdge = 370;
  this.canvasLeftEdge = -2;
  this.canvasRightEdge = 400;
  this.canvasWinZone = 38;

  // Distance for character to move x y.
  this.moveHor = 101;
  this.moveVer = 83;

}

Player.prototype.update = function(dt) {
  if(this.checkWin()){
    this.logWin();
  } else {
    this.render();
  }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode) {

  switch (keyCode) {
    case 'up':
      this.y > this.canvasTopEdge ? this.y -= this.moveVer : this.y;
      break;
    case 'down':
    this.y < this.canvasBottomEdge ? this.y += this.moveVer : this.y;
      break;
    case 'left':
      this.x > this.canvasLeftEdge ? this.x -= this.moveHor : this.x;
      break;
    case 'right':
      this.x < this.canvasRightEdge ? this.x += this.moveHor : this.x;
      break;
    default:

  }
  this.update();
}

Player.prototype.checkWin = function() {
  this.detectCollision();
  return this.y < this.canvasWinZone ? true : false;
}

Player.prototype.logWin = function() {
  console.log("Won");
  this.reset();
}

Player.prototype.reset = function() {
  this.y = 370;
  this.x = 200;
  this.render();
}

Player.prototype.detectCollision = function (){

  Object.apply(allEnemies, this);

  allEnemies.forEach((enemy) => {

    if (this.x < enemy.x + enemy.crashWidth  && this.x + this.crashWidth  > enemy.x &&
      this.y < enemy.y + enemy.crashHeight && this.y + this.crashHeight > enemy.y) {
        this.reset();
      }

  });

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var bug1 = new Enemy(0);
var bug2 = new Enemy(1);
var bug3 = new Enemy(2);

var allEnemies = [bug1, bug2, bug3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
