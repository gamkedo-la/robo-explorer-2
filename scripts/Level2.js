import audioManager from "./AudioManager.js";
import BaseScene from "./BaseScene.js";
  
export default class Level2 extends BaseScene { 
    constructor() 
    {
      
      super("Level2", "BossArea");
    }
  
    create()
    {

      this.cameras.main.setBounds(0, 0, 4000, 600);
      this.physics.world.bounds.width = 2000;
      this.physics.world.bounds.height = 600;
      audioManager.stopSound("track1");
      // audioManager.playSound("track2");
        
        this.building();
        super.create();
        this.cameras.main.startFollow(this.player);
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
        audioManager.playSound("track2");
    }


  }
