class Drawable {

  constructor(obj = Drawable.default) {
    obj = Object.assign(Drawable.default, obj);
    this.position = new Position(obj.x, obj.y, T_SIDE, T_SIDE);
    this.sprite = obj.sprite;
  }

  get x() {
    return this.position.x;
  }

  set x(x) {
    this.position.x = x;
  }

  get y() {
    return this.position.y;
  }

  set y(y) {
    this.position.y = y;
  }

  get width() {
    return this.sprite.width;
  }

  get height() {
    return this.sprite.height;
  }

  get rmargin() {
    return this.sprite.rmargin;
  }

  get lmargin() {
    return this.sprite.lmargin;
  }

  draw(x, y) {
    if (this.sprite === null) return;
    this.sprite.update();
    this.sprite.draw(x, y);
  }
  
}

Drawable.default = {
  'x': 0,
  'y': 0,
  'sprite': null
}
