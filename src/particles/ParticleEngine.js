class ParticleEngine {

  constructor() {
    this.particles = [];
  }

  addParticle(p) {
    this.particles.push(p);
    p.spawn();
    return p.graphics;
  }

  update() {
    for (let p of this.particles) {
      p.update();
    }
  }
  
}
