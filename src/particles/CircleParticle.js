class CircleParticle extends Particle {

  constructor(obj = CircleParticle.default) {
    obj = Object.assign(CircleParticle.default, obj);
    super(obj);
    this.cur_radius = 0;
    this.cur_alpha = 0;
    this.graphics = new PIXI.Graphics();
  }

  update(x, y) {
    super.update();
    if (this.alive && this.cur_radius < this.radius) {
      this.elapsed_time = 0;
      this.cur_radius = Math.min(
        this.cur_radius + this.growth_rate, this.radius
      );
    } else if (!this.alive && this.cur_radius > 0) {
      this.cur_radius = Math.max(
        this.cur_radius - this.fade_rate, 0
      );
      if (this.cur_radius <= 0) {
        this.visible = false;
        this.graphics.visible = false;
      }
    }
    this.graphics.clear();
    this.graphics.beginFill(this.color);
    this.graphics.drawCircle(x, y, this.cur_radius);
    this.graphics.endFill();
  }

  spawn() {
    super.spawn();
    this.graphics.visible = true;
  }

  die() {
    this.alive = false;
  }

}

CircleParticle.default = {
  'x': 0, // Level position
  'y': 0,
  'life_time': 500, // Life time, in frames
  'loop': false,
  'alive': false,
  'visible': false,
  'color': 0x000000,
  'alpha': 1,
  'radius': .7,
  'growth_rate': .01,
  'fade_rate': .01
}
