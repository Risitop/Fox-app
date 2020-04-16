class RectangleHitbox extends Hitbox {

  constructor(x, y, width, height, lmargin = 0, tmargin = 0) {
    super();
    this.position = new Position(x + lmargin, y + tmargin, T_SIDE, T_SIDE);
    this.w = width; // w, h in the LEVEL
    this.h = height;
    this.tmargin = tmargin; // tmargin, lmargin in the LEVEL
    this.lmargin = lmargin;

    this.prevx = this.x;
    this.prevy = this.y;

    this.sprite = new PIXI.Graphics();
    this.sprite.lineStyle(0, 0, 0);
    this.sprite.beginFill(0xFF0000, 0.5);
    this.sprite.drawRect(lmargin, tmargin, this.w, this.h);
    this.sprite.endFill();
    this.sprite.visible = false;
    this.shown = false;
  }

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }

  set x(val) {
    this.prevx = this.position.x;
    this.position.x = val;
  }

  set y(val) {
    this.prevy = this.position.y;
    this.position.y = val;
  }

  get width() {
    return this.w;
  }

  get height() {
    return this.h;
  }

  collides(hitbox) {
    if (hitbox instanceof RectangleHitbox) {
      return this.rec_collide(
        hitbox.x, hitbox.y, hitbox.w, hitbox.h
      );
    }
  }

  rec_collide(x, y, w, h) {
    return (
      this.x < x + w &&
      this.x + this.w > x &&
      this.y < y + h &&
      this.h + this.y > y
    );
  }

  draw(x, y) {
    this.sprite.position.set(x - this.lmargin, y - this.tmargin);
    this.sprite.visible = true;
  }

  show() {
    this.shown = true;
  }

  hide() {
    this.shown = false;
    this.sprite.visible = false;
  }

  updatePos(dx, dy) {
    this.prevx = this.x;
    this.prevy = this.y;
    this.x += dx;
    this.y += dy;
  }
  
}
