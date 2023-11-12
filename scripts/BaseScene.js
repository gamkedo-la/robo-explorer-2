import audioManager from "./AudioManager.js";
import { SCENE_KEYS } from "./Constants.js";

export default class BaseScene extends Phaser.Scene {
  cursors;
  // keyA;
  isJumping;
  isPaused = false;

  ROCKET_SPEED_X = 1000;
  ROCKET_SPEED_Y = 0;
  ROCKET_SPAWN_XOFFSET = 50;
  ROCKET_SPAWN_YOFFSET = 10;

  sceneKeyArray = Object.values(SCENE_KEYS);

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

    this.load.image(
      "roadsand",
      "assets/Artwork/Environment/Levels/IntroScene/roadsand.png"
    );
    this.load.image(
      "buildingVan",
      "assets/Artwork/Environment/Levels/IntroScene/buildingVan.png"
    );
    this.load.image("rocket", "assets/Artwork/Weapons/rocket.png");
    this.load.image("bomb", "assets/Artwork/Environment/Items/bomb.png");
    this.load.spritesheet(
      "player",
      "assets/Artwork/Player/playerWalkRightLeft.png",
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

  create() {
    // UI
    const scoreText = new ScoreHUD(this, 10, 10, "SCORE: ", {
      fontSize: "32px",
      fill: "#000",
    });
    this.add.text(scoreText.x, scoreText.y, scoreText.text, scoreText.style);

    // MUSIC & SOUND
    audioManager.init(this);

    // PLAYER
    const PlayerPositionY = 10;
    const PlayerPositionX = 50;

    // Obstacle

    this.add.image(960, 135, "Bg");

    this.cursors = this.input.keyboard.createCursorKeys();
    // this.add.grid(0, 0, 192, 384, 48, 48).setOrigin(0, 0).setOutlineStyle(0x00ff00);
    this.player = this.physics.add.sprite(
      PlayerPositionX,
      PlayerPositionY,
      "player"
    );

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", { start: 2, end: 1 }),
      // frames: [{ key: "player", frame: 3 }],
      frameRate: 5,
      repeat: -1,
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
        start: 1,
        end: 2,
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 5,
      repeat: -1,
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
    this.rocket = this.physics.add.sprite(
      PlayerPositionX + 10,
      PlayerPositionY,
      "rocket"
    );

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
    this.rocket.setCollideWorldBounds(true);

    this.physics.add.overlap(this.player, bomb, this.collectBomb, null, this);
  }

  update() {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 300;

    let keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Move Up
    let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Move left
    let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Move right
    let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // Move down
    let keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); // Pause game
    let keySpaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE1
    );

    // Number keys
    let keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    let keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    let keyThree = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.THREE
    );
    let keyNumpadOne = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE
    );
    let keyNumpadTwo = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO
    );
    let keyNumpadThree = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE
    );
    const numKeys = [
      keyOne,
      keyTwo,
      keyThree,
      keyNumpadOne,
      keyNumpadTwo,
      keyNumpadThree,
    ];

    // Dev tool to move between scenes with num keys
    numKeys.forEach((key) => {
      if (key.isDown) {
        console.log("num key pressed: " + key.originalEvent.key);
        const keyNumber = parseInt(key.originalEvent.key);
        const nextScene = this.sceneKeyArray[keyNumber - 1];
        console.log("starting scene: " + nextScene);
        this.scene.start(nextScene);
      }
    });

    // Pausing game
    if (keyP.isDown) {
      this.scene.launch("pauseScene");
      this.scene.pause();
    }

    // Movement
    if (this.cursors.left.isDown || keyA.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown || keyD.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    }

    if (this.cursors.up.isDown || keyUp.isDown) {
      this.player.setVelocityY(-430);
      this.player.anims.play("up", true);

      if (!this.isJumping) {
        audioManager.playSound("jump");
        this.isJumping = true;
      }
    } else if (this.cursors.down.isDown || keyS.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("down", true);
    }

    if (this.cursors.up.isUp) {
      audioManager.stopSound("jump");
      this.isJumping = false;
    }

    // fire a rocket
    if (keySpaceBar.isDown) {
      if (!this.spaceDownLastFrame) this.fireRocket();
      this.spaceDownLastFrame = true;
    } else {
      this.spaceDownLastFrame = false;
    }
  }

  fireRocket() {
    // console.log("firing a rocket!");
    this.rocket = this.physics.add.sprite(
      this.player.x + this.ROCKET_SPAWN_XOFFSET,
      this.player.y + this.ROCKET_SPAWN_YOFFSET,
      "rocket"
    );
    this.rocket.setVelocityX(this.ROCKET_SPEED_X);
    this.rocket.setVelocityY(this.ROCKET_SPEED_Y);
  }

  onCollision(player, obstacle) {
    console.log(this);
    console.log("Trying to load " + this.nextLevelName);
    player.scene.scene.start(this.nextLevelName);
  }
}
