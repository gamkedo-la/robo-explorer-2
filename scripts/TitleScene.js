import { SCENE_KEYS } from "./Constants.js";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.TITLE });
  }

  create() {
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "ROBO EXPLORER",
        {
          fontSize: "32px",
          fill: "#FFF",
          textAlign: "center",
        }
      )
      .setOrigin(0.5, 0.5);
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 32,
        "PRESS ENTER",
        {
          fontSize: "16px",
          fill: "#FFF",
          textAlign: "center",
        }
      )
      .setOrigin(0.5, 0.5);

    this.keyEnter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
  }

  update() {
    if (this.keyEnter.isDown) {
      this.scene.start(SCENE_KEYS.LEVEL_1);
    }
  }
}
