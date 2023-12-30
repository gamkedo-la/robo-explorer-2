import BaseScene from "./BaseScene.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  sceneRef;
  
  // JUMPING
  isJumping;
  jumpForce = 200;
  reloadFrames;

  health = 22;
  MAX_HEALTH = 22;

  ROCKET_SPEED_X = 1000;
  ROCKET_SPEED_Y = 0;
  ROCKET_SPAWN_XOFFSET = 50;
  ROCKET_SPAWN_YOFFSET = 10;
  ROCKETLEFT_SPAWN_XOFFSET = -50;
  ROCKETLEFT_SPAWN_YOFFSET = 10;

  ROCKET_RELOADFRAMES = 15;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.sceneRef = scene;
    this.sceneRef.add.existing(this);
    this.sceneRef.physics.add.existing(this);

    this.isJumping = false;
    this.reloadFrames = 0;
   
  }

 

  handleInput(
    cursors,
    inputController, // Todo separate key A/keyup from basecene
    audioManager
  ) {
    if (this.reloadFrames > 0) {
      this.reloadFrames--;
    }
    // WALK Movement
    if (    inputController.keyShift.isDown && inputController.keyA.isDown) {
      this.setVelocityX(-160); // Move Left
      this.anims.play("runLeft", true);
    }else if (cursors.left.isDown || inputController.keyA.isDown){
      this.setVelocityX(-190); // Move Left
      this.anims.play("left", true);
    } 
    else if (inputController.keyShift.isDown && inputController.keyD.isDown){
      this.setVelocityX(190); // Move right
      this.anims.play("runRight", true);
    }else if (cursors.right.isDown || inputController.keyD.isDown) {
      this.setVelocityX(160); // Move right
      this.anims.play("right", true);
    }
   else {
      this.setVelocityX(0); 
      this.anims.play("idle", true);
    }// Stop moving

    /*

    // Run movement
    if (cursors.left.isDown || inputController.keyA.isDown && inputController.keyShift.isDown) {
      this.setVelocityX(-160); // Move Left
      this.anims.play("runLeft", true);
    } else if (cursors.right.isDown || inputController.keyD.isDown && inputController.keyShift.isDown) {
      this.setVelocityX(160); // Move right
      this.anims.play("runRight", true);
    } else {
      this.setVelocityX(0); 
      this.anims.play("idle", true);
    }// Stop moving
    */
    // let jumWKey = cursors.up.isDown || inputController.keyUp.isDown && this.body.touching.down;

   
      
      
    

  //   if (this.body.touching.down) {
  //     this.isJumping = false;
  //  }

  

    

    if (cursors.up.isUp) {
      audioManager.stopSound("jump");
      
         this.isJumping = false;
       
      
    }

    // fire a rocket left
    if (inputController.keySpaceBar.isDown && inputController.keyA.isDown) {
      // FIXME: this is never true
      if (!inputController.spaceDownLastFrame) this.fireRocket(true);
      console.log("test Fire Left");
      
      inputController.spaceDownLastFrame = true;
      this.anims.play("fire", true);
    } else {
      inputController.spaceDownLastFrame = false;
    }

    // fire a rocket right
    if (inputController.keySpaceBar.isDown && inputController.keyD.isDown) {
      // FIXME: this is never true
      
      if (!inputController.spaceDownLastFrame) this.fireRocket(false);
    
      inputController.spaceDownLastFrame = true;
      this.anims.play("fire", true);
      console.log("test Fire Right");
      
    } else {
      inputController.spaceDownLastFrame = false;
    
    }

    let jumpWKey = cursors.up.isDown || inputController.keyUp.isDown;
      
    if (jumpWKey) {
    
      this.setVelocityY(-this.jumpForce);
      this.anims.play("up", true);
      // this.anims.play("playerJump", true);

      if (!this.isJumping) {
        audioManager.playSound("jump");
        this.isJumping = true;
      }
    } else if (cursors.down.isDown || inputController.keyS.isDown) {
      this.setVelocityY(160);
      this.anims.play("down", true);
    }
  

  }// end of handleInput function

  fireRocket(toLeft) {
    if (this.reloadFrames > 0) {
      return;
    }

    this.reloadFrames = this.ROCKET_RELOADFRAMES;
    let xOffset = toLeft
      ? this.ROCKETLEFT_SPAWN_XOFFSET
      : this.ROCKET_SPAWN_XOFFSET;
    let rocketImage = toLeft ? "rocketLeft" : "rocket";
    let xSpeed = toLeft ? -this.ROCKET_SPEED_X : this.ROCKET_SPEED_X;

    // console.log("firing a rocket!");
    this.rocket = this.sceneRef.physics.add.sprite(
      this.x + xOffset,
      this.y + this.ROCKET_SPAWN_YOFFSET,
      rocketImage
    );
    this.rocket.setVelocityX(xSpeed);
    this.rocket.setVelocityY(this.ROCKET_SPEED_Y);
  }

  takeDamage(amount) {
    console.log("taking " + amount + " damage");
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
    }
  }

  recoverHealth(amount) {
    console.log("healing " + amount + " HP");
    this.health += amount;
    if (this.health >= this.MAX_HEALTH) {
      this.health = this.MAX_HEALTH;
    }
  }
} // The end of class
