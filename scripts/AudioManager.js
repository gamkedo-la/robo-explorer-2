const audioManager = {
  sounds: {},
  init(scene) {
    this.scene = scene;
    this.sounds.jump = scene.sound.add("jump");
  },
  playSound(key, volume = 1) {
    const sound = this.sounds[key];
    if (sound) {
      globalState.muted ? sound.setVolume(0) : sound.setVolume(volume);
      sound.play();
    }
  },
  stopSound(key) {
    const sound = this.sounds[key];
    if (sound) {
      sound.setVolume(0);
      sound.stop();
    }
  },
};

export default audioManager;
