var PLAY = 1;
var END = 0;  
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, jump, checkpoint, die;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  
  jump = loadSound("jump.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  
   /// make all the game sizes increase when display size changes
  
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight-110);

  
  trex = createSprite(50,displayHeight/2,20,20);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  //trex.debug = true;
  
  ground = createSprite(400,displayHeight/2-15,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  ground.scale = 1.5;
  //ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(displayWidth/2,displayHeight/2-150);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(displayWidth/3,displayHeight/2-100); 
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(trex.x,displayHeight/2,20,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  PlayState = new Game();
  EndState =  new Game();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, trex.x + displayWidth-150,50);

  gameOver.x = displayWidth/2 + trex.x;
  restart.x =  displayWidth/2 + trex.x;
  
  
  ground.velocityX = -trex.velocityX; 

  PlayState.Play();
  
  EndState.End();
 
 
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0 && trex.velocityX === 3) {
    var cloud = createSprite(trex.x + displayWidth, displayHeight/2-120,40,10);
    cloud.y = Math.round(random(displayHeight/2-120,displayHeight/2-155));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    //cloud.velocityX = -trex.velocityX;
    
   
    
     //assign lifetime to the variable
    cloud.lifetime = -1;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0 && trex.velocityX === 3) {
    var obstacle = createSprite(trex.x + displayWidth,displayHeight/2 - 30,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -trex.velocityX;

    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = -1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}