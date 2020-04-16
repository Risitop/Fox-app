class SolidObject extends Drawable {

  constructor(obj = SolidObject.default) {
    obj = Object.assign(SolidObject.default, obj);
    super({
      'x': obj.x,
      'y': obj.y,
      'sprite': obj.sprite
    });
    this.hitbox = obj.hitbox;
  }

  get x() {
    return this.hitbox.x - this.hitbox.lmargin;
  }

  get y() {
    return this.hitbox.y - this.hitbox.tmargin;
  }

  set x(val) {
    this.hitbox.x = val + this.hitbox.lmargin;
  }

  set y(val) {
    this.hitbox.y = val + this.hitbox.tmargin;
  }

  drawHitbox(x, y) {
    this.hitbox.draw(x, y);
  }

}

SolidObject.default = {
  'x': 0,
  'y': 0,
  'sprite': null,
  'hitbox': null
}
