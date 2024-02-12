import audioManager from "./AudioManager.js";
import BaseScene from "./BaseScene.js";
import Boss1 from "./Boss1.js";
export default class BossArea extends BaseScene {
  constructor() {
    super("BossArea", "Level1");
  }

  preload(){
    super.preload();
    this.load.image(
      "hoverBoard",
      "assets/Artwork/Environment/Levels/IntroScene/hoverBoard.png"
    );
  }
  animateClouds() {
    this.cloudsbg.x += this.cloudsSpeed;
    this.cloudsbg2.x += this.cloudsSpeed;
    if (this.cloudsbg.x < -this.cloudsWidth / 2)
      this.cloudsbg.x += this.cloudsWidth * 2;
    if (this.cloudsbg2.x < -this.cloudsWidth / 2)
      this.cloudsbg2.x += this.cloudsWidth * 2;
  }
  initClouds() {
    // we use two images so we can tile them as the camera moves
    // and not get any gaps or seams as it loops around

    this.cloudsWidth = 512 * 2; // hardcoded image size to tile
    this.cloudsSpeed = -0.5; // only works in negative direction

    this.cloudsbg = this.add.image(0, 0, "clouds");
    this.cloudsbg.setDepth(0); // handy for future use
    this.cloudsbg.setScale(2); // 2x pixels
    this.cloudsbg.alpha = 1; // opacity
    this.cloudsbg.x = 0; // start on screen
    this.cloudsbg.y = -56; // hardcoded to not overlap road

    this.cloudsbg2 = this.add.image(0, 0, "clouds");
    this.cloudsbg2.setDepth(0);
    this.cloudsbg2.setScale(2);
    this.cloudsbg2.alpha = 1;
    this.cloudsbg2.x = this.cloudsWidth;
    this.cloudsbg2.y = -56;
  }
  create() {
    this.initClouds();
    this.backgroundBuildings = this.add.tileSprite(0, 100, 800, 600, 'backgroundBuildings').setOrigin(0, 0);
    this.middleBuildings = this.add.tileSprite(0, 10, 800, 600, 'middleBuildings').setOrigin(0, 0);
    this.foreground = this.add.tileSprite(0, 0, 800, 600, 'foreground').setOrigin(0, 0);
    this.Boss1 = new Boss1(this, 500, 400, "Boss1");
    
   
    // This may need to be added to the base scene so that it's called anytime we move into a new scene derived from that class
    globalState.currentScene = this.scene.key; // global state key for storing the current scene key
    
    // this.platform();
     
    
   

    // this.boss1();
    this.hoverBoard = this.add.tileSprite(200, 200, 81, 22, 'hoverBoard').setOrigin(0, 0);
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
    let particles = this.add.particles(10, 800, "particles", particleOptions);
    particles.setDepth(999);

    audioManager.stopSound("track2");
    audioManager.playSound("track3");
  }

  
  update(){
    super.update();
    
    this.hoverBoard.x = this.player.x-45;
    this.hoverBoard.y = this.player.y+45;
    this.backgroundBuildings.tilePositionX += 2;
    this.middleBuildings.tilePositionX += 3;
    this.foreground.tilePositionX += 5;
    // this.buildingVan.tilePositionX -= 6;
   }
  // update() {
  //   this.animateClouds();
  // }
}