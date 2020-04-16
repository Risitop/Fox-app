class Decoration extends Drawable {

  constructor(obj = Decoration.default) {
    const decoration = obj.decoration;
    super({
      'sprite': obj.sprite,
      'x': decoration.x,
      'y': decoration.y
    });
    for (let key in decoration) {
      this[key] = decoration[key];
    }
  }

}

Decoration.default = {
  'sprite': null,
  'decoration': null
}
