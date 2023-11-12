import audioManager from "./AudioManager.js";
import BaseScene from "./BaseScene.js";
  
export default class Level1 extends BaseScene { 
    constructor() 
    {
      //   super({ key: "Level1", active: true });
      super("Level1");
    }
  
    create()
    {
        this.platform();
        this.building();
        super.create();

       
    }


  }

  var onCollision = function onCollision(player, obstacle) {
    console.log(this);
    console.log("Trying to load level2");
    player.scene.scene.start("Level2");
    //Level1.player.scene.scene.start("Level2");
  };
