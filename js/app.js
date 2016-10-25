// G L O B A L
var gWindowWidth = 505;
var gImageWidth = 101;

var gGridStepX = 101;
var gGridStepY = 82;

var gSpriteWidth = 80;
var gSpriteHeight = 50;

var gGridYOffset = -2;

// Enemies our player must avoid
var Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.width = gSpriteWidth;   // image size
    this.height = gSpriteHeight;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;

    // check borders
    if(this.x > gWindowWidth)
      this.x = -gImageWidth;
};

// reset position
Enemy.prototype.reset = function(x, y){
  this.x = x;
  this.y = y;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
  this.sprite = 'images/char-horn-girl.png';

  this.width = gSpriteWidth;   // image size
  this.height = gSpriteHeight;
};

// reset position
Player.prototype.reset = function(x, y){
  this.x = x;
  this.y = y;
}

Player.prototype.update = function(dt){
  // we can do character anoimation here...
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e){
  console.log(e);
  if(e == 'up'){
    if(this.y - gGridStepY >= gGridYOffset)
    this.y -= gGridStepY;

    // control the end of the game
    if (this.y == gGridYOffset)
    {
      this.sprite = 'images/char-princess-girl.png';
      // resetTheGame();
    }
  }
  else if(e == 'down'){
    if(this.y + gGridStepY <= 5*gGridStepY)
      this.y += gGridStepY;
  }
  else if(e == 'left'){
    if(this.x - gGridStepX >= 0)
    this.x -= gGridStepX;
  }
  else if(e == 'right'){
    if(this.x + gGridStepX <= 4*gGridStepX)
    this.x += gGridStepX;
  }
};

// check for collisions
function checkCollisions()
{
  allEnemies.forEach(function(enemy) {
    if(player.x  < (enemy.x + enemy.width) && (player.x + player.width) > enemy.x &&
      player.y < (enemy.y + enemy.height) && (player.y + player.height) > enemy.y)
      {
        console.log('Collision!');
        resetTheGame();
      }
  });
};

// reset game parameters
function resetTheGame(){
    enemy1.reset(0, 65);
    enemy2.reset(-100, 150);
    enemy3.reset(150, 150);
    enemy4.reset(-270, 235);

    player.reset(1*gGridStepX, 5*gGridStepY + gGridYOffset);
    player.sprite = 'images/char-horn-girl.png';
}

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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = new Array();

var enemy1 = new Enemy(100);
allEnemies.push(enemy1);
var enemy2 = new Enemy(150);
allEnemies.push(enemy2);
var enemy3 = new Enemy(150);
allEnemies.push(enemy3);
var enemy4 = new Enemy(120);
allEnemies.push(enemy4);

var player = new Player();

resetTheGame();
