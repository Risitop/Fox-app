class LightSource {

  constructor(obj = LightSource.default) {
    for (let key in obj) {
      this[key] = obj[key];
    }
    this.position = new Position(this.sx, this.sy);
    this.vangle_ = Math.atan2(this.vy, this.vx);
    const vn = this.normalize(this.vx, this.vy);
    this.vx = vn.x;
    this.vy = vn.y;
  }

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }

  set x(x) {
    this.position.x = x;
  }

  set y(y) {
    this.position.y = y;
  }

  normalize(x, y) {
    if (x === 0 && y === 0) {
      console.warn("Normalizing a null vector.");
      return {x: 0, y: 0};
    }
    const norm = Math.sqrt(x*x + y*y);
    return {x: x/norm, y: y/norm};
  }

  enlights(x, y) {
    if (!this.inCone(x, y)) return false;
    if (this.cd <= 0) return true;
    const wx = x - this.sx;
    const wy = y - this.sy;
    return (this.vx * wx + this.vy * wy) >= this.cd;
  }

  inCone(x, y) { // is (x, y) in the cone?
    if (this.angle === M_2PI) return true;
    let angle = Math.atan2(y - this.sy, x - this.sx) - this.vangle_;
    if (angle > M_PI) { angle -= M_2PI; }
    if (angle < -M_PI) { angle += M_2PI; }
    return 2 * Math.abs(angle) <= this.angle;
  }

}

LightSource.default = {
  'sx': 0,
  'sy': 0,
  'intensity': 1,
  'angle': M_2PI,
  'vx': 0,
  'vy': 1,
  'cd': 0 // Cut distance of the cone
}
