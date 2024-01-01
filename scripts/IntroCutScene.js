import audioManager from "./AudioManager.js";
import BaseScene from "./BaseScene.js";

export default class IntroCutScene extends BaseScene {
  constructor() {
    super("IntroCutScene", "IntroCutScene2");
  }

  create() {
    this.cutscene1();
    super.create();
  }
   
}
