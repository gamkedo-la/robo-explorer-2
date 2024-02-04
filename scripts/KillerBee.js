import BaseScene from "./BaseScene.js";
import fx from "./Fx.js";

export default class KillerBee extends Phaser.Physics.Arcade.Sprite {
  sceneRef;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.sceneRef = scene;
    this.sceneRef.add.existing(this);
    this.sceneRef.physics.add.existing(this);

  }

 // 1 stop the bee falling
 // 2 touch the bee and take damage
 // 3 make the bee move on its own. 
 // Until stops falling test for in the scene
 



  takeDamage(amount) {
    console.log("taking " + amount + " damage");
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
    }
  }

 

} // The end of class Player
