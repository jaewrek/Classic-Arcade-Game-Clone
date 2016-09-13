// Jerrik Neri
// Udacity
// Front End Web Development
// Classic Arcade Game Project

// README
//      To run, open index.html in browser.
//      Use WASD or up, down left, right arrow keys.
//      Reset on collision and when reach water.
//      Have fun!


// Defined pixels for moving horizontally and vertically.
var horizontal = 101;
var vertical = 82; 

// Area around Player/Enemy to detect for collision.
var bufferSpace = 30

// Player starting point.
var startX = (2 * 101);
var startY = (4 * 95);

// Enemy starting point. X is ranodmly generated using .random() to randomly
// pull number from enemyPotentialStartX array. Y is randomly generated 
// using .random() to generate number from 1-3 inclusive to pass into
// array of potential starts on Y axis.
// Generated enemies are pushed in allEnemies array
var generateRandomEnemies = function() {
    // Randomized arguments passed in, X location, Y location, and speed.
    var generateEnemy = new Enemy(enemyPotentialStartX[(Math.floor((Math.random() * 4) + 1))], enemyPotentialStartY[(Math.floor((Math.random() * 3) + 1))], Math.floor((Math.random() * 5) + 1));
    allEnemies.push(generateEnemy);
}

// Reset for Enemy x location when reach end of screen.
var enemyStartX = -300;
// Array place holders to for randomizaer.
var enemyPotentialStartX = ["placeholder", startX-vertical, startX-(vertical*2), startX+vertical, startX+(vertical*2)]
var enemyPotentialStartY = ["placeholder", (startY-(vertical*2)), (startY-(vertical*3)), (startY-(vertical*4))];
// var enemyStartY = enemyPotentialStartY[(Math.floor((Math.random() * 3) + 1))];


// Enemies our player must avoid
// Takes in 3 arguments, X component, Y component, and movement speed.
var Enemy = function(locX, locY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = locX;
    this.y = locY;
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. 
    this.x = this.x + (dt * horizontal * this.speed);
    if (this.x > 504) {
        this.x = enemyStartX;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class. Always starts at specified startX and startY.
// Prototype functions: update, render, handleInput, checkCollisions
var Player = function() {
    this.x = startX;
    this.y = startY;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {

}

// Draw Player to canvas with current X & Y components
// Call to checkCollisions to see if collided with Enemy.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.checkCollisions();
}

// Translates keys watch in event listener to movements for Player
// Up down left right; Sets boundaries to prevent falling off map.
Player.prototype.handleInput = function(input) {
    if ((input == 'left') && (this.x > 0)) {
        this.x -= horizontal;
    }
    if ((input == 'right') && (this.x < 404)) {
        this.x += horizontal;
    }
    if ( (input == 'up') && (this.y >= (startY-(vertical*4)) ) ) {
        this.y -= vertical;
        // Check if player reached water -- Game won. 
        if (this.y < (startY-(vertical*4) ) ) {
            this.gameWin();
            this.reset();
        }
    }
    if ((input == 'down') && (this.y < startY)) {
        this.y += vertical;
        // Check if player out of bonds -- reset.
        // if (this.y == 606) {
        //     this.reset();
        // } 
    }

    

}

Player.prototype.gameWin = function() {
    // Do something when player reaches water and game is won.
}

// Check for collisions between Player and Enemy
// 'if' within range specified by bufferSpace
// reset player
Player.prototype.checkCollisions = function() {
    var pX = this.x;
    var pY = this.y;

    for (var count = 0; count < allEnemies.length; count++){
         var eX = allEnemies[count].x;
         var eY = allEnemies[count].y;
         if (pX >= (eX - bufferSpace) && pX <= (eX + bufferSpace)){
            if (pY >= (eY - bufferSpace) && pY <= (eY + bufferSpace)){
                this.reset();
                console.log("Player reset");
            }
        }
    }

    // allEnemies.forEach(function(enemy) {
    //     var eX = enemy.x;
    //     var eY = enemy.y;
    //     if (pX >= (eX - bufferSpace) && pX <= (eX + bufferSpace)){
    //         if (pY >= (eY - bufferSpace) && pY <= (eY + bufferSpace)){
    //             Player.reset();
    //             console.log("Player reset");
    //         }
    //     }
        
    // })
    
}

Player.prototype.reset = function() {
    this.x = startX;
    this.y = startY;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
 var allEnemies = [];

// Instantiate 10 enemies by calling to generateRandomEnemies
 for (var count = 0, numEnemies = 10; count < numEnemies; count++) {
    generateRandomEnemies();
    console.log("Enemy generated " + count);
    console.log(allEnemies);
 }

// Instantiate new Player
 var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        68: 'right',
        83: 'down',
        65: 'left',
        87: 'up'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
