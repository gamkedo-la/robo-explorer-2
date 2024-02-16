import BaseScene from "./BaseScene.js";
import fx from "./Fx.js";

export default class BatEnemy extends Phaser.Physics.Arcade.Sprite {
  sceneRef;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.sceneRef = scene;
    this.player = this.scene.player;
    this.sceneRef.add.existing(this);
    this.sceneRef.physics.add.existing(this);

    this.body.allowGravity=false;
    this.play('batAnimation');
    this.direction = -1; // 1 for right, -1 for left
 
    this.health = 5;

    this.scene.physics.world.enable(this);
    this.speed = 50;

   

 
  }


  takeDamage(amount) {
    console.log("taking " + amount + " damage");
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
    }
  }

  
  update() {
    this.moveToPlayer();
  }

  moveToPlayer() {
    // Calculate the direction to the player
    const directionX = this.player.x - this.x;
    const directionY = this.player.y - this.y;
    if (directionX * this.direction < 0) {
      this.flipX = !this.flipX;
      this.direction *= -1;
  }
    // Normalize the direction vector
    const length = Math.sqrt(directionX * directionX + directionY * directionY);
    const normalizedDirectionX = directionX / length;
    const normalizedDirectionY = directionY / length;

    // Move the KillerBee towards the player
    this.body.velocity.x = normalizedDirectionX * this.speed;
    this.body.velocity.y = normalizedDirectionY * this.speed;

  }

 

} // The end of class Bat
