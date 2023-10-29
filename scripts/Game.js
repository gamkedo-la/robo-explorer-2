class Level1 extends Phaser.Scene {
  cursors;
  constructor() {
    //   super({ key: "Level1", active: true });
    super("Level1");
  }

  preload() {
    this.load.image("Bg", "assets/Artwork/Environment/Levels/Bg.png");
    this.load.image("player", "assets/Artwork/Player/player.png", {
      frameWidth: 171,
      frameHeight: 144,
    });
  }
  onCollision(){
    console.log("Bump");
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
    this.cursors = this.input.keyboard.createCursorKeys();

    Level1.player = this.physics.add.sprite(
      PlayerPositionX,
      PlayerPositionY,
      "player"
    );

    Level1.obstacle = this.physics.add.sprite(
      PlayerPositionX + 250,
      PlayerPositionY ,
      "obstacle"
    );
    
    this.physics.add.collider(Level1.player, Level1.obstacle,this.onCollision);

    Level1.player.setBounce(0.2);
    Level1.player.setCollideWorldBounds(true);
    Level1.obstacle.setCollideWorldBounds(true);
    this.input.manager.enabled = true;

    this.input.once(
      "pointerdown",
      function () {
        this.scene.start("Level2");
      },
      this
    );
  }

  update() {
    // const cam = this.cameras.main;
    // const speed = 3;
    // if(cursors.left.isDown){
    //     // move left
    //     cam.scrollX -= speed
      // }
    Level1.player.setVelocity(0);

        if (this.cursors.left.isDown)
        {
          Level1.player.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown)
        {
          Level1.player.setVelocityX(300);
        }

        if (this.cursors.up.isDown)
        {
          Level1.player.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown)
        {
          Level1.player.setVelocityY(300);
        }
  
  }
}

class Level2 extends Phaser.Scene {
  constructor() {
    // super({ key: "Level2", active: false });
    super("Level2");
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

    this.input.manager.enabled = true;

    this.input.once(
      "pointerdown",
      function () {
        this.scene.start("Level1");
      },
      this
    );
  }

  update() {}
}

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
