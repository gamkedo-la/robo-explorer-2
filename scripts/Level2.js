import audioManager from "./AudioManager.js";
import BaseScene from "./BaseScene.js";
  
export default class Level2 extends BaseScene { 
    constructor() 
    {
      
      super("Level2", "TestArea");
    }
  
    create()
    {
        
        
        this.building();
        super.create();

       
    }


  }
