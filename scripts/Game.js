class Level1 extends Phaser.Scene {
  cursors;
  keyA;

  constructor() {
    //   super({ key: "Level1", active: true });
    super({ key: "Level1" });
  }

  preload() {
    this.load.spritesheet("particles", "assets/Artwork/FX/particles.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("Bg", "assets/Artwork/Environment/Levels/Bg.png");
    this.load.spritesheet("player", "assets/Artwork/Player/player.png", {
      frameWidth: 660,
      frameHeight: 132,
    });
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

    // PLAYER
    const PlayerPositionY = 10;
    const PlayerPositionX = 50;

    this.add.image(960, 135, "Bg");

    this.testParticles();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = this.physics.add.sprite(
      PlayerPositionX,
      PlayerPositionY,
      "player"
    );

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 4 }),
      frameRate: 20,
    });

    this.obstacle = this.physics.add.sprite(
      PlayerPositionX + 210,
      PlayerPositionY,
      "obstacle"
    );

    this.physics.add.collider(this.player, this.obstacle, onCollision);

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
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-300);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(300);
      this.player.anims.play("down");
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
  scene: [Level1, Level2],
};

var game = new Phaser.Game(config);
