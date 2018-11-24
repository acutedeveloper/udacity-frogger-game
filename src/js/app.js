/*global ctx:true*/
/*global dt:true*/
/*global Resources:true*/
/*eslint no-undef: "error"*/

// Enemies our player must avoid
class Enemy {

	constructor(rowStart) {

		// constiables applied to each of our instances go here,
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
		this.crashHeight = 70;
		this.crashWidth = 95;

		this.rowStart = rowStart > 0 ? this.y + (this.moveVer * rowStart) : this.y;
		this.start = true;

	}

	speed(min = 150, max = 350) {
		this.speedValue = Math.floor( Math.random() * (max - min) + min );
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {

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
			this.x = -85;
		}
		this.render();

	}

	// Draw the enemy on the screen, required method for game
	render() {
		if(this.start === true)
			this.y = this.rowStart;
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

		this.crashZoneX = this.x + 5;
		this.crashZoneY = this.y + 83;

		ctx.rect(this.crashZoneX, this.crashZoneY, this.crashWidth, this.crashHeight);

	}

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

	constructor() {

		// Initial character graphic
		this.sprite = 'images/char-boy.png';
		this.height = 171;
		this.width = 101;

		// Initial character position
		this.x = 200;
		this.y = 370;

		// Crash Zone
		this.crashHeight = 70;
		this.crashWidth = 95;
		this.crashZoneX;
		this.crashZoneY;

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

	update() {
		if(this.checkWin()){
			this.logWin();
		} else {
			this.render();
		}
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		// Render the crashZone

		this.crashZoneX = this.x + 5;
		this.crashZoneY = this.y + 100;

		ctx.rect(this.crashZoneX, this.crashZoneY, this.crashWidth, this.crashHeight);

	}

	handleInput(keyCode) {

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

	checkWin() {
		this.detectCollision();
		return this.y < this.canvasWinZone ? true : false;
	}

	logWin() {
		this.reset();
		gameInterface.updateScore();
	}

	reset() {
		this.y = 370;
		this.x = 200;
		this.render();
	}

	detectCollision() {

		Object.apply(allEnemies, this);

		allEnemies.forEach((enemy) => {

			// Is the player touched by an enemy?
			if (this.crashZoneX < enemy.crashZoneX + enemy.crashWidth  && this.crashZoneX + this.crashWidth  > enemy.crashZoneX &&
				this.crashZoneY < enemy.crashZoneY + enemy.crashHeight && this.crashZoneY + this.crashHeight > enemy.crashZoneY) {
				this.reset();
				// If the player is touched, he needs to loose one life and then be set back to the starting position.
				// However if they have 0 lives. the game is over.
				gameInterface.removeLife();
			}

		});

	}

}

const gameData = {
	score: 0,
	lives: 3
};

class GameInterface {
	constructor() {
		this.modal = document.querySelector('.arcade-modal');
		this.modalButton = document.querySelector('.js__arcade-reset');

		this.scoreBoard = document.querySelector('.interface__scoreboard-value');
		this.lives = document.querySelector('.interface__lives');

		this.modalButton.addEventListener('click', () => this.resetInterface() );
		this.updateLives();
		this.enableControls();
	}

	enableControls() {
		document.addEventListener('keyup', this.gameKeys);
	}

	disableControls() {
		document.removeEventListener('keyup', this.gameKeys);
	}

	gameKeys(e){
		const allowedKeys = {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
		};

		player.handleInput(allowedKeys[e.keyCode]);
	}

	toggleModal() {
		this.modal.classList.toggle('js-active');
		this.disableControls();
	}

	updateScore() {
		gameData.score += 10;
		this.scoreBoard.innerHTML = this.formatScore(gameData.score, 5);
	}

	removeLife() {
		gameData.lives -= 1;
		this.updateLives();
	}

	updateLives() {
		if(gameData.lives <= 0) {
			this.toggleModal();
		}
		// empty the lives view
		this.lives.innerHTML = '';

		let i = 0;

		const life = document.createElement('img');
		life.setAttribute('class', 'interface__life');
		life.setAttribute('src', 'images/heart.png');

		// update the lives view
		while(gameData.lives > i) {
			this.lives.appendChild(life.cloneNode(true));
			i++;
		}
	}

	formatScore(num, padlen, padchar) {
		var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
		var pad = new Array(1 + padlen).join(pad_char);
		return (pad + num).slice(-pad.length);
	}

	resetInterface() {
		gameData.score = 0;
		gameData.lives = 3;
		this.scoreBoard.innerHTML = gameData.score;
		this.updateLives();
		this.toggleModal();
		this.enableControls();
	}

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a constiable called player
const player = new Player();
const gameInterface = new GameInterface();

const bug1 = new Enemy(0);
const bug2 = new Enemy(1);
const bug3 = new Enemy(2);

const allEnemies = [bug1, bug2, bug3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
