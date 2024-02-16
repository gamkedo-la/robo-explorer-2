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


  

 handleCollision(boss1, player) {
  player.takeDamage(10); 
  this.takeDamage(20);
  console.log("Taking damge from boss1")
  boss1.destroy();
}



takeDamage(amount) {
  console.log("boss1 taking " + amount + " damage");
  this.health -= amount;
  if (this.health <= 0) {
    this.health = 0;
    this.destroy();
  }
}

 

} // The end of class Boss1
