// Function to generate speed
function getRandomFloat() {
   var minSpeed=50;
   var maxSpeed=400;
   return Math.random() * (maxSpeed - minSpeed) + minSpeed;
}
function reset() {
   player.x=202;
   player.y=400;
}
//If the button "play again" is pressed, the game starts again
document.getElementById('playAgainButton').onclick = function() {
  document.querySelector('.congratulations').style.visibility='hidden';
};
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x=x;
    this.y=y;
    this.speed=speed;
    this.sprite = 'images/enemy-bug.png';
  };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=this.speed*dt;
    if (this.x>520){
      this.x=-50;
    }
    //Сheck for collisions
    var collisionsArea=65;
    if((this.x+collisionsArea)>=player.x && this.x<=(player.x+collisionsArea) && (this.y+collisionsArea)>=player.y && this.y<=(player.y+collisionsArea)){
      reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
    this.x=x;
    this.y=y;
    this.sprite = 'images/char-boy.png';
};
    // This class requires an update(), render() and
    // a handleInput() method.
Player.prototype.update = function(dt) {
   if(player.y<=10){
     setTimeout(function() {
       reset();
       document.querySelector('.congratulations').style.visibility='visible';
     }, 1000);
   }
};
Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput=function(keyCode) {
   var distanceLeftRight=101;
   var distanceUpDown=85;
   if (keyCode=='left' && player.x>=distanceLeftRight){
     player.x=player.x-distanceLeftRight;
   }else if(keyCode=='up' && player.y>=0){
     player.y=player.y-distanceUpDown;
   }else if(keyCode=='right' && player.x<=303){
     player.x=player.x+distanceLeftRight ;
   }else if(keyCode=='down' && player.y<=350){
     player.y=player.y+distanceUpDown;
   }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemyStartPosition=-50;
var firstRowEnemyPosition=65;
var secondRowEnemyPosition=150;
var thirdRowEnemyPosition=230;
var enemy1=new Enemy(enemyStartPosition, firstRowEnemyPosition, getRandomFloat());
var enemy2=new Enemy(enemyStartPosition, secondRowEnemyPosition, getRandomFloat());
var enemy3=new Enemy(enemyStartPosition, secondRowEnemyPosition, getRandomFloat());
var enemy4=new Enemy(enemyStartPosition, thirdRowEnemyPosition, getRandomFloat());
var allEnemies=[enemy1,enemy2,enemy3,enemy4];
// Place the player object in a variable called player
var player= new Player(202,400);


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
