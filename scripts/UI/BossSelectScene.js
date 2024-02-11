import { SCENE_KEYS } from "../Constants.js";
import fx from "../Fx.js";
import BossSelectText from "./BossSelectText.js";

export default class BossSelectScene extends Phaser.Scene {
  boss_select_text;
  constructor() {
    super({
      key: SCENE_KEYS.BOSS_SELECT,
      cameras: {
        name: "",
        x: 0,
        y: 0,
        zoom: 1,
        rotation: 0,
        scrollX: 0,
        scrollY: 0,
        roundPixels: false,
        visible: true,
        backgroundColor: "#404080",
        bounds: null, // {x, y, width, height}
      },
    });
  }

  preload() {
    this.load.spritesheet(
      "bossTextSheet",
      "assets/Artwork/UI/boss-selection-text-Sheet.png",
      {
        frameWidth: 89,
        frameHeight: 50,
      }
    );
  }

  create() {
    //  UI ANIMATIONS
    this.anims.create({
      key: "bossText",
      frames: this.anims.generateFrameNumbers("bossTextSheet", {
        start: 0,
        end: 54,
      }),
    });

    this.boss_select_text = new BossSelectText(this, 375, 50, "bossTextSheet");

    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "BOSS SELECT",
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
    this.boss_select_text.anims.play("bossText", 60, true);
    if (this.keyEnter.isDown) {
      fx.forceReset();
      this.scene.start(SCENE_KEYS.LEVEL_1);
    }
  }
}
