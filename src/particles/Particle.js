class Particle {

  constructor(obj = Particle.default) {
    obj = Object.assign(Particle.default, obj);
    for (let attr in obj) {
      this[attr] = obj[attr];
    }
    this.elapsed_time = 0;
  }

  update() {
    this.elapsed_time += 1;
    if (!this.loop && this.elapsed_time >= this.life_time) {
      this.alive = false;
    }
  }

  spawn() {
    this.visible = true;
    this.alive = true;
  }

  die() {
    throw Error('Not implemented.')
  }

}

Particle.default = {
  'x': 0, // Level position
  'y': 0,
  'life_time': 0, // Life time, in frames
  'loop': false,
  'alive': false,
  'visible': false
}
