/*
┏-----------------------------------------------┓
|               Flappy Wumpus                   |
|             By A Generic Gamer                |
| Adapted from Goma Games Workshop: Flappy Flap |
|  By using this code you acknowledge and agree |
|      to the license in the master branch      |
┗-----------------------------------------------┛
*/

enchant(); // initialize
var game = new Core(1280, 720); // game stage
game.scale = 1;
game.fps = 60;
game.started = false;
game.distance = 0; // initial value, don't change

// settings
game.gravity = 0.5;
game.flap_strength = 9;
game.fly_speed = 3.5;
game.obstacle_frequency = 50;
game.keybind(32, 'jump');  

var obstacles = new Group();

var scoreBoard = new Label();
scoreBoard.text = 0;
scoreBoard.color = '#fff';
scoreBoard.font = 'Open Sans';
scoreBoard.scaleX = 5;
scoreBoard.scaleY = 5;
scoreBoard.textAlign = 'center';
scoreBoard.x = game.width/2 - scoreBoard.width/2;
scoreBoard.y = 40;

var gameEnded = false;

// preload assets
game.preload('assets/halloween/background.png',
	'assets/blurple-vigenette.png',
	'assets/gameover.png',
	'assets/halloween/getready.png',
	'assets/ground.png',
	'assets/instructions.png',
	'assets/mallorySoftSoap.png',
	'assets/obstacle_top.png',
	'assets/obstacle_bottom.png',
	'assets/wumpusGolden.png',
	'assets/wumpusRainbow.png',
	'assets/wumpusTrump.png',
	'assets/wumpusVanilla.png',
	'sounds/FlappilyWumped.mp3',
	'sounds/flap.mp3');

// initialize game
game.onload = function(){

  // add the background
  game.bg = new Sprite(1280,720);
  game.bg.image = game.assets['assets/halloween/background.png'];
  
  // add game.bg to rootScene
	game.rootScene.addChild(game.bg);

  // add obstacles to rootScene
	game.rootScene.addChild(obstacles);

  // add scoreBoard to rootScene
	game.rootScene.addChild(scoreBoard);

  // add the start game screen
  game.getready = new Sprite(592,177);
  game.getready.image = game.assets['assets/halloween/getready.png'];
  game.getready.x = (game.width / 2) - (game.getready.width / 2);
  game.getready.y = (game.height / 2) - (game.getready.height / 2);

  // add game.getready to rootScene
	game.rootScene.addChild(game.getready);

  // add the floor
  game.ground = new Sprite(1280,86);
  game.ground.image = game.assets['assets/ground.png'];
  game.ground.x = 0;
  game.ground.y = game.height - 48;
  
  // add game.ground to rootScene
	game.rootScene.addChild(game.ground);

  // add the main character
  // Adds a 10% chance to get special characters :p
  var randomNumber = Math.random() * 100 + 1;
  if (randomNumber <= 10) {
    game.avatar = new Sprite(87,55);
    game.avatar.image = game.assets['assets/wumpusGolden.png'];
  } else if (randomNumber <= 20) {
    game.avatar = new Sprite(87,55);
    game.avatar.image = game.assets['assets/wumpusRainbow.png'];
  } else if (randomNumber <= 30) {
    game.avatar = new Sprite(87,55);
    game.avatar.image = game.assets['assets/wumpusTrump.png'];
  } else if (randomNumber <= 40) {
    game.avatar = new Sprite(87,85);
    game.avatar.image = game.assets['assets/mallorySoftSoap.png'];
  } else {
    game.avatar = new Sprite(87,55);
    game.avatar.image = game.assets['assets/wumpusVanilla.png'];
  }

  game.avatar.x = 100;
  game.avatar.y = 295;
  game.avatar.ySpeed = 0;
  

  // add game.avatar to rootScene
	game.rootScene.addChild(game.avatar);

  // add the instructions
  game.instructions = new Sprite(420,22);
  game.instructions.image = game.assets['assets/instructions.png'];
  game.instructions.x = (game.width/2) - (game.instructions.width/2);
  game.instructions.y = 460;

  // add game.instructions to rootScene
	game.rootScene.addChild(game.instructions);

  game.rootScene.addEventListener(enchant.Event.TOUCH_END, game_touched);
  game.rootScene.addEventListener(enchant.Event.UP_BUTTON_DOWN, game_touched);
} // end game.onload #initialize game

// listen for tap/click/up arrow
function game_touched() {
  if(!game.started) {
      //start the game
    game.started = true;
  
    // remove getready and instructions
    game.rootScene.removeChild(game.getready);
    game.rootScene.removeChild(game.instructions);
}
      game.avatar.ySpeed = -game.flap_strength;
      if(gameEnded == false) {
        var flapSound = new Audio('sounds/flap.mp3');
        flapSound.play();
      }
}

// game loop
game.onenterframe = function(){
  if(game.started){
    game.avatar.ySpeed += game.gravity;
    game.avatar.y += game.avatar.ySpeed;

    // check if bird touches floor, or ceiling
    if(
       game.avatar.y+game.avatar.height > game.ground.y ||
       game.avatar.y < 0
    ){

      // end the game if avatar touches floor or ceiling
      gameover();

    }

    // move obstacles to the left
    obstacles.x -= game.fly_speed;

    // track flying progress
    game.distance += game.fly_speed;
    
    // check if we need to spawn obstacle
    if(game.distance % game.obstacle_frequency == 0){
      
      // spawn obstacle
      spawnObstacle();
      
      // clean up old obstacles
      for (var i = 0; i < obstacles.childNodes.length; i++) {
        if(obstacles.childNodes[i].x + obstacles.x + 100 < -85){
          obstacles.removeChild(obstacles.childNodes[i]);
        }
      }
    } // end if spawn obstacle

    // collision detection
    for (var i = 0; i < obstacles.childNodes.length; i++) {
      if(game.avatar.intersect(obstacles.childNodes[i])){

        // end the game if player hits obstacle
        gameover();

      }else if( // check for score
        !obstacles.childNodes[i].scored &&
        obstacles.childNodes[i].y < 0 &&
        obstacles.childNodes[i].x +
        obstacles.childNodes[i].width -
        game.distance < game.avatar.x
      ){
        obstacles.childNodes[i].scored = true;

        //increment score by 1
        scoreBoard.text++;
      }
    }
    
  }
} // end game.onenterframe #game loop

function spawnObstacle(){

  var pos = (Math.random()*400) + 240;
  var gap = 200;

  var top = new Sprite(85, 545);
  top.image = game.assets['assets/obstacle_top.png'];
  top.x = -obstacles.x + game.width;
  top.y = -550 + pos - gap;

  // add top obstacle to obstacles group
  obstacles.addChild(top);

  var bottom = new Sprite(85, 545);
  bottom.image = game.assets['assets/obstacle_bottom.png'];
  bottom.x = -obstacles.x + game.width;
  bottom.y = pos;
  
  // add bottom obstacle to obstacles group
  obstacles.addChild(bottom);
  
} // end spawnObstacle

function gameover(){
  // add the instructions
  gameEnded = true;
  game.gameover = new Sprite(602,163);
  game.gameover.image = game.assets['assets/gameover.png'];
  game.gameover.x = (game.width/2) - (game.gameover.width/2);
  game.gameover.y = 120;
  var gameOverSound = new Audio('sounds/game-over.mp3');
  gameOverSound.play();

  // show gameover graphic
  game.rootScene.addChild(game.gameover);

  game.rootScene.addEventListener(enchant.Event.TOUCH_END,function(){
    window.location.reload();
  });

  // stop the game loop
  game.onenterframe = null;

}

game.start();
