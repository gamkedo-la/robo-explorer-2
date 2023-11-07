import audioManager from "./AudioManager.js";


class TestArea extends Phaser.Scene {
  cursors;
  // keyA;
  isJumping;

  constructor() {
    //   super({ key: "Level1", active: true });
    super({ key: "TestArea" });
  }

  preload() {
    this.load.spritesheet("particles", "assets/Artwork/FX/particles.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    // this.load.image("Bg", "assets/Artwork/Environment/Levels/IntroScene/Bg.png");
    this.load.image("roadsand", "assets/Artwork/Environment/IntroScene/roadsand.png");
    this.load.spritesheet("player", "assets/Artwork/Player/player.png", {
      frameWidth: 132,
      frameHeight: 132,
    });
    this.load.audio("jump", "assets/Audio/Sfx/jump/jump-0.wav");
  }

  testParticles() {
    // just experimenting with phaser particle fx
    // I will move this code to it's own file soon
    // uses a spritesheet so all particles are on
    // this one image in an 8x8 grid
    // see https://newdocs.phaser.io/docs/3.60.0/Phaser.Types.GameObjects.Particles.ParticleEmitterConfig
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
    let particles = this.add.particles(500, 550, "particles", particleOptions);
    particles.setDepth(999);
  }

  // Test Platforms
  
  platform() {
    var platforms;
    platforms = this.physics.add.staticGroup(); 
    platforms.create(100, 500 , "roadsand").setScale(1).refreshBody();
    console.log("Test if platform function is working");
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

    this.add.image(960, 135, "Bg");

    this.testParticles();

    this.platform();
     
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
      repeat: -1
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { 
        start: 1, end: 2
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 5,
      repeat: -1
    });

    this.obstacle = this.physics.add.sprite(
      PlayerPositionX + 710,
      PlayerPositionY,
      "obstacle"
    );

    this.physics.add.collider(this.player, this.obstacle, onCollision);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.obstacle.setCollideWorldBounds(true);
  }

  update() {

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 300;

    let keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Move Up
    let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Move left 
    let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Move right
    let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // Move down
    let keySpaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  

    if (this.cursors.left.isDown || keyA.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown || keyD.isDown) {
      this.player.setVelocityX(160);
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
  
  }
}



class Level1 extends Phaser.Scene {
  cursors;
  // keyA;
  isJumping;

  constructor() {
    //   super({ key: "Level1", active: true });
    super({ key: "Level1" });
  }

  preload() {
    this.load.spritesheet("particles", "assets/Artwork/FX/particles.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("Bg", "assets/Artwork/Environment/Levels/IntroScene/Bg.png");
    this.load.spritesheet("player", "assets/Artwork/Player/player.png", {
      frameWidth: 132,
      frameHeight: 132,
    });
    this.load.audio("jump", "assets/Audio/Sfx/jump/jump-0.wav");
  }

  testParticles() {
    // just experimenting with phaser particle fx
    // I will move this code to it's own file soon
    // uses a spritesheet so all particles are on
    // this one image in an 8x8 grid
    // see https://newdocs.phaser.io/docs/3.60.0/Phaser.Types.GameObjects.Particles.ParticleEmitterConfig
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
    let particles = this.add.particles(500, 550, "particles", particleOptions);
    particles.setDepth(999);
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

    this.add.image(960, 135, "Bg");

    this.testParticles();

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
      repeat: -1
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { 
        start: 1, end: 2
      }),
      // frames: [{ key: "player", frame: 1 }],
      frameRate: 5,
      repeat: -1
    });

    this.obstacle = this.physics.add.sprite(
      PlayerPositionX + 710,
      PlayerPositionY,
      "obstacle"
    );

    this.physics.add.collider(this.player, this.obstacle, onCollision2);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.obstacle.setCollideWorldBounds(true);
    // this.input.manager.enabled = true;

    // this.input.once(
    //   "pointerdown",
    //   function () {
    //     this.scene.start("Level2");
    //   },
    //   this
    // );
  }

  update() {
    // const cam = this.cameras.main;
    // const speed = 3;
    // if(cursors.left.isDown){
    //     // move left
    //     cam.scrollX -= speed
    // }
    // this.player.setVelocity(200);
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 300;

    let keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Move Up
    let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Move left 
    let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Move right
    let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // Move down
    let keySpaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  

    if (this.cursors.left.isDown || keyA.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown || keyD.isDown) {
      this.player.setVelocityX(160);
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
  
  }
}

class Level2 extends Phaser.Scene {
  constructor() {
    // super({ key: "Level2", active: false });
    super({ key: "Level2" });
  }

  preload() {
    //E:\xampp\htdocs\htgd\robo-explorer-2\assets\Artwork\Player
    this.load.image("player", "assets/Artwork/Player/player.png", {
      frameWidth: 171,
      frameHeight: 144,
    });
  }

  create() {
    const PlayerPositionY = 20;
    const PlayerPositionX = 200;

    Level2.player = this.physics.add.sprite(
      PlayerPositionX,
      PlayerPositionY,
      "player"
    );

    Level2.player.setBounce(0.2);
    Level2.player.setCollideWorldBounds(true);

    // this.input.manager.enabled = true;

    // this.input.once(
    //   "pointerdown",
    //   function () {
    //     this.scene.start("Level1");
    //   },
    //   this
    // );
  }

  update() {}
}

var onCollision = function onCollision(player, obstacle) {
  console.log(this);
  console.log("Trying to load level1");
  player.scene.scene.start("Level1");
  //Level1.player.scene.scene.start("Level2");
};

var onCollision2 = function onCollision2(player, obstacle) {
  console.log(this);
  console.log("Trying to load level2");
  player.scene.scene.start("Level2");
  //Level1.player.scene.scene.start("Level2");
};

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#4488aa",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [TestArea,Level1, Level2],
};

var game = new Phaser.Game(config);
