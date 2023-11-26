export default class Player extends Phaser.Physics.Arcade.Sprite {
    isJumping;
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

   this.isJumping = false;
  }

  handleInput(cursors, 
    inputController, // Todo separate key A/keyup from basecene
    audioManager
    ) { 
    // Movement
    if (cursors.left.isDown || inputController.keyA.isDown) {
      this.setVelocityX(-160);
      this.anims.play("left", true);
    } else if (cursors.right.isDown || inputController.keyD.isDown) {
      this.setVelocityX(160);
      this.anims.play("right", true);
    } else {
      this.setVelocityX(0);
      this.anims.play("idle", true);
    }

    if (cursors.up.isDown || inputController.keyUp.isDown) {
      this.setVelocityY(-430);
      this.anims.play("up", true);

      if (!this.isJumping) {
        audioManager.playSound("jump");
        this.isJumping = true;
      }
    } else if (cursors.down.isDown || inputController.keyS.isDown) {
      this.setVelocityY(160);
      this.anims.play("down", true);
    }

    if (cursors.up.isUp) {
      audioManager.stopSound("jump");
      this.isJumping = false;
    }
  }
}
