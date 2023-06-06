  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var america, americaImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  americaImg = loadImage("america.png");
 
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  america = createSprite(200,200,50,50);
  america.scale = 0.3;
 america.addImage("america",americaImg);
}


function draw() {
  background(255);
  
  if (gameState === "play") {
    
    if(keyDown("left_arrow")){
  
      america.x = america.x - 3;
    }
    if(keyDown("right_arrow")){
  
    
      america.x = america.x + 3;
      
    }
    if(keyDown("up_arrow")){
   
      america.velocityY =america.velocityY - 3.5;
   
      // escreva o código para mover para cima quando a tecla espaço for pressionada
      
    }
  
 america.velocityY = america.velocityY + 0.8;
  
   
      if (tower.y > 400){
        tower.y = 300;
      }
    
      spawnDoors();

  
      //escrever um código para fazer o climbersGroup (grupo de escaladores) colidir com o fantasma alterar a velocidade do fantasma 
      if (climbersGroup.isTouching (america)) {
        america.velocityY = 0;
      }
//escreva um código para fazer o invisibleBlockGroup (grupo de bloco invisível) colidir com o fantasma, destruir o fantasma e mudar o estado de jogo para end.
  if (invisibleBlockGroup.isTouching (america) || america.y > 600){
    america.destroy();
    gameState = "end";
  }
  drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnDoors()
 {
  //escreva o código aqui para gerar as janelas
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //adicione a função aleatória
    door.x = Math.round (random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    //
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //mude a profundidade do fantasma e da porta
    america.depth = door.depth;
    america.depth += 1;
     

    
    //atribuir tempo de vida ao obstacle.lifetime = 300; aqui os obstáculos são as portas, o escalador e o bloco invisível
door.lifetime = 700;
climber.lifetime = 700;
invisibleBlock.lifetime = 700;

    //adicione cada obstáculo ao grupo obstaclesGroup.add(obstacle); aqui os obstáculos são as portas, o escalador e o bloco invisível

    doorsGroup.add(door);
    climbersGroup.add (climber);
    invisibleBlockGroup.add (invisibleBlock);
  }
}

