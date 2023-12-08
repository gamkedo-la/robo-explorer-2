import audioManager from "./AudioManager.js";
import BaseScene from "./BaseScene.js";

export default class IntroCutScene extends BaseScene {
  constructor() {
    super("IntroCutScene", "TestArea");
  }

  create() {
    this.cutscene1();
    super.create();
  }
   
}
