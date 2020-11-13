
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var ground;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime=0;
var play=1;
var end=0;
var gameState=play;
var restart,restartIma;
var gameover,gameoverIma;

function preload()
{
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided=loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  restartIma=loadImage("restart -1.png");
  gameoverIma=loadImage("gameover.png");
}



function setup() 
{
  createCanvas(600,300);

  monkey=createSprite(50,100,20,40);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.1;
  
  ground=createSprite(600,290,1200,10);
  ground.shapeColour="black";
  
  obstacleGroup = createGroup();
  FoodGroup= createGroup();
  
  gameover=createSprite(300,90,30,10);
  gameover.addImage("gameover",gameoverIma);
  gameover.visible=false;
  
  restart=createSprite(300,125,10,10);
  restart.addImage("restart",restartIma);
  restart.scale=0.4;
  restart.visible=false;
}


function draw() 
{
  background(220);
  
  if(gameState===play)
    {
      ground.velocityX = -6;
  
      if (ground.x < 0)
        {
          ground.x = ground.width/2;
        }
      
      if (keyDown("space")&&monkey.y>=250)
        {
          monkey.velocityY=-15;
        }
        monkey.velocityY=monkey.velocityY+0.8;
      monkey.collide(ground);
      
      spawnObstacles();
      spawnBanana();
      
      if(monkey.isTouching(FoodGroup))
        {
          score=score+10;
          FoodGroup.destroyEach();
        }
  
      if(monkey.isTouching(obstacleGroup))
        {
          gameState=end;
        }
      
      console.log(monkey.y);
      survivalTime=Math.ceil(frameCount/frameRate());
    }
  
  else if(gameState===end)
    {
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      
      ground.velocityX=0;
      monkey.velocityY=0;
      
      gameover.visible=true;
      restart.visible=true;
      
      monkey.changeAnimation("collided",monkey_collided);
      
      if(mousePressedOver(restart)) 
      {
        reset();
      }
    }
  
  monkey.collide(ground); 
  
  drawSprites();
  
  stroke="white";
  textSize(15);
  fill("black");
  text("Score : "+score,25,25);
  
  stroke="white";
  textSize(15);
  fill("black");
  text("Survival Time : "+survivalTime,450,25);
}

function spawnObstacles()
{
 if (frameCount % 300 === 0)
 {
    obstacle = createSprite(600,265,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage("rock",obstaceImage);
            
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstacle.setCollider("circle",0,0,180);
   
    obstacleGroup.add(obstacle);
 }
}

function spawnBanana() 
{
  if (frameCount % 90 === 0) {
    banana = createSprite(600,Math.round(random(150,240)),40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifeTime=300;
    
    FoodGroup.add(banana);
  }
}

function reset()
{
  frameCount=0;
  gameState=play;
  gameover.visible=false;
  restart.visible=false;
  score=0;
  monkey.changeAnimation("running",monkey_running);
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
}

