//create the monkey varibles
var monkey, monkey_running

//create bannana varibles
var bannana, bannanaImage, bannnanaGroup

//create obstacle varibles
var obstacle, obstacleImage, obstacleGroup

//create ground varibles
var ground, groundImage

//create the gameover varibles
var gameover, gameoverImge;

//create the survival time varible
var survivalTime = 0;

//create the gamestates and assign it to PLAY
var PLAY = 1;
var END = 0;
var gameState;


function preload() {

  //preload monkey running animation 
  monkey_running = loadAnimation('sprite_0.png', 'sprite_1.png', 'sprite_2.png', 'sprite_3.png', 'sprite_4.png', 'sprite_5.png', 'sprite_6.png', 'sprite_7.png', 'sprite_8.png')

  //preload bannana image
  bannanaImage = loadImage('banana.png');

  //preload obstacle image
  obstacleImage = loadImage('obstacle.png');

  //preload the game over image
  gameoverImage = loadImage('gameover.png');

}


function setup() {

  //create canvas to fit all screens
  createCanvas(windowWidth, windowHeight);

  //create monkey sprite to fit all screens
  monkey = createSprite(windowWidth / 4, windowHeight - 150);
  monkey.addAnimation('running', monkey_running);
  monkey.scale = 0.4;

  //create the invisible game over sprite to fit all screena
  gameover = createSprite(windowWidth / 2, windowHeight / 2)
  gameover.addImage(gameoverImage);
  gameover.scale = 1;
  gameover.visible = false;

  //create ground sprite to fit all screens
  ground = createSprite(windowWidth / 2, monkey.y + 130, windowWidth * 1.5, 80);
  ground.velocityX = -5;
  ground.shapeColor = 'darkgreen';

  //create the obstacle and bannana groups
  obstacleGroup = new Group();
  bannanaGroup = new Group();

  gameState = PLAY;

}


function draw() {

  //background color
  background('lightblue');

  if (gameState === PLAY) {

    stroke('black');
    textSize(20);
    fill('black');
    survivalTime = Math.round(frameCount / frameRate());
    text('Survival Time:  ' + survivalTime, 100, 100);

    if (ground.x < monkey.x) {

      ground.x = monkey.x;

    }

    monkey.velocityY = monkey.velocityY + 1.5

    if (keyDown("space") && monkey.y >= 1114.2) {

      monkey.velocityY = -50;

    }

    monkey.collide(ground);

    if (frameCount % 300 === 0) {

      obstacle1();

    }

    if (frameCount % 120 === 0) {

      bannana1();
      bannana.y = Math.round(random(400, 850))

    }

    if (monkey.isTouching(bannanaGroup)) {

      bannana.visible = false;

    }

  }

  if (monkey.isTouching(obstacleGroup)) {

    gameState = END;

  }

  if (gameState === END) {

    gameover.visible = true;
    monkey.destroy();
    bannanaGroup.destroyEach();
    obstacleGroup.destroyEach();
    ground.destroy();
    background(0);

  }

  drawSprites();

}

function obstacle1() {

  obstacle = createSprite(windowWidth + 50, 1050, 10, 10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -20;
  obstacleGroup.add(obstacle);
  bannana.lifetime = 1000;

}

function bannana1() {

  bannana = createSprite(windowWidth, 600, 10, 10);
  bannana.addImage(bannanaImage);
  bannana.scale = 0.25
  bannana.velocityX = -20;
  bannanaGroup.add(bannana);
  bannana.lifetime = 1000;

}