class FlyParticle extends Particle {

  constructor(obj = FlyParticle.default) {
    obj = Object.assign(FlyParticle.default, obj);
    super(obj);
    this.graphics = new PIXI.Container();
    //this.graphics.position.set(this.x, this.y);

    this.flies = [];
    this.next_fly = 0;
  }

  checkFlyCreation() {
    if (this.flies.length === this.n_flies) return;
    if (this.next_fly > 0) {
      this.next_fly -= 1;
      return;
    }
    const fly = this.createFly();
    this.flies.push(fly);
    this.graphics.addChild(fly.particle.graphics);
    fly.particle.spawn();
    this.next_fly = Math.random() / this.spawn_rate_flies;
  }

  createFly() {
    const x_init = this.x + (Math.random() - 0.5)*this.scattering_flies;
    const y_init = this.y + (Math.random() - 0.5)*this.scattering_flies;
    return {
      'x': x_init,
      'y': y_init,
      'orbital_radius': this.radius_flies * (0.5 + Math.random()),
      'orbital_speed': this.speed_flies * (0.5 + Math.random()),
      'sense': (Math.random() < 0.5) ? -1 : 1,
      't': Math.random()*M_2PI,
      'cov': this.createCov(),
      'break': 0,
      'next_break': Math.random() / this.break_p,
      'particle': new CircleParticle({
        'x': x_init,
        'y': y_init,
        'loop': true,
        'radius': this.size_flies * (0.8 + Math.random()*0.4)
      })
    };
  }

  createCov() { // Creates a covariance matrix to orientate orbitals
    return [
      [1, 0.5 - Math.random()],
      [0.5 - Math.random(), 1]
    ]
  }

  update() {
    super.update();
    this.checkFlyCreation();
    this.flies.forEach(f => {
      if (f.break <= 0 && f.next_break <= 0) {
        f.break = Math.random()*this.break_mu*2;
        f.next_break = Math.random() / this.break_p;
        if (Math.random() < .5) {
          f.sense *= -1;
        }
      }
      if (f.break <= 0) {
        f.t = (f.t + f.orbital_speed*f.sense) % (2*Math.PI);
        f.next_break -= 1;
      } else {
        f.break -= 1;
      }
      const dx = Math.cos(f.t) * f.orbital_radius;
      const dy = Math.sin(f.t) * f.orbital_radius / this.shrinking;
      const cdx = dx*f.cov[0][0] + dy*f.cov[0][1];
      const cdy = dx*f.cov[1][0] + dy*f.cov[1][1];
      f.particle.update(f.x + cdx, f.y + cdy);
    });
  }

  spawn() {
    super.spawn();
    this.graphics.visible = true;
  }

  die() {
    this.flies.forEach(f => f.particle.die());
  }

}

FlyParticle.default = {
  'x': 0, // Level position
  'y': 0,
  'life_time': 0, // Life time, in frames
  'loop': false,
  'alive': false,
  'visible': false,
  'n_flies': 7,
  'size_flies': 0.6,
  'speed_flies': 0.15,
  'radius_flies': 15,
  'scattering_flies': 3,
  'shrinking': 2,
  'break_p': 0.0005,
  'break_mu': 180,
  'spawn_rate_flies': 0.005
}
