class Position {

  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;
    this.gridx = 0;
    this.gridy = 0;
    this.offx = 0;
    this.offy = 0;
    this.set(x, y);
  }

  get x() {
    return this.w * this.gridx + this.offx;
  }

  set x(x) {
    this.gridx = (~~(x/this.w));
    this.offx = x % this.w;
  }

  get y() {
    return this.h * this.gridy + this.offy;
  }

  set y(y) {
    this.gridy = (~~(y/this.h));
    this.offy = y % this.h;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

}
