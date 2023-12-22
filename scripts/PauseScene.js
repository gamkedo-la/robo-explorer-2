import BaseScene from "./BaseScene.js";

export default class PauseScene extends BaseScene {
  constructor() {
    super("pauseScene");
  }

  create() {
	this.add.rectangle(400, 300, 800, 600, 0xEEEEEE);
    this.add.text(200, 200, "PAUSED", {
      fontSize: "32px",
      fill: "#000",
    });
  }

  update() {
    let keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); // Pause game
    if (keyP.isDown) {
      this.scene.resume(globalState.currentScene);
      this.scene.stop();
    }
  }
}
