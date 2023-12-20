import audioManager from "./AudioManager.js";
import Player from "./Player.js";
import { SCENE_KEYS } from "./Constants.js";
import Healthbar from "./UI/Healthbar.js";

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
  keyShift;
  keyOne;
  keyTwo;
  keyThree;
  keyNumpadOne;
  keyNumpadTwo;
  keyNumpadThree;
  numKeys;

  // UI elements
  healthbar;

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
      "comicStrip1",
      "assets/Artwork/IntroCutScene/Robo-Explorer1-Ending/comicStrip1.png"
    );
    this.load.image(
      "buildingVan",
      "assets/Artwork/Environment/Levels/IntroScene/buildingVan.png"
    );
    this.load.image("rocket", "assets/Artwork/Weapons/rocket.png");
    this.load.image("spikes", "assets/Artwork/Environment/Items/spikes.png");
    this.load.image("rocketLeft", "assets/Artwork/Weapons/rocketLeft.png");
    this.load.image("bomb", "assets/Artwork/Environment/Items/bomb.png");
    this.load.image("healthbar", "assets/Artwork/UI/health-bar.png");
    this.load.image("healthUnit", "assets/Artwork/UI/health-unit.png");
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
  // Intro scene
  cutscene1() {
    var storyScene1;
    storyScene1 = this.physics.add.staticGroup();
    storyScene1.create(400, 490, "comicStrip1").setScale(0.3).refreshBody();
    console.log("Test if cutscene is working");
  }

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

  // TRAPS and ENEMIES

  spikes() {
    var spike;
    spike = this.physics.add.staticGroup();
    spike.create(100, 550, "spikes").setScale(1).refreshBody();
    console.log("Test if Spikes is working!");
  }

  collectBomb(player, bomb) {
    bomb.disableBody(true, true);
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

    // UI
    const scoreText = new ScoreHUD(this, 10, 10, "SCORE: ", {
      fontSize: "32px",
      fill: "#000",
    });
    this.add.text(scoreText.x, scoreText.y, scoreText.text, scoreText.style);
    this.healthbar = new Healthbar(
      this,
      25,
      125,
      "healthbar",
      "healthUnit",
      22,
      30
    );

    // MUSIC & SOUND
    audioManager.init(this);

    // PLAYER
    const PlayerPositionY = 10;
    const PlayerPositionX = 50;

    // Obstacle
    this.add.image(960, 135, "Bg");

    this.cursors = this.input.keyboard.createCursorKeys();
    // this.add.grid(0, 0, 192, 384, 48, 48).setOrigin(0, 0).setOutlineStyle(0x00ff00);
    this.player = new Player(this, PlayerPositionX, PlayerPositionY, "player");

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

    // WALK RIGHT ANIMATION
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [8, 9, 10, 11, 12],
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 8,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 16, end: 18 }),
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

    // WALK LEFT ANIMATION

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [4, 3, 2, 1, 0],
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 8,
    });

    // RUN RIGHT ANIMATION
    this.anims.create({
      key: "runRight",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [48, 49, 50, 51, 52,53,54,55],
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 10,
    });

    // RUN LEFT ANIMATION
    this.anims.create({
      key: "runLeft",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [56, 57, 58, 59, 60,61,62,63],
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 10,
    });

    // FIRING Rockets
    this.anims.create({
      key: "fire",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [26,27,28],
      }),
      // frames: [{ key: "player", frame: 1 }],
      // frames: this.anims.generateFrameNumbers("player", { start: 26, end: 28 }),
      frameRate: 3,
      // repeat: -1,
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
    this.keyShift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    ); // Press shift to run
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
    this.keyFour = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.FOUR
    );
    this.keyFive = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.FIVE
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
    this.cloudsbg.x += this.cloudsSpeed;
    this.cloudsbg2.x += this.cloudsSpeed;
    if (this.cloudsbg.x < -this.cloudsWidth / 2)
      this.cloudsbg.x += this.cloudsWidth * 2;
    if (this.cloudsbg2.x < -this.cloudsWidth / 2)
      this.cloudsbg2.x += this.cloudsWidth * 2;
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

    if (this.keyFour.isDown) {
      this.player.takeDamage(1);
      this.healthbar.setValue(this.player.health);
      console.log(this.player.health);
    }

    if (this.keyFive.isDown) {
      this.player.recoverHealth(1);
      this.healthbar.setValue(this.player.health);
      console.log(this.player.health);
    }

    // Pausing game
    if (this.keyP.isDown) {
      this.scene.launch("pauseScene");
      this.scene.pause();
    }

    this.player.handleInput(this.cursors, this, audioManager);

    // Update UI
    this.healthbar.setValue(this.player.health);
    this.healthbar.updateHealthFillImage();

    if (this.healthbar.getValue() <= 0) {
      this.scene.start(SCENE_KEYS.GAME_OVER);
    }
  }

  onCollision(player, obstacle) {
    console.log(this);
    console.log("Trying to load " + this.nextLevelName);
    player.scene.scene.start(this.nextLevelName);
  }
}
