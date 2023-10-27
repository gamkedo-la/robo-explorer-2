
class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: "Level1", active: true });
  }

  preload() {
    this.load.image("player", "assets/Player/player.png", {
      frameWidth: 171,
      frameHeight: 144,
    });
  }

  create() {
    const PlayerPositionY = 10;
    const PlayerPositionX = 50;
    
    Level1.player = this.physics.add.sprite(
      PlayerPositionX,
      PlayerPositionY,
      "player"
    );

    Level1.player.setBounce(0.2);
    Level1.player.setCollideWorldBounds(true);
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
  scene: [Level1],
};

var game = new Phaser.Game(config);
