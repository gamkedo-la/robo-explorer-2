const audioManager = {
  sounds: {},
  init(scene) {
    this.scene = scene;
    this.sounds.jump = scene.sound.add("jump");
    this.sounds.missile = scene.sound.add("missile");
    this.sounds.track1 = scene.sound.add("track1");
    this.sounds.track2 = scene.sound.add("track2");
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
