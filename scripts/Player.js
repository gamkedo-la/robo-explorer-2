import BaseScene from "./BaseScene.js";
import fx from "./Fx.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  sceneRef;

  // JUMPING
  isJumping;
  isInAir;
  jumpForce = 200;
  lastFacingRight = true;
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
    if (inputController.keyShift.isDown && inputController.keyA.isDown) {
      this.setVelocityX(-160); // Move Left
      this.lastFacingRight = this.body.velocity.x < 0;
      if (this.isInAir == false) {
        this.anims.play("runRight", true);
      }
    } else if (cursors.left.isDown || inputController.keyA.isDown) {
      this.setVelocityX(-190); // Move Left
      this.lastFacingRight = this.body.velocity.x < 0;
      if (this.isInAir == false) {
        this.anims.play("right", true);
      }
    } else if (inputController.keyShift.isDown && inputController.keyD.isDown) {
      this.setVelocityX(190); // Move right
      this.lastFacingRight = this.body.velocity.x < 0;
      if (this.isInAir == false) {
        this.anims.play("runRight", true);
      }
    } else if (cursors.right.isDown || inputController.keyD.isDown) {
      this.setVelocityX(160); // Move right
      this.lastFacingRight = this.body.velocity.x < 0;
      if (this.isInAir == false) {
        this.anims.play("right", true);
      }
    } else {
      this.setVelocityX(0);
      if(this.isInAir == false){
        this.anims.play("idle", true);
      }
    } // Stop moving

    if (cursors.up.isUp || inputController.keyUp.isUp) {
      audioManager.stopSound("jump");
      this.isJumping = false;
    }

    if (inputController.keySpaceBar.isDown) {
        if (!inputController.spaceDownLastFrame) this.fireRocket(this.lastFacingRight);
        inputController.spaceDownLastFrame = true;
        this.anims.play("fire", true);
        audioManager.playSound("missile");
       
    } else {
      inputController.spaceDownLastFrame = false;
     

    }

    let jumpWKey = cursors.up.isDown || inputController.keyUp.isDown;
    if (jumpWKey) {
        if (inputController.keyD.isDown) {
          this.setVelocityY(-this.jumpForce);
          fx.smoke(this.x, this.y, this.sceneRef); // rocket pack smoke

          if (!this.isJumping) {
            audioManager.playSound("jump");
            this.isJumping = true;
          }
        } else if (inputController.keyA.isDown) {
          this.setVelocityY(-this.jumpForce);
          fx.smoke(this.x + 40, this.y, this.sceneRef); // rocket pack smoke

          if (!this.isJumping) {
            audioManager.playSound("jump");
            this.isJumping = true;
          }
        }
        if (!this.isInAir && this.isJumping) {
            this.anims.play("up", true);
        }
        this.isInAir = true;
    }
    else if (cursors.down.isDown || inputController.keyS.isDown) {
      this.setVelocityY(160);
    }
    this.setFlipX(this.lastFacingRight);
  } // end of handleInput function

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

  collisionPlatform() {
    this.isInAir = false;
    this.physics.add.collider(this.player, platform);
  }
} // The end of class
