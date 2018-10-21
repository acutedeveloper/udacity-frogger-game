frontend-nanodegree-arcade-game
===============================

Main objects are characters
The methods they share are, render & update

Property they have is a sprite

Player has unique method - handle input.

## Udacity Notes

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

## Requirements - Basic Functionality

In this game you have a Player and Enemies (bugs). The goal of the player is to reach the water, without colliding into any one of the enemies.

* The player can move left, right, up and down [x]
* The enemies move at varying speeds on the paved block portion of the game board [x]
* Once a the player collides with an enemy, the game is reset and the player moves back to the starting square [x]
* Once the player reaches the water (i.e., the top of the game board), the game is won [x]
* Check out a quick video demo of the game in action below!

**Rubiric Requirements**
The game functions correctly and runs error free

* Player can not move off screen [x]
* Vehicles cross the screen [x]
* Vehicle-player collisions happen logically (not too early or too late) [ ]
* Vehicle-player collision resets the game [x]
* Something happens when player wins [ ]

## Additional Functionality (Optional)

In addition to the basic functionality, you can add more cool functionality to your game. For example, here are some additional features that you can add:

* Player selection: allow the user to select the image for the player character before starting the game. You can use the different character images provided in the images folder (we’ll get to that below)
* Score: you can implement a score for the game. For example, the score can increase each time the player reaches the water, and it can be reset to 0 when collision occurs (or it can be reduced)
* Collectibles: you can add gems to the game, allowing the player to collect them to make the game more interesting
Anything else you like!

## Calculations

Canvas Size is: 505 x 606
Individual Block: 101 x 83
Image Height: 171

## 21/10/18
Need to refactor code from ES5 to ES6 Classes [ ]
Need to add a interface class to handle:
- Selecting players [ ]
- Logging wins / losses [ ]
- Tweak the collision detection paramenters [ ]
