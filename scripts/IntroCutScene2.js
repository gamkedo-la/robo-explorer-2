import audioManager from "./AudioManager.js";
import BaseScene from "./BaseScene.js";

export default class IntroCutScene extends BaseScene {
  constructor() {
    super("IntroCutScene2", "TestArea");
  }

  create() {
    this.cutscene2();
    super.create();
  }
   
}
