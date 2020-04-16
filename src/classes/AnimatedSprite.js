class AnimatedSprite {
  constructor(obj = AnimatedSprite) {
    obj = Object.assign(AnimatedSprite.default, obj);
    for (let key in obj) {
      this[key] = obj[key];
    }
    this.textures = [];
    this.active = 0;
    this.counter = this.delay;
    this.visible = false;
    this.scale = 1;
    this.parseSprites(this.texture);

    this.sprite = this._createSprite();
  }

  _createSprite() {
    const sprite = new PIXI.Sprite(this.textures[this.active]);
    sprite.position.set(0, 0);
    sprite.anchor.x = .5;
    sprite.anchor.y = .5;
    sprite.visible = false;
    sprite.filters = [];
    return sprite;
  }

  get sprites() {
    return [this.sprite];
  }

  get hidden() {
    return !this.visible;
  }

  set tint(t) {
    this.sprite.tint = t;
  }

  get filters() {
    return this.sprite.filters;
  }

  set filters(fs) {
    this.sprite.filters = fs;
  }

  get x() {
    return this.sprite.position.x - this.sprite.width / 2;
  }

  get y() {
    return this.sprite.position.y - this.sprite.height / 2;
  }

  get width() {
    return this.sprite.width;
  }

  get height() {
    return this.sprite.height;
  }

  reset() {
    this.active = 0;
    this.counter = this.delay;
  }

  parseSprites(texture_) {
    for (let i=0; i < this.n_sprites; ++i) {
      const texture = texture_.clone();
      texture.frame = new PIXI.Rectangle(
        texture_.frame.x + i*this.spwidth, texture_.frame.y,
        this.spwidth, this.spheight
      );
      this.textures.push(texture);
    }
  }

  update() {
    if (this.hidden) return;
    this.counter -= 1;
    if (this.counter <= 0) {
      this.counter = this.delay;
      this.active += 1;
      if (this.active >= this.n_sprites) {
        this.active = 0;
      }
      this.sprite.texture = this.textures[this.active];
    }
  }

  flip(scale) {
    if (scale === this.scale) return;
    this.sprite.scale.x *= -1;
    this.scale = scale;
  }

  draw(x, y) {
    this.visible = true;
    this.sprite.visible = true;
    this.sprite.position.set(x + this.spwidth/2, y + this.spheight/2);
    for (let f of this.filters) {
      if (f.need_sprite) {
        f.updateSprite();
      }
    }
  }

  show() {
    this.visible = true;
    this.sprite.visible = true;
  }

  hide() {
    this.visible = false;
    for (let sprite of this.sprites) {
      this.sprite.visible = false;
    }
    this.reset();
  }
}

AnimatedSprite.default = {
  'texture': null,
  'spwidth': 64,
  'spheight': 64,
  'n_sprites': 1,
  'delay': 1,
  'applied_filters': []
}
