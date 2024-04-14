import { SCENE_KEYS } from "../Constants.js";
import fx from "../Fx.js";
import BossSelectText from "./BossSelectText.js";
import BossFrame from "./BossFrame.js";

export default class BossSelectScene extends Phaser.Scene {
  bossSelectText;
  tileBG;

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

    this.load.image("bossFrame", "assets/Artwork/UI/boss-frame.png");

    this.load.image(
      "bossFrameHighlighted",
      "assets/Artwork/UI/boss-frame-highlighted.png"
    );

    this.load.image("bossSelectBG", "assets/Artwork/UI/boss-selection-bg.png");

    this.load.image("level1Sprite", "assets/Artwork/UI/level-1.png");

    this.load.image("level2Sprite", "assets/Artwork/UI/level-2.png");

    this.load.image(
      "boss1Sprite",
      "assets/Artwork/UI/boss1-frame/boss-frame.png"
    );
    this.load.image(
      "tutorial",
      "assets/Artwork/UI/boss1-frame/boss-frame.png"
    );
  }

  create() {
    this.tileBG = this.add.tileSprite(400, 300, 800, 600, "bossSelectBG");

    //  UI Animations
    this.anims.create({
      key: "bossText",
      frames: this.anims.generateFrameNumbers("bossTextSheet", {
        start: 0,
        end: 54,
      }),
    });

    // Animated Header Text
    this.bossSelectText = new BossSelectText(this, 375, 75, "bossTextSheet");
    this.bossSelectText.setScale(2);

    // Levels
    var frameScale = 2;
    var frameWidth = 96 * frameScale;
    var frameStartX = 190;
    var frameStartY = 275;
    var frameMargin = 10;
    var bossCount = 3;
    const frames = [];
    const levels = [
      {
        scene: SCENE_KEYS.LEVEL_1,
        image: "level1Sprite",
      },
      {
        scene: SCENE_KEYS.LEVEL_2,
        image: "level2Sprite",
      },
      {
        scene: SCENE_KEYS.BOSS_AREA,
        image: "boss1Sprite",
      }
      
    ];

    for (var i = 0; i < bossCount; i++) {
      const current_index = i;
      let x = frameStartX + i * (frameWidth + frameMargin);
      let y = frameStartY;
      const frame = new BossFrame(
        this,
        x,
        y,
        "bossFrame",
        levels[current_index].image
      ).setInteractive();

      frame.setScale(frameScale);

      frame.input.alwaysEnabled = true;

      frame.on("pointerover", (e) => {
        frame.setTexture("bossFrameHighlighted");
      });

      frame.on("pointerout", (e) => {
        frame.setTexture("bossFrame");
      });

      frame.on("pointerdown", (e) => {
        this.scene.start(levels[current_index].scene);
      });

      frames.push(frame);
    }

    // Inputs
    this.keyEnter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
  }

  update() {
    this.tileBG.tilePositionX += 1;
    this.bossSelectText.anims.play("bossText", 60, true);

    if (this.keyEnter.isDown) {
      fx.forceReset();
      this.scene.start(SCENE_KEYS.LEVEL_1);
    }
  }
}
