var monkeyimage, monkey, gameover, groundimage, restart, bananaimage, banana, rockimage, rock, bgimage, bg, ground,bananaGroup,rockGroup,invisibleground,score = 0,PLAY = 1,END = 0,gameState = PLAY;


function preload() {
 monkeyimage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png"); 
  bananaimage=loadImage("Banana.png");
  rockimage=loadImage("stone.png");
  bgimage=loadImage("jungle.jpg");
  groundimage=loadImage("ground.jpg");
}


function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(300,350,30,30);
  monkey.addAnimation("monkeyimage",monkeyimage);
  monkey.scale = 0.1;
  
  bg = createSprite(200,200,600,300);
  bg.addImage("bgimage",bgimage);
  bg.x=  bg.width/2;
  bg.velocityX = -3;
  
  
  bg.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  
  rockGroup = new Group();
  bananaGroup = new Group();
  
  invisibleGround = createSprite(600,390,600,20);
  invisibleGround.visible = false;
  invisibleGround.x =  invisibleGround.width/2;
  invisibleGround.velocityX = -3;
  
}

function draw(){
  
   background(255);
  
  if (bg.x < 100){
      bg.x = bg.width/2;
    }
  
  if (invisibleGround.x < 100){
      invisibleGround.x = invisibleGround.width/2;
    }
  
   if(gameState === PLAY){
     score = score +  Math.round(getFrameRate()/60); 
   if(keyDown("up")) {
    monkey.y = monkey.y - 15;  
   }
   bg.velocityX = -(6 + 3*score/100);
    
   monkey.velocityY = monkey.velocityY + 0.8
      if (ground.x < 0){
        ground.x = ground.width/2;
      }

  if(monkey.isTouching(rockGroup)){
    monkey.scale = 0.1;
    score = 0;
    gameState = END;
    }
  }
  
  else if(gameState === END) {
    bg.velocityX = 0;
    monkey.velocityY = 0;
    rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    rockGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  spawnrocks();
  spawnBananas();
    
  monkey.velocityY = monkey.velocityY + 0.8; 
  monkey.collide(invisibleGround);
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score + 1;
      
    switch(score){
      case 10: monkey.scale = 0.11; 
            break;
      case 20: monkey.scale = 0.12;
            break;
      case 30: monkey.scale = 0.13;
            break;                      
      case 40: monkey.scale = 0.15;  
            break;                             
      case 50: monkey.scale = 0.16; 
            break;    
    }  
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,500,50);
  drawSprites();
  
}

function spawnrocks() {
  if(frameCount % 80 === 0) {
    var rock = createSprite(600,370,10,40);
    rock.addImage("rockimage",rockimage);
    rock.velocityX = -6;
    rock.scale = 0.1;
    rock.lifetime = 200;
    rockGroup.add(rock);
  }
}


function spawnBananas() {
  if(frameCount % 60 === 0) {
    var banana = createSprite(600,200,10,40);
    banana.addImage("bananaimage",bananaimage)
    banana.velocityX = -6;
    banana.scale = 0.05;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

