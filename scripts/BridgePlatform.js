import audioManager from "./AudioManager.js";
import BaseScene from "./BaseScene.js";


export default class BridgePlatform extends Phaser.Physics.Arcade.Sprite { 
    bridge = this.createBridge();
    constructor() {
    //    super({ key: 'BaseScene' });
    this.sceneRef = scene;
    }
   
  
         createBridge(){
    
            var bridge;
  
            this.bridge = this.physics.add.staticGroup();
            this.bridge.create(70, 500, 'bridge').setScale(1).refreshBody();
            this.bridge.create(300, 500, 'bridge').setScale(1).refreshBody();
            this.bridge.create(500, 500, 'bridge').setScale(1).refreshBody();
            this.bridge.create(2700, 600, 'bridge').setScale(1).refreshBody();
            this.bridge.create(2900, 600, 'bridge').setScale(1).refreshBody();
            this.bridge.create(3200, 600, 'bridge').setScale(1).refreshBody();
         }
        
  
}