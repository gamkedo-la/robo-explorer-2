import audioManager from "./AudioManager.js";
// import platform from "./Platform.js"
import TestArea from "./TestArea.js"
import Level1 from "./Level1.js"




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
