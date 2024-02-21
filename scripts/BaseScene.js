import audioManager from "./AudioManager.js";
import Player from "./Player.js";
import KillerBee from "./KillerBee.js";

import BatEnemy from "./BatEnemy.js";

import { SCENE_KEYS } from "./Constants.js";
import Healthbar from "./UI/Healthbar.js";
import fx from "./Fx.js";

import BossSelectText from "./UI/BossSelectText.js";

export default class BaseScene extends Phaser.Scene {
  cursors;
  isPaused = false;
  muteButtonIsDown = false;

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
  scoreText;
  healthbar;

  // ENEMY LIST
  enemyList;

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
      "ComicStory3",
      "assets/Artwork/IntroCutScene/Robo-Explorer1-Ending/ComicStory3.png"
    );
    this.load.image(
      "ComicStory4",
      "assets/Artwork/IntroCutScene/Robo-Explorer1-Ending/ComicStory4.png"
    );
    this.load.image(
      "buildingVan",
      "assets/Artwork/Environment/Levels/IntroScene/buildingVan.png"
    );

    this.load.image("rocket", "assets/Artwork/Weapons/Rocket.png");
    this.load.image("spikes", "assets/Artwork/Environment/Items/Spikes.png");
    this.load.image("rocketLeft", "assets/Artwork/Weapons/rocketLeft.png");
    // this.load.image("bomb", "assets/Artwork/Environment/Items/bomb.png");
    this.load.spritesheet(
      "labDoor",
      "assets/Artwork/Environment/Levels/LevelDoor/labDoor.png",{
        frameWidth: 280,
      frameHeight: 188,
      }
    );

  

    this.load.image("healthbar", "assets/Artwork/UI/health-bar.png");
    this.load.image("healthUnit", "assets/Artwork/UI/health-unit.png");
    this.load.image("bossFrame", "assets/Artwork/UI/boss-frame.png");
    this.load.image(
      "bossFrameHighlighted",
      "assets/Artwork/UI/boss-frame-highlighted.png"
    );

    // POWERUPS
    this.load.spritesheet(
      "powerupArmor",
      "assets/Artwork/Environment/Items/powerupArmor.png",
      { frameWidth: 64, frameHeight: 64 }
    );
    // ENEMIES
    this.load.spritesheet(
      "killerBee",
      "assets/Artwork/Enemies/Enemy1/killerBeeSpriteSheet.png",
      { frameWidth: 76, frameHeight: 76 }
    );

    this.load.spritesheet("BatEnemy", "assets/Artwork/Enemies/Enemy2/Bat.png", {
      frameWidth: 132,
      frameHeight: 132,
    });

    // BOSS1
    this.load.spritesheet(
      "Boss1",
      "assets/Artwork/Enemies/Boss1/Boss1spritesheet.png",
      {
        frameWidth: 500,
        frameHeight: 640,
      }
    );
    // PLAYER
    this.load.spritesheet(
      "player",
      "assets/Artwork/Player/playerSpriteSheet.png",
      {
        frameWidth: 132,
        frameHeight: 131,
      }
    );
    this.load.spritesheet(
      "movingPlatform",
      "assets/Artwork/Environment/Items/movingPlatform.png",
      {
        frameWidth: 96,
        frameHeight: 64,
      }
    );


    this.load.spritesheet(
      "bridge",
      "assets/Artwork/Environment/Levels/Level1/bridgeTile.png",
      {
        frameWidth: 120,
        frameHeight: 180,
      }
    );

    this.load.spritesheet(
      "bridge2",
      "assets/Artwork/Environment/Levels/Level1/bridgeTile2.png",
      {
        frameWidth: 2000,
        frameHeight: 180,
      }
    );
    // UI
    this.load.spritesheet(
      "bossTextSheet",
      "assets/Artwork/UI/boss-selection-text-Sheet.png",
      {
        frameWidth: 89,
        frameHeight: 50,
      }
    );

    // AUDIO BACKGROUND MUSIC
    this.load.audio(
      "track1",
      "assets/Audio/MusicTracks/Track1-DangerRoadVersions/Track1-DangerRoadv4.wav"
    );

    this.load.audio(
      "track2",
      "assets/Audio/MusicTracks/Track2-RedBloodVersion2.wav"
    );

    this.load.audio(
      "track3",
      "assets/Audio/MusicTracks/Track3-ElectroHeat.wav"
    );

    // AUDIO SFX
    this.load.audio("jump", "assets/Audio/Sfx/jump/jump-0.wav");
    this.load.audio("missile", "assets/Audio/Sfx/explosion/explosion2.mp3");

    // PARALLAX LAYERS
    this.load.image(
      "backgroundBuildings",
      "assets/Artwork/Environment/Levels/IntroScene/backgroundBuildings.png"
    );

    this.load.image(
      "middleBuildings",
      "assets/Artwork/Environment/Levels/IntroScene/middleBuildings.png"
    );
    this.load.image(
      "foreground",
      "assets/Artwork/Environment/Levels/IntroScene/foreground.png"
    );
  }

  // Intro scene
  cutscene1() {
    var storyScene1;
    storyScene1 = this.physics.add.staticGroup();
    storyScene1.create(390.5, 300, "ComicStory3").setScale(0.38).refreshBody();
  }

  cutscene2() {
    var storyScene1;
    storyScene1 = this.physics.add.staticGroup();
    storyScene1.create(390.5, 300, "ComicStory4").setScale(0.38).refreshBody();
  }

  // TRAPS and ENEMIES

  building() {
    var building;
    building = this.physics.add.staticGroup();
    building.create(800, 100, "buildingVan").setScale(1).refreshBody();
    console.log("Test if Building Van will work!");
  }
  // BOSS1
  // boss1() {
  //   var boss1;
  //   boss1 = this.physics.add.staticGroup();
  //   boss1.anims.play("boss1", true);
  //   return boss1.create(600, 350, "boss1").setScale(1).refreshBody();
  // }

  spikes() {
    var spike;
    spike = this.physics.add.staticGroup();
    spike.create(180, 570, "spikes").setScale(1).refreshBody();
    spike.create(600, 570, "spikes").setScale(1).refreshBody();
    spike.create(670, 570, "spikes").setScale(1).refreshBody();
    return spike.create(400, 570, "spikes").setScale(1).refreshBody();
    
    
  }

  // POWERUP

  powerupArmor() {
    var powerupArmor;
    powerupArmor = this.physics.add.group();

    var powerupArmor = powerupArmor
      .create(700, 300, "powerupArmor")
      .setScale(1)
      .setDirectControl()
      .setImmovable();
    // powerupArmor.anims.play("powerupArmor", true);
    // powerupArmor.body.bounce.y = 1;
    // powerupArmor.body.collideWorldBounds = true;
    // powerupArmor.anims.play("powerupArmor", true);
    powerupArmor.anims.play('powerupArmor1');
    return powerupArmor;
    // .create(400, 500, "powerupArmor")
    // .setScale(1)
    // .refreshBody();
  }

  movingPlatform() {
    var movingPlatforms;

    movingPlatforms = this.physics.add.group();
    var movingPlatform = movingPlatforms
      .create(1000, 300, "movingPlatform")
      .setScale(1)
      .setDirectControl()
      .setImmovable();
    movingPlatform.body.bounce.y = 1;
    movingPlatform.body.collideWorldBounds = true;
    movingPlatform.body.setSize(94, 37, false).setOffset(1, 0);
    movingPlatform.anims.play("platformLight", true);

    this.tweens.add({
      targets: movingPlatform,
      x: 200,
      duration: 4000,
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        movingPlatform.vx = movingPlatform.body.position.x - movingPlatform.previousX;
        movingPlatform.vy = movingPlatform.body.position.y - movingPlatform.previousY;
        movingPlatform.previousX = movingPlatform.body.position.x;
        movingPlatform.previousY = movingPlatform.body.position.y;
      }
    });

    return movingPlatform;
  }

  createBridge(){
    
      var bridge;
  
      this.bridge = this.physics.add.staticGroup();
      this.bridge.create(70, 500, 'bridge').setScale(1).refreshBody();
      this.bridge.create(300, 500, 'bridge').setScale(1).refreshBody();
      this.bridge.create(500, 500, 'bridge').setScale(1).refreshBody();
  }

  
  createBridge2(){
    
    var bridge2;

    this.bridge2 = this.physics.add.staticGroup();
    this.bridge2.create(1200, 600, 'bridge2').setScale(1).refreshBody();
    this.bridge2.create(3000, 650, 'bridge2').setScale(1).refreshBody();
    
}
  // collectBomb(player, bomb) {
  //   bomb.disableBody(true, true);
  // }

  hitBySpike(player, spike) {
    player.takeDamage(1);
    this.healthbar.setValue(this.player.health);
  }

  hitByEnemy(player, whichEnemy) {
    player.takeDamage(1); // Could be based on whichEnemy
    this.healthbar.setValue(this.player.health);
  }

  updateFromGroup(object){
    object.update();
  }


  create() {
    this.enemyList = this.physics.add.group(); 
    this.add.existing(this.enemyList);
    // TEST Camera bounds
    // this.cameras.main.setBounds(0, 0, 1600, 600);
    // this.physics.world.bounds.width = 2000;
    // this.physics.world.bounds.height = 600;
    // PARALLAX
    this.buildingVan = this.add
      .tileSprite(0, 280, 800, 320, "buildingVan")
      .setOrigin(1, 0);

    // UI
    const scoreText = new ScoreHUD(this, 10, 10, "SCORE: ", {
      fontSize: "32px",
      fill: "#000",
    });
    this.scoreText = this.add.text(scoreText.x, scoreText.y, scoreText.text, scoreText.style);
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
    const PlayerPositionY = 200;
    const PlayerPositionX = 50;

   

    this.cursors = this.input.keyboard.createCursorKeys();
    // this.add.grid(0, 0, 192, 384, 48, 48).setOrigin(0, 0).setOutlineStyle(0x00ff00);
    this.player = new Player(this, PlayerPositionX, PlayerPositionY, "player");
    new KillerBee(this, 500, 500, "killerBee"); // Add itself to enemyList
    
    new BatEnemy(this, 400, 400, "BatEnemy");



    // JUMP RIGHT
    this.anims.create({
      key: "up",
      //frames: [{ key: "player", frames: 64 }],
      frames: this.anims.generateFrameNumbers("player", {
        frames: [64, 65, 66, 67, 68, 69],
      }),
      frameRate: 12,
    });

    // JUMP LEFT
    /*
    this.anims.create({
      key: "upLeft",
      //frames: [{ key: "player", frames: 64 }],
      frames: this.anims.generateFrameNumbers("player", {
        // frames: [14], working
        frames: [72],
      }),
      frameRate: 10,
    });*/

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
        frames: [0, 1, 2, 3, 4],
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 6,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 16, end: 18 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "powerupArmor1",
      frames: this.anims.generateFrameNumbers("powerupArmor", {
        start: 0,
        end: 1,
      }),
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
      frameRate: 10,
    });

    // RUN RIGHT ANIMATION
    this.anims.create({
      key: "runRight",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [48, 49, 50, 51, 52, 53, 54, 55],
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 10,
    });

    // RUN LEFT ANIMATION
    this.anims.create({
      key: "runLeft",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [56, 57, 58, 59, 60, 61, 62, 63],
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 10,
    });

    // JUMP Animation
    /*
    this.anims.create({
      key: "playerJump",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [64, 65],
      }),
      
      frameRate: 8,
    });

*/
    // FIRING Rockets Right
    this.anims.create({
      key: "fire",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [34,35],
      }),
      // frames: [{ key: "player", frame: 1 }],
      // frames: this.anims.generateFrameNumbers("player", { start: 26, end: 28 }),
      frameRate: -100,
      // repeat: -1,
    });

    // use setFlipX in Player.js to flip left when firing
    //
    // this.anims.create({
    //   key: "fireLeft",
    //   frames: this.anims.generateFrameNumbers("player", {
    //     frames: [35],
    //   }),
    //   // frames: [{ key: "player", frame: 1 }],
    //   // frames: this.anims.generateFrameNumbers("player", { start: 26, end: 28 }),
    //   frameRate: -1,
    //   // repeat: -1,
    // });

    // ANIMATIONI FOR ON  PLATFORM
    this.anims.create({
      key: "onPlatform",
      frames: this.anims.generateFrameNumbers("player", { start: 16, end: 18 }),
      frameRate: 5,
      repeat: -1,
    });

    // TEST Bomb
    this.labDoor = this.physics.add.sprite(
      PlayerPositionX + 3000,
      PlayerPositionY,
      "labDoor"
    );

    // let bomb;
    // bomb = this.physics.add.group({
    //   key: "bomb",
    //   repeat: 10,
    //   setXY: { x: 12, y: 0, stepX: 70 },
    // });

    // bomb.children.iterate(function (child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });

    // PLATFORM LIGHT ANIMATION
    this.anims.create({
      key: "platformLight",
      frames: this.anims.generateFrameNumbers("movingPlatform"),
      frameRate: 4,
      repeat: -1,
    });

    // BOSS 1 ANimation
    // this.anims.create({
    //   key: "boss1_idle",
    //   frames: this.anims.generateFrameNumbers("boss1", { start: 0, end: 3 }),
    //   frameRate: 1,
    //   repeat: -1, // -1 means loop indefinitely
    // });


    this.anims.create({
      key: 'beeAnimation',
      frames: this.anims.generateFrameNumbers("killerBee",{start:0, end:3}),
      frameRate: 2.5,
      repeat: -1 // -1 for infinite loop
      });


      this.anims.create({
         key: 'batAnimation',
         frames: this.anims.generateFrameNumbers("BatEnemy",{start:0, end:4}),
         frameRate: 10,
         repeat: -1 // -1 for infinite loop
      });


      this.anims.create({
        key: 'Boss1Animation_idle',
        frames: this.anims.generateFrameNumbers("Boss1",{start:0, end:2}),
        frameRate: 5,
        repeat: -1 // -1 for infinite loop
     });


   

  
    let spike = this.spikes();
    let movingPlatform = this.movingPlatform();
    let bridge = this.createBridge();
    let bridge2 = this.createBridge2();
    let powerupArmor = this.powerupArmor();
    // Test for creating rocket

    // Collisions Code
    this.physics.add.collider(
      this.player,
      this.labDoor,

      this.onCollision,
      null,
      this
    );

    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      const { gameObject } = body;

      if (down) {
        this.player.isInAir = false;
        // console.log("Touching Bottom");
      }
    });

    console.log(this.nextLevelName);

    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true, 0, 0, true);
    this.labDoor.setCollideWorldBounds(true);

    // this.physics.add.overlap(this.player, bomb, this.collectBomb, null, this);
    this.physics.add.overlap(this.player, spike, this.hitBySpike, null, this);
    this.physics.add.overlap(this.player, this.enemyList, this.hitByEnemy, null, this);
    
    
    this.physics.add.collider(this.player, [movingPlatform], (player, movingPlatform) => {
      if (player.body.blocked.down) {
        player.isInAir = false;
        console.log("Touching Bottom");
        player.isOnPlatform = true;
        player.currentPlatform = movingPlatform;
      }
    });

    this.physics.add.collider(this.player, this.bridge, (player,bridge) => {
      if (player.body.blocked.down) {
        player.isInAir = false;
        console.log("Touching Bottom");
        player.isOnPlatform = true;
        player.currentPlatform = bridge;
      }
    });

    
    this.physics.add.collider(this.player, this.bridge2, (player,bridge2) => {
      if (player.body.blocked.down) {
        player.isInAir = false;
        console.log("Touching Bottom");
        player.isOnPlatform = true;
        player.currentPlatform = bridge2;
      }
    });

    this.initInputs();

      // Background Music
        const track1 = this.sound.add("track1", { volume: 0.5, loop:true });
        const track2 = this.sound.add("track2", { volume: 0.5, loop: true });
        const track3 = this.sound.add("track3", { volume: 0.5, loop: true });
        
        
       
  } // end of create() method in BaseScene

  initInputs() {
    // only need to be set up one time at init (not every frame)
    console.log("Initializing player input");
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Move Up
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Move left
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Move right
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // Move down
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); // Pause game
    this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M); // Mute game
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

  update() {
    this.updateHealthBarPosition();
    this.enemyList.children.entries.forEach(this.updateFromGroup);
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

    // Muting the game
    if (this.keyM.isDown && !this.muteButtonIsDown) {
      globalState.muted = !globalState.muted;
      this.muteButtonIsDown = true;
    }

    if (this.keyM.isUp) {
      this.muteButtonIsDown = false;
    }

    // if(this.player.body.touching.down){
    //   console.log("jump limit test");
    //   this.isJumping = false;
    // }

    this.player.handleInput(this.cursors, this, audioManager);

    // Update UI

    this.healthbar.setValue(this.player.health);
    this.healthbar.updateHealthFillImage();

    if (this.healthbar.getValue() <= 0) {
      this.scene.start(SCENE_KEYS.GAME_OVER);
    }

    this.player.update();
  }

  updateHealthBarPosition() {
    // Update the health bar position to follow the camera
    this.healthbar.x = this.cameras.main.scrollX + 25;
    this.healthbar.y = this.cameras.main.scrollY + 125;
    this.scoreText.x = this.cameras.main.scrollX + 10;
    this.scoreText.y = this.cameras.main.scrollY + 10;
  }

  onCollision(player, labDoor) {
    console.log(this);
    console.log("Trying to load " + this.nextLevelName);

    fx.forceReset();
    player.scene.scene.start(this.nextLevelName);
  }
}
