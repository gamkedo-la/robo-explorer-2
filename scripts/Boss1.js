import BaseScene from "./BaseScene.js";
import fx from "./Fx.js";

export default class Boss1 extends Phaser.Physics.Arcade.Sprite {
  sceneRef;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.sceneRef = scene;
    this.sceneRef.add.existing(this);
    this.sceneRef.physics.add.existing(this);
    this.scene.physics.add.collider(this, this.player, this.handleCollision, null, this);
    this.body.allowGravity=false;
    this.health = 100; 
    this.play('Boss1Animation_idle');
  }

 // 1 stop the bee falling
 // 2 touch the bee and take damage
 // 3 make the bee move on its own. 
 // Until stops falling test for in the scene
 handleCollision(boss1, player) {
  // Your logic for what happens when the player touches the bee
  // For example, you might decrease player health and damage the bee
  player.takeDamage(10); // Assuming your player class has a takeDamage method

  // Damage the bee
  this.takeDamage(20); // Adjust the damage value as needed
  console.log("Taking damge from boss1")
  // Additional logic for handling the collision
  // For example, you might play a sound, show an animation, etc.

  // Destroy the bee sprite if needed
  boss1.destroy();
}



takeDamage(amount) {
  console.log("boss1 taking " + amount + " damage");
  this.health -= amount;
  if (this.health <= 0) {
    this.health = 0;
    // Additional logic for when the bee is defeated
    // For example, play an explosion animation, spawn particles, etc.
    this.destroy();
  }
}

 

} // The end of class Player
