var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survival=0;
var ground;
PLAY=1;
END=0;
gameState=PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(900,400);  
FoodGroup=new Group();
obstacleGroup=new Group();
monkey=createSprite(50,190,20,20);
monkey.addAnimation("abc",monkey_running);
monkey.scale=0.12;

ground=createSprite(500,300,1000,20);
ground.velocityX=-4;
}



function draw() {
background("lightBlue");
textSize(20);
stroke("black");
fill("black");
text("Surviving Time: "+survival,280,50);
if(gameState==PLAY){

survival=survival+Math.round(getFrameRate()/60);
if(ground.x<800){
 ground.x=500;
}
if(keyDown("space") && monkey.y>150){
monkey.velocityY=-12;
}

monkey.velocityY=monkey.velocityY+0.5;
spawnFruits();
spawnObstacles();
if(monkey.isTouching(FoodGroup)){
FoodGroup.destroyEach();
}
if(monkey.isTouching(obstacleGroup)){
gameState=END;
}

}
if(gameState==END){
FoodGroup.setVelocityXEach(0);
obstacleGroup.setVelocityXEach(0);
FoodGroup.setLifetimeEach(-1);
obstacleGroup.setLifetimeEach(-1);
ground.velocityX=0;

}
monkey.collide(ground);
drawSprites();
}

function spawnFruits(){
if(frameCount%80==0){
fruit=createSprite(600,100,20,20);
fruit.velocityX=-4;
fruit.addImage(bananaImage);
fruit.scale=0.1;
fruit.lifetime=300;
FoodGroup.add(fruit);
fruit.setCollider("circle",0,0,200);
}  
}

function spawnObstacles(){
if(frameCount%300==0){
obstacle=createSprite(460,255,20,20);
obstacle.velocityX=-4;
obstacle.addImage(obstacleImage);
obstacle.scale=0.2;
obstacleGroup.add(obstacle);
obstacle.setCollider("circle",0,0,100);
}
}
