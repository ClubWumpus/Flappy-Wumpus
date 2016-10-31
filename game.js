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
offset = {top: 0, left: 0};

// settings
game.gravity = 0.5;
game.flap_strength = 9;
game.fly_speed = 3.5;
game.obstacle_frequency = 50;

// binding
game.keybind(32, 'up');

//music
var menuMusic = new Audio('../sounds/wumpus.mp3');
menuMusic.loop = true;
menuMusic.volume = 0.4;

var ingameMusic = new Audio('../sounds/FlappilyWumped.mp3');
ingameMusic.loop = true;
ingameMusic.volume = 0.6;

var obstacles = new Group();

var scoreBoard = new Label();
scoreBoard.text = 0;
scoreBoard.color = '#fff';
scoreBoard.font = '14px Monospace';
scoreBoard.scaleX = 5;
scoreBoard.scaleY = 5;
scoreBoard.textAlign = 'center';
scoreBoard.x = game.width/2 - scoreBoard.width/2;
scoreBoard.y = 40;

var playingTrumpus = false;
var gameEnded = false;

// preload assets
game.preload('../assets/background.png',
	'../assets/blurple-vigenette.png',
	'../assets/gameover.png',
	'../assets/getready.png',
	'../assets/ground.png',
	'../assets/instructions.png',
	'../assets/mallorySoftSoap.png',
	'../assets/obstacle_top.png',
	'../assets/obstacle_bottom.png',
	'../assets/wumpusGolden.png',
	'../assets/wumpusRainbow.png',
	'../assets/wumpusTrump.png',
	'../assets/wumpusVanilla.png',
	'../assets/back2menu.png',
	'../assets/play.png',
	'../assets/flappywumpuslogo2.png',
	'../assets/retry.png');


// initialize game
function gameinit() {
	console.log("hi");
	menuMusic.pause();
	menuMusic.currentTime = 0;
	ingameMusic.play();
	game.rootScene.addChild(game.ground);
	scoreBoard.text = 0;
	game.rootScene.removeChild(game.playbutton);
	game.rootScene.removeChild(game.flappylogo);
	game.rootScene.clearEventListener(enchant.Event.LEFT_BUTTON_DOWN);
	game.rootScene.clearEventListener(enchant.Event.UP_BUTTON_DOWN);
	// add the background

	// adds background back
	game.rootScene.removeChild(game.bg);
	game.rootScene.addChild(game.bg);

  // add obstacles to rootScene
	game.rootScene.addChild(obstacles);

  // add scoreBoard to rootScene
	game.rootScene.addChild(scoreBoard);

	game.ground = new Sprite(1280,86);
  	game.ground.image = game.assets['../assets/ground.png'];
  	game.ground.x = 0;
  	game.ground.y = game.height - 48;

  // add game.ground to rootScene
	game.rootScene.addChild(game.ground);

  // add the start game screen
  game.getready = new Sprite(592,177);
  game.getready.image = game.assets['../assets/getready.png'];
  game.getready.x = (game.width / 2) - (game.getready.width / 2);
  game.getready.y = (game.height / 2) - (game.getready.height / 2);
	game.getready.buttonMode = "up"

  // add game.getready to rootScene


	game.rootScene.addChild(game.getready);

  // add the main character
  // Adds a 10% chance to get special characters :p
  var randomNumber = Math.random() * 100 + 1;
  if (randomNumber <= 10) {
    game.avatar = new Sprite(87,55);
    game.avatar.image = game.assets['../assets/wumpusGolden.png'];
  } else if (randomNumber <= 20) {
    game.avatar = new Sprite(87,55);
    game.avatar.image = game.assets['../assets/wumpusRainbow.png'];
  } else if (randomNumber <= 30) {
    playingTrumpus = true;
    game.avatar = new Sprite(87,55);
    game.avatar.image = game.assets['../assets/wumpusTrump.png'];
  } else if (randomNumber <= 40) {
    game.avatar = new Sprite(87,85);
    game.avatar.image = game.assets['../assets/mallorySoftSoap.png'];
  } else {
    game.avatar = new Sprite(87,55);
    game.avatar.image = game.assets['../assets/wumpusVanilla.png'];
  }

    game.avatar.x = 100;
    game.avatar.y = 295;
    game.avatar.ySpeed = 0;

    // add game.avatar to rootScene
	game.rootScene.addChild(game.avatar);

    // add the instructions
    game.instructions = new Sprite(695,95);
    game.instructions.image = game.assets['../assets/instructions.png'];
    game.instructions.x = (game.width/2) - (game.instructions.width/2);
    game.instructions.y = 555;
	game.instructions.buttonMode = "up";

	game.bg.buttonMode = "up";

  // add game.instructions to rootScene
	game.rootScene.addChild(game.instructions);

  	game.rootScene.addEventListener(enchant.Event.UP_BUTTON_DOWN, game_touched);
}

function clearobstacles() {
	for (var i = 0; i < obstacles.childNodes.length; i++) {
   	obstacles.removeChild(obstacles.childNodes[i]);
		if (obstacles.childNodes.length >= 1) {
				clearobstacles()
		}
    }
}

function gamerestart() {
	//music
	menuMusic.pause();
	menuMusic.currentTime = 0;
	ingameMusic.play();
	// clearing sprites up
	game.rootScene.removeChild(game.bg);
	game.rootScene.removeChild(game.playbutton);
	game.rootScene.removeChild(game.flappylogo);
	game.rootScene.removeChild(game.ground);
	game.rootScene.removeChild(game.retrybutton);
	game.rootScene.removeChild(game.menubutton);
	game.rootScene.clearEventListener(enchant.Event.DOWN_BUTTON_DOWN);
	game.rootScene.clearEventListener(enchant.Event.RIGHT_BUTTON_DOWN);
	game.rootScene.clearEventListener(enchant.Event.LEFT_BUTTON_DOWN);


	game.gravity = 0.5;
	game.flap_strength = 9;
	game.fly_speed = 3.5;
	game.started = false;
	clearobstacles()
	game.rootScene.removeChild(game.avatar);
	game.rootScene.removeChild(game.gameover);
	playingTrumpus = false;
	gameEnded = false;
	scoreBoard.text = "0";
	game.rootScene.removeChild(obstacles);
	game.rootScene.clearEventListener(enchant.Event.UP_BUTTON_DOWN);

	// does stuff with the background

	game.bg.buttonMode = "up";
	game.rootScene.addChild(game.bg)

	game.rootScene.addChild(obstacles);
	game.ground = new Sprite(1280,86);
  	game.ground.image = game.assets['../assets/ground.png'];
  	game.ground.x = 0;
  	game.ground.y = game.height - 48;

  	// add game.ground to rootScene
	game.rootScene.addChild(game.ground);
	// add the start game screen
    game.getready = new Sprite(592,177);
    game.getready.image = game.assets['../assets/getready.png'];
    game.getready.x = (game.width / 2) - (game.getready.width / 2);
    game.getready.y = (game.height / 2) - (game.getready.height / 2);
	game.getready.buttonMode = "up"
	

    // add game.getready to rootScene


	game.rootScene.addChild(game.getready);

	var randomNumber = Math.random() * 100 + 1;
  if (randomNumber <= 10) {
    game.avatar = new Sprite(87,55);
    game.avatar.image = game.assets['../assets/wumpusGolden.png'];
  } else if (randomNumber <= 20) {
    game.avatar = new Sprite(87,55);
    game.avatar.image = game.assets['../assets/wumpusRainbow.png'];
  } else if (randomNumber <= 30) {
    playingTrumpus = true;
    game.avatar = new Sprite(87,55);
    game.avatar.image = game.assets['../assets/wumpusTrump.png'];
  } else if (randomNumber <= 40) {
    game.avatar = new Sprite(87,85);
    game.avatar.image = game.assets['../assets/mallorySoftSoap.png'];
  } else {
    game.avatar = new Sprite(87,55);
    game.avatar.image = game.assets['../assets/wumpusVanilla.png'];
  }

  game.avatar.x = 100;
  game.avatar.y = 295;
  game.avatar.ySpeed = 0;


  // add game.avatar to rootScene
	game.rootScene.addChild(game.avatar);

	game.instructions = new Sprite(695,95);
    game.instructions.image = game.assets['../assets/instructions.png'];
    game.instructions.x = (game.width/2) - (game.instructions.width/2);
    game.instructions.y = 555;
	game.instructions.buttonMode = "up"
	game.rootScene.removeChild(scoreBoard)
	game.rootScene.addChild(scoreBoard)

	// add game.instructions to rootScene
	game.rootScene.addChild(game.instructions);
	
	game.rootScene.addEventListener(enchant.Event.UP_BUTTON_DOWN, game_touched);
}

function openmenu() {
	ingameMusic.pause();
	ingameMusic.currentTime = 0;
	menuMusic.play();
	game.rootScene.removeChild(game.playbutton);
	game.rootScene.removeChild(game.flappylogo);
	game.rootScene.removeChild(game.retrybutton);
	game.rootScene.removeChild(game.menubutton);
	game.rootScene.clearEventListener(enchant.Event.DOWN_BUTTON_DOWN);
	game.rootScene.clearEventListener(enchant.Event.UP_BUTTON_DOWN);
	game.rootScene.clearEventListener(enchant.Event.RIGHT_BUTTON_DOWN);
	game.rootScene.removeChild(game.avatar);
	game.rootScene.removeChild(game.gameover);
	game.rootScene.removeChild(scoreBoard);
	playingTrumpus = false;
	gameEnded = false;
	clearobstacles()

	game.playbutton = new Sprite(300,100);
	game.playbutton.image = game.assets['../assets/play.png'];
	game.playbutton.y = game.height/2 + 50;
	game.playbutton.x = game.width/2 - 150;
	game.playbutton.buttonMode = "left";

	game.rootScene.addChild(game.playbutton);

	// adding the logo

	game.flappylogo = new Sprite(464,206);
	game.flappylogo.image = game.assets['../assets/flappywumpuslogo2.png'];
	game.flappylogo.y = game.height/2 - 200;
	game.flappylogo.x = game.width/2 - 225;

	game.rootScene.addChild(game.flappylogo);

	game.rootScene.addEventListener(enchant.Event.LEFT_BUTTON_DOWN, gamerestart);
	
	// currently disabled
	
	/*game.flappylogo.addEventListener(Event.ENTER_FRAME, function () {
		if (logoVariable == false) {
     game.flappylogo.y--
		}
		else {
			game.flappylogo.y++
		}
  });*/
}

// Timer for the logo floating animation

var logoVariable = false

function logoTimer() {
	// currently disabled
	
	/*setTimeout(function() {
		if (logoVariable == false) {
			logoVariable = true;
			logoTimer()
		}
		else {
			logoVariable = false;
			logoTimer()
		}
	}, 1000)*/
}

game.onload = function(){
	menuMusic.play();
	game.bg = new Sprite(1280,720);
  	game.bg.image = game.assets['../assets/background.png'];

  // add game.bg to rootScene
	game.rootScene.addChild(game.bg);

	// add the floor
	game.ground = new Sprite(1280,86);
	game.ground.image = game.assets['../assets/ground.png'];
	game.ground.x = 0;
	game.ground.y = game.height - 48;

  // add game.ground to rootScene
	game.rootScene.addChild(game.ground);

	// adding playbutton stuff

	game.playbutton = new Sprite(300,100);
	game.playbutton.image = game.assets['../assets/play.png'];
	game.playbutton.y = game.height/2 + 50;
	game.playbutton.x = game.width/2 - 150;
	game.playbutton.buttonMode = "left"

	game.rootScene.addChild(game.playbutton);

	// adding the logo

	game.flappylogo = new Sprite(464,206);
	game.flappylogo.image = game.assets['../assets/flappywumpuslogo2.png'];
	game.flappylogo.y = game.height/2 - 200;
	game.flappylogo.x = game.width/2 - 225;

	game.rootScene.addChild(game.flappylogo);
	logoTimer()

	game.rootScene.addEventListener(enchant.Event.LEFT_BUTTON_DOWN, gameinit);
	
	// currently disabled
	
	/*
	game.flappylogo.addEventListener(Event.ENTER_FRAME, function () {
		if (logoVariable == false) {
     game.flappylogo.y--
		}
		else {
			game.flappylogo.y++
		}
  });*/

} // end game.onload #initialize game

// listen for tap/click/up arrow
function game_touched() {
  if(game.started != true && gameEnded != true) {
      //start the game
    game.started = true;

    // remove getready and instructions

}

      game.rootScene.removeChild(game.getready);
    game.rootScene.removeChild(game.instructions);

	game.avatar.ySpeed = -game.flap_strength;
//	flapAnimation()
      if(gameEnded == false) {

        if (playingTrumpus === true) {
          flapSound = new Audio('../sounds/china.mp3');
        } else {
          flapSound = new Audio('../sounds/flap.mp3');
        }
        flapSound.volume = 0.5;
        flapSound.play();
      }
}

// game loop
game.onenterframe = function(){
  if(gameEnded == false && game.started == true){
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
      spawnObstacle()
    game.started = true;

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
  top.image = game.assets['../assets/obstacle_top.png'];
  top.x = -obstacles.x + game.width;
  top.y = -550 + pos - gap;
	top.buttonMode = "up"
  // add top obstacle to obstacles group
  obstacles.addChild(top);

  var bottom = new Sprite(85, 545);
  bottom.image = game.assets['../assets/obstacle_bottom.png'];
  bottom.x = -obstacles.x + game.width;
  bottom.y = pos;
	bottom.buttonMode = "up";

  // add bottom obstacle to obstacles group
  obstacles.addChild(bottom);
	//game.rootScene.addEventListener(enchant.Event.UP_BUTTON_DOWN, game_touched);

} // end spawnObstacle

function gameover(){
	
  // add the instructions
	game.bg.buttonMode = "";
  gameEnded = true;
	game.started = false;
	game.rootScene.removeChild(game.flapButton);
  game.gameover = new Sprite(602,163);
  game.gameover.image = game.assets['../assets/gameover.png'];
  game.gameover.x = (game.width/2) - (game.gameover.width/2);
  game.gameover.y = 120;

	// adding a retry button
	game.retrybutton = new Sprite(300,100);
	game.retrybutton.image = game.assets['../assets/retry.png'];
	game.retrybutton.y = game.height/2 + 60;
	game.retrybutton.x = game.width/2 - 150;
	game.retrybutton.buttonMode = "down"

	game.rootScene.addChild(game.retrybutton);

	// adding a back2menu button
	game.menubutton = new Sprite(300,100);
	game.menubutton.image = game.assets['../assets/back2menu.png'];
	game.menubutton.y = game.height/2 - 50;
	game.menubutton.x = game.width/2 - 150;
	game.menubutton.buttonMode = "right"

	game.rootScene.addChild(game.menubutton);

    if (playingTrumpus === true) {
      var deathSound = new Audio('../sounds/wrong.mp3')
    } else {
      var deathSound = new Audio('../sounds/death.mp3');
    }
    deathSound.volume = 0.5;
    deathSound.play();

    var gameOverSound = new Audio('../sounds/game-over.mp3');
    gameOverSound.volume = 0.3;
    gameOverSound.play();

  // show gameover graphic
  game.rootScene.addChild(game.gameover);

  game.rootScene.addEventListener(enchant.Event.DOWN_BUTTON_DOWN,function(){
	  game.rootScene.removeChild(game.playbutton);
	game.rootScene.removeChild(game.flappylogo);
		gamerestart()
    //window.location.reload();
  });
	game.rootScene.addEventListener(enchant.Event.RIGHT_BUTTON_DOWN,function(){
		game.rootScene.removeChild(game.playbutton);
	game.rootScene.removeChild(game.flappylogo);
		openmenu()
    //window.location.reload();
  });

  // stop the game loop
  //game.onenterframe = null;

}

game.start();
