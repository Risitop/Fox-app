class EventListener {

  constructor() {
    this.keys = {};
    for (let key in KEYS) {
      this.keys[KEYS[key]] = keyboard(KEYS[key]);
    }
  }

  bindPress(key, callback) {
    this.keys[key].press = callback;
  }

  bindRelease(key, callback) {
    this.keys[key].release = callback;
  }
  
}
