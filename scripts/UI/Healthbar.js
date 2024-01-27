
export default class Healthbar extends Phaser.Physics.Arcade.Sprite {
  value = 0;
  maxValue = 0;
  frameImage = null;
  fillImage = null;
  healthUnits = [];

  constructor(scene, x, y, texture, fillImage, startValue = 0, maxValue = 0) {
    super(scene, x, y, texture);

    this.sceneRef = scene;
    this.sceneRef.add.existing(this);

    this.value = startValue;
    this.maxValue = maxValue;

    this.frameImage = texture;
    this.fillImage = fillImage;

    this.updateHealthFillImage();
 
  }

  setValue(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  


  updateHealthFillImage() {
    this.healthUnits.forEach((image) => image.destroy());
    let startY = this.y + 36;
    let unitSize = 4;

    for (var i = 0; i < this.value; i++) {
      this.healthUnits.push(
        this.sceneRef.add.image(this.x, startY - unitSize * i, this.fillImage)
      );
    }
  }
  
}
