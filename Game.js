class Game {

Play() {

    if (gameState===PLAY){
   
        if(score > 0 && score % 100 === 0) {
         checkpoint.play(); 
        }
        if(keyDown(UP_ARROW)) {
          camera.position.x = trex.x + displayWidth/2- 47;
          trex.velocityX=3;
          //ground.velocityX = -(6 + 3*score/100);
          invisibleGround.velocityX = 3;
          score = score + Math.round(getFrameRate()/60);
        } else {
          trex.velocityX =0;
          ground.velocityX = 0;
          invisibleGround.velocityX =0;
        }
      
        if(keyDown("space") && trex.y >= displayHeight/2 - 30) {
          trex.velocityY = -12;
          jump.play();
        }
      
        trex.velocityY = trex.velocityY + 0.8
      
        if(ground.x < trex.x){
         ground.x = trex.x + 450;
        }
    
        // speed for clouds and obstacles
        if(trex.velocityX === 3) {
          cloudsGroup.setVelocityXEach(-3);
          obstaclesGroup.setVelocityXEach(-4);
        } else {
          cloudsGroup.setVelocityXEach(0);
          obstaclesGroup.setVelocityXEach(0);
        }
      
        trex.collide(invisibleGround);
        spawnClouds();
        spawnObstacles();
      
        if(obstaclesGroup.isTouching(trex)){
            gameState = END;
            die.play();
        }
      }




}

End() {
    if (gameState === END) {
        gameOver.visible = true;
        //restart.visible = true;
        
        //set velcity of each game object to 0
        ground.velocityX = 0;
        trex.velocityY = 0;
        trex.velocityX=0;
        invisibleGround.velocityX =0;
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        
        //change the trex animation
        trex.changeAnimation("collided",trex_collided);
        
        //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        
        console.log("GameOver");

        //if(mousePressedOver(restart)) {
        //  reset();
        //}
      }
      
}







}