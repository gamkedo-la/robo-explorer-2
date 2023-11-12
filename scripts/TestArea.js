import audioManager from "./AudioManager.js";
import BaseScene from "./BaseScene.js";
  
export default class TestArea extends BaseScene { 
    constructor() 
    {
      //   super({ key: "Level1", active: true });
      super("TestArea");
    }
  
    create()
    {
        super.create();
    }
  }

  var onCollision = function onCollision(player, obstacle) {
    console.log(this);
    console.log("Trying to load level1");
    player.scene.scene.start("Level1");
    //Level1.player.scene.scene.start("Level2");
  };
