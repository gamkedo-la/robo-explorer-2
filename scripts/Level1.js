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
        this.boss1();
        super.create();

        let particleOptions = {
          frame: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          angle: { min: 180, max: 360 },
          speed: { min: 50, max: 200 },
          frequency: 50,
          gravityY: 200,
          scale: { start: 1, end: 1 },
          alpha: { start: 1, end: 0 },
          lifespan: { min: 500, max: 2500 },
          blendMode: "ADD", // lighten
        };
        let particles = this.add.particles(10, 550, "particles", particleOptions);
        particles.setDepth(999);
    }


  }
