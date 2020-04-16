class Platform extends SolidObject {

  constructor(obj = Platform.default) {
    obj = Object.assign(Platform.default, obj);
    const tile = obj.tile;
    const hb = new RectangleHitbox(
      obj.x, obj.y,
      tile.hb_width, tile.hb_height,
      tile.left_margin, tile.top_margin
    );
    super({
      'x': obj.x,
      'y': obj.y,
      'hitbox': hb,
      'sprite': obj.sprite
    });
  }

}

Platform.default = {
  'x': 0,
  'y': 0,
  'sprite': null,
  'tile': null
}
