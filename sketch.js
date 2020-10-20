var ground;
var jungle,jungleimage;
var monkey,monkey_running,monkey_collided;
var food,foodimage;
var obstacle,obstacleimage;
var foodgrp,obstaclegrp;
var play=1;
var end=0;
var gamestate="play"
var survivaltime=0;
var score=0;


function preload(){
  
// loading jungle image
jungleimage=loadImage("jungle.jpg");
  
// loading monkey animtion  
monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png",
"Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png",
"Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 
// loading image when monkey hits stone  
monkey_collided=loadImage("Monkey_07.png")
  
// loading food image  
foodimage=loadImage("banana.png");
  
//loading obstacleimage
obstacleimage=loadImage("stone.png");  
  
}

function setup() {
  createCanvas(600,500);

// creating jungle sprite
jungle=createSprite(300,200,10,100);
jungle.addImage(jungleimage);
jungle.scale=01;
 
// creating ground sprite  
ground=createSprite(300,450,600,5)  
ground.visible=false;  

// creating monkey sprite
monkey=createSprite(80,400,10,10);  
monkey.addAnimation("run monkey",monkey_running);
monkey.addAnimation("stop monkey",monkey_collided)
monkey.scale=0.12;
//monkey.debug=true;
monkey.setCollider("circle",0,0,200);  
  
// creating grps
foodgrp=new Group();  
obstaclegrp=new Group();  
  
}

function draw() {
  background(220);  
  
//  console.log(frameCount)
  
  
// giving monkey gravity
monkey.velocityY=monkey.velocityY+0.85;
  
// colliding monkey with ground  
monkey.collide(ground);

// conditions if gamestate is play
if(gamestate=="play"){
  
   // spawning food
   banana();
  
   //spawning obstacle
   stone();
  
   // eating bananas  
   eat();
  
   // increasing survival time 
   survivaltime=survivaltime+Math.ceil(getFrameRate()/10000);
  
   // giving jungle velocity
   jungle.velocityX=-3;  
   
   //  making background endless
   if (jungle.x < 300){
       jungle.x = jungle.width/2;
  }
  
   if(keyDown("space")&&monkey.y>300){
      monkey.velocityY=-12;
   } 
}

  
// changing gamestate to end  
if(monkey.isTouching(obstaclegrp)){
   gamestate="end"
}  
 
  
if(gamestate=="end"){
   // changing jungle's velocity to 0
   jungle.velocityX=0;
   
   // changing monkey's animation 
   monkey.changeAnimation("stop monkey",monkey_collided);
  
   //  changing monkey's scale to original scale
   monkey.scale=0.12;
  
  // monkey.x=obstaclegrp.x-20
  
   // giving 0 velocity to both groups
   obstaclegrp.setVelocityXEach(0);
   foodgrp.setVelocityXEach(0);
  
   // giving -1 lifetime to both groups
   obstaclegrp.setLifetimeEach(-1);
   foodgrp.setLifetimeEach(-1);
  
   // resetting the game
   if(keyDown("r")){
      reset();
   }
  
}
  

   increasesize();  
  
  
  drawSprites();
  
  // displaying the score
  fill("black");
  textSize(30);
  text("SCORE =  "+score,50,50);
  
   // displaying survival time
  fill("black");
  textSize(30);
  text("Survival Time =  "+survivaltime,300,50);
  
  if(gamestate=="end"){ 
     fill("red");
     textSize(50);
     text("GAME OVER",150,100);
     text("Press R to restart",110,180);
}
  
  
}

// function to spawn bananas
function banana(){
if(frameCount%80==0){
   // creating banana sprite 
   food=createSprite(600,Math.round(random(250,380)))
   
   // adding banana image to banana sprite
   food.addImage(foodimage);
  
   // scaling the banana to 0.1
   food.scale=0.07;
  
   // giving velocity to banana
   food.velocityX=-4; 
  
   // giving lifetime to banana 
   food.lifetime=150;
  
   // adding banana sprite to foodgroup 
   foodgrp.add(food);
 }
    
}

// function to spawn obstacles
function stone(){
if(frameCount%100==0){
   // creating obstacle sprite
   obstacle=createSprite(600,425,15,15);
  
   // adding rock image to obstacle
   obstacle.addImage(obstacleimage);
  
   // scaling the obstacle to 0.2
   obstacle.scale=0.2;
  
   // giving velocity to obstacle
   obstacle.velocityX=-4;
  
   // giving lifetime to obstacle
   obstacle.lifetime=150;
   
   // adding obstacle to obstaclegroup
   obstaclegrp.add(obstacle);
 } 
 
}

// function to reset the game
function reset(){
  // changing gamestate to play  
  gamestate="play"; 

  // changing the monkey animation  
  monkey.changeAnimation("run monkey",monkey_running);

  // destroying the groups 
  obstaclegrp.destroyEach();
  foodgrp.destroyEach();
  
  // changing survival time to 0 
  survivaltime=0;
  
  // changing score to 0
  score=0;
     
}

// function for increasing monkey size 
function increasesize(){
   
    switch(score){
    case 10 : monkey.scale=0.13;    
           break;
    case 20 : monkey.scale=0.14;    
           break;
    case 30 : monkey.scale=0.15;    
           break;       
    case 40 : monkey.scale=0.16;    
           break;       
    case 50 : monkey.scale=0.17;    
           break;
    case 60 : monkey.scale=0.18;    
           break; 
    case 70 : monkey.scale=0.19;    
           break;
    case 80 : monkey.scale=0.20;    
           break; 
    case 90 : monkey.scale=0.22;    
           break;
    case 100 : monkey.scale=0.24;    
           break; 
    case 110 : monkey.scale=0.26;    
           break; 
    case 120 : monkey.scale=0.28;    
           break;       
    case 130 : monkey.scale=0.30;    
           break;       
    case 140 : monkey.scale=0.32;    
           break; 
    case 150 : monkey.scale=0.35;    
           break; 
           default:break;
           
   }
  
 }  
         


// function for monkey to eat banana
function eat(){
  
if(monkey.isTouching(foodgrp)&&gamestate=="play"){
   foodgrp.destroyEach();
   score=score+2;
}  
  
}
