import audioManager from "./AudioManager.js";
import Player from "./Player.js";
import { SCENE_KEYS } from "./Constants.js";

export default class BaseScene extends Phaser.Scene {
  cursors;
  isPaused = false;
  
  sceneKeyArray = Object.values(SCENE_KEYS);
  keyUp;
  keyA;
  keyD;
  keyS;
  keyP;
  keySpaceBar;
  keyOne;
  keyTwo;
  keyThree;
  keyNumpadOne;
  keyNumpadTwo;
  keyNumpadThree;
  numKeys;

  constructor(levelKey, nextLevel) {
    super({ key: levelKey });
    this.nextLevelName = nextLevel;
  }

  preload() {
    this.load.spritesheet("particles", "assets/Artwork/FX/particles.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    // this.load.image("Bg", "assets/Artwork/Environment/Levels/IntroScene/Bg.png");
    
    this.load.image("clouds", "assets/Artwork/FX/clouds.png");
    
    this.load.image(
      "roadsand",
      "assets/Artwork/Environment/Levels/IntroScene/roadsand.png"
    );
    this.load.image(
      "buildingVan",
      "assets/Artwork/Environment/Levels/IntroScene/buildingVan.png"
    );
    this.load.image("rocket", "assets/Artwork/Weapons/rocket.png");
    this.load.image("rocketLeft", "assets/Artwork/Weapons/rocketLeft.png");
    this.load.image("bomb", "assets/Artwork/Environment/Items/bomb.png");
    this.load.image("healthbar", "assets/Artwork/UI/health-bar.png");
    this.load.spritesheet(
      "player",
      "assets/Artwork/Player/playerSpriteSheet.png",
      {
        frameWidth: 132,
        frameHeight: 132,
      }
    );
    this.load.audio("jump", "assets/Audio/Sfx/jump/jump-0.wav");
  }

  // Test Platforms

  platform() {
    var platforms;
    platforms = this.physics.add.staticGroup();
    platforms.create(800, 100, "roadsand").setScale(1).refreshBody();
    console.log("Test if platform function is working");
  }

  building() {
    var building;
    building = this.physics.add.staticGroup();
    building.create(1000, 100, "buildingVan").setScale(1).refreshBody();
    console.log("Test if Building Van will work!");
  }

  collectBomb(player, bomb) {
    bomb.disableBody(true, true);
  }

  initClouds() {
    // TODO more than one layer moving at dferent speeds
    this.cloudsbg = this.add.image(0, 0, "clouds");
    this.cloudsbg.setDepth(0); // handy for future use
    this.cloudsbg.setScale(2); // 2x pixels
    this.cloudsbg.alpha = 1; // opacity
    this.cloudsbg.x = 300; // start on screen
    this.cloudsbg.y = -56; // hardcoded to not overlap road
  }

  create() {

    this.initClouds();

    // UI
    const scoreText = new ScoreHUD(this, 10, 10, "SCORE: ", {
      fontSize: "32px",
      fill: "#000",
    });
    this.add.text(scoreText.x, scoreText.y, scoreText.text, scoreText.style);
    this.add.image(25, 125, "healthbar");

    // MUSIC & SOUND
    audioManager.init(this);

    // PLAYER
    const PlayerPositionY = 10;
    const PlayerPositionX = 50;

    // Obstacle
    this.add.image(960, 135, "Bg");


    this.cursors = this.input.keyboard.createCursorKeys();
    // this.add.grid(0, 0, 192, 384, 48, 48).setOrigin(0, 0).setOutlineStyle(0x00ff00);
    this.player = new Player(
      this, 
      PlayerPositionX,
      PlayerPositionY,
      "player"
    );

    // this.anims.create({
    //   key: "up",
    //   frames: this.anims.generateFrameNumbers("player", { start: 2, end: 1 }),
    //   // frames: [{ key: "player", frame: 3 }],
    //   frameRate: 5,
    //   repeat: -1,
    // });

    this.anims.create({
      key: "up",
      frames: [{ key: "player", frame: 6 }],
      frameRate: 5,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", {
        start: 1,
        end: 2,
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [8, 9, 10, 11, 12],
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 5,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 13, end: 14 }),
      frameRate: 5,
      repeat: -1,
    });

    /*
     this.anims.create({
       key: "idle",
       frames: [{key:"player", frame: [13,14]}],
       frameRate: 8,
       repeat: -1
     });*/

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [4, 3, 2, 1, 0],
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 5,
    });

    // FIRING Rockets
    this.anims.create({
      key: "fire",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [26, 27,28],
      }),
      // frames: [{ key: "player", frame: 1 }],
      // frames: this.anims.generateFrameNumbers("player", { start: 26, end: 28 }),
      frameRate: 10,
      repeat: -1
    });

    // TEST Bomb
    this.obstacle = this.physics.add.sprite(
      PlayerPositionX + 710,
      PlayerPositionY,
      "bomb"
    );

    let bomb;
    bomb = this.physics.add.group({
      key: "bomb",
      repeat: 10,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    bomb.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Test for creating rocket

    // Collisions Code
    this.physics.add.collider(
      this.player,
      this.obstacle,
      this.onCollision,
      null,
      this
    );
    console.log(this.nextLevelName);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.obstacle.setCollideWorldBounds(true);
    // this.rocket.setCollideWorldBounds(true);

    this.physics.add.overlap(this.player, bomb, this.collectBomb, null, this);

    this.initInputs();
  }

  initInputs() {
    // only need to be set up one time at init (not every frame)
    console.log("Initializing player input");
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Move Up
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Move left
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Move right
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // Move down
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); // Pause game
    this.keySpaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    ); // fire rocket
    this.keyOne = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ONE
    );
    this.keyTwo = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.TWO
    );
    this.keyThree = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.THREE
    );
    this.keyNumpadOne = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE
    );
    this.keyNumpadTwo = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO
    );
    this.keyNumpadThree = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE
    );
    this.numKeys = [
      this.keyOne,
      this.keyTwo,
      this.keyThree,
      this.keyNumpadOne,
      this.keyNumpadTwo,
      this.keyNumpadThree,
    ];
  }

  animateClouds() {
    if (!this.cloudsbg) return;
    this.cloudsbg.x += 0.1;
  }
  
  update() {

    this.animateClouds();
    
    // Dev tool to move between scenes with num keys
    this.numKeys.forEach((key) => {
      if (key.isDown) {
        console.log("num key pressed: " + key.originalEvent.key);
        const keyNumber = parseInt(key.originalEvent.key);
        const nextScene = this.sceneKeyArray[keyNumber - 1];
        console.log("starting scene: " + nextScene);
        this.scene.start(nextScene);
      }
    });

    // Pausing game
    if (this.keyP.isDown) {
      this.scene.launch("pauseScene");
      this.scene.pause();
    }

    this.player.handleInput(this.cursors, this, audioManager);

   
  }


  onCollision(player, obstacle) {
    console.log(this);
    console.log("Trying to load " + this.nextLevelName);
    player.scene.scene.start(this.nextLevelName);
  }
}
