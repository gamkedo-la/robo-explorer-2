import BaseScene from "./BaseScene.js";
import fx from "./Fx.js";

export default class KillerBee extends Phaser.Physics.Arcade.Sprite {
  sceneRef;
  player;
  health;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.sceneRef = scene;
    this.player = this.scene.player;
    this.sceneRef.add.existing(this);
    this.sceneRef.enemyList.add(this);
    this.sceneRef.physics.add.existing(this);
    this.scene.physics.add.collider(
      this,
      this.player.rockets,
      this.handleRocketCollision,
      null,
      this
    );
    this.body.allowGravity = false;
    this.health = 5;

    this.scene.physics.world.enable(this);
    this.speed = 50;

   

    this.play('beeAnimation');
    // Initialize the direction the bee is facing
    this.direction = -1; // 1 for right, -1 for left
  }

  handleCollision(bee, player) {
    player.takeDamage(10); 
    this.takeDamage(20); 
    // console.log("Taking damge from bee");
    bee.destroy();
  }

  handleRocketCollision(enemy, rocket){
    // console.log("rocket collision function test.");
    enemy.takeDamage(rocket.damage);
    rocket.destroy();
    
  }

  takeDamage(amount) {
    // console.log("Bee taking " + amount + " damage");
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.destroy();
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
} // The end of class KillerBee
