import { SCENE_KEYS } from "./Constants.js";
import fx from "./Fx.js";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.GAME_OVER });
  }

  create() {
    this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY, "GAME OVER", {
        fontSize: "32px",
        fill: "#FFF",
        textAlign: "center",
      })
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
      fx.forceReset();
      this.scene.start(SCENE_KEYS.LEVEL_1);
    }
  }
}
