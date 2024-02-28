const audioManager = {
  sounds: {},
  init(scene) {
    
    this.scene = scene;

    // SOUND EFFECTS
    this.sounds.jump = scene.sound.add("jump");
    this.sounds.missile = scene.sound.add("missile");
    
    // MUSIC TRACKS
    this.sounds.track1 = scene.sound.add("track1");
    this.sounds.track2 = scene.sound.add("track2");
    this.sounds.track3 = scene.sound.add("track3");
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
  switchToMusicTrack(key) {
    if (this.currentMusicTrack) {
      this.currentMusicTrack.setVolume(0);
      this.currentMusicTrack.stop();
    }
    this.playSound(key);
    this.currentMusicTrack = this.sounds[key];
  },
};

export default audioManager;
