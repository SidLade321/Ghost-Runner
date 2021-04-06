var tower,towerImg;
var ghost,ghostImg;
var climber,climberImg, climberGrp;
var door, doorImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisibleBlock, ivsBlockGrp;

function preload()
{
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  
}

function setup()
{
  createCanvas(600,600);
  
  tower = createSprite (300,300);
  tower.addImage(towerImg);
  tower.scale = 1;
  tower.velocityY = 1;
  
  ghost = createSprite (300,300,20,40);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  
  climberGrp = new Group();
  ivsBlockGrp = new Group();
  
  
}

function draw()
{
  background (0);
  
  if (gameState === PLAY)
    {
          if (tower.y>500)
        {
          tower.y = 300;
        }

      if(keyDown("space"))
        {
          ghost.velocityY = -10;
        }

      if(keyDown("LEFT_ARROW"))
        {
          ghost.x = ghost.x-4;
        }

       if(keyDown("RIGHT_ARROW"))
        {
          ghost.x = ghost.x+4;
        }
    
      

      ghost.velocityY = ghost.velocityY +0.8;


      spawnDoors();
      
      if (climberGrp.isTouching(ghost))
         {
            ghost.velocityY = 0;
         }
      
      if (ivsBlockGrp.isTouching(ghost)|| ghost.y>600)
        {
          
          
          
          gameState =END;
        }
      
    }
  
  if (gameState === END)
    {
      
      textSize(30);
      //text.colour = "yellow";
      fill("yellow");
      text("Game Over",250,300);
      stroke ("red");
      
      climberGrp.destroyEach()
      ivsBlockGrp.destroyEach()
      door.destroy()
      tower.destroy()
      ghost.destroy()
      
      
      
    }
  
  

  
  drawSprites();
}

function spawnDoors()
{
  if (frameCount % 240 ===0)
    {
      door = createSprite (300,100,20,60);
      door.addImage(doorImg);
      door.velocityY = 1;
      door.x = Math.round(random(100,500));
      door.lifetime = 600;
      
      climber = createSprite(300,150,20,60);
      climber.addImage(climberImg);
      climber.velocityY = 1;
      climber.x = door.x;
      climberGrp.add(climber);
      climberGrp.lifetimeEach = 600;
      
      invisibleBlock = createSprite(300,150,60,10);
      
      invisibleBlock.x = climber.x ;
      invisibleBlock.y = climber.y+10 ;
      invisibleBlock.velocityY = 1;
      ivsBlockGrp.add(invisibleBlock);
      ivsBlockGrp.lifetimeEach = 600;
      invisibleBlock.visable = false;
      
       ghost.depth = door.depth;
  ghost.depth = ghost.depth+1;
       ghost.depth = climber.depth;
  ghost.depth = ghost.depth+1;
      
      
    }
}