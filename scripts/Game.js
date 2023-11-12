import audioManager from "./AudioManager.js";
// import platform from "./Platform.js"
import TestArea from "./TestArea.js";
import Level1 from "./Level1.js";
import Level2 from "./Level2.js";
import PauseScene from "./PauseScene.js";

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
  scene: [TestArea, Level1, Level2, PauseScene],
};

var game = new Phaser.Game(config);
