export default class BossFrame extends Phaser.Physics.Arcade.Sprite {
  sceneRef;

  constructor(scene, x, y, texture, overlaySprite) {
    super(scene, x, y, texture);
    this.sceneRef = scene;
    this.sceneRef.add.existing(this);
    this.sceneRef.add.image(x, y, overlaySprite);
  }
}
