import audioManager from "./AudioManager.js";
import BaseScene from "./BaseScene.js";
  
export default class Level1 extends BaseScene { 
    constructor() 
    {
      super("Level1", "Level2");
    }
  
    create()
    {
        
        this.platform();
        this.building();
        this.spikes();
        super.create();

       
    }


  }
