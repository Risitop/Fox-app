class SpriteBank {

  constructor(image_manager, atlas, descriptor, filters) {
    this._sprites = {};
    for (let id in descriptor) {
      const anim_sprite = descriptor[id];
      this._sprites[id] = new AnimatedSprite({
        'texture': image_manager.getTexture(atlas, anim_sprite.url),
        'spwidth': anim_sprite.width,
        'spheight': anim_sprite.height,
        'n_sprites': anim_sprite.n_sprites,
        'delay': anim_sprite.delay,
        'applied_filters': filters
      });
    };
    this.active_id = null;
    this._visible = false;
    this.scale = 1;
    this._filters = [];
    this.applied_filters = filters;
  }

  get sprites() {
    let sprites_list = [];
    for (let id in this._sprites) {
      sprites_list = sprites_list.concat(this._sprites[id].sprites);
    }
    return sprites_list;
  }

  get sprite() {
    if (this.active_id === null) return null;
    return this._sprites[this.active_id].sprite;
  }

  get animated_sprite() {
    return this._sprites[this.active_id];
  }

  get width() {
    return this.sprite.width;
  }

  get height() {
    return this.sprite.height;
  }

  get n_sprites() {
    return this.sprite.n_sprites;
  }

  get active() {
    return this.sprite.active;
  }

  get delay() {
    return this.sprite.delay;
  }

  get counter() {
    return this.sprite.counter;
  }

  get visible() {
    return this._visible;
  }

  get hidden() {
    return !this._visible;
  }

  set tint(t) {
    for (let sprite in this._sprites) {
      this._sprites[sprite].tint = t;
    }
  }

  get filters() {
    return this._filters;
  }

  set filters(fs) {
    for (let s in this.sprites) {
      this.sprites[s].filters = fs;
    }
    this._filters = fs;
  }

  get position() {
    if (this.sprite !== null) {
      return this.sprite.position;
    }
    return {x: 0, y: 0};
  }

  get width() {
    if (this.sprite !== null) {
      return this.sprite.width;
    }
    return 0;
  }

  get height() {
    if (this.sprite !== null) {
      return this.sprite.height;
    }
    return 0;
  }

  flip(scale) {
    this.scale = scale;
  }

  update() {
    this.animated_sprite.update();
  }

  loadSprite(bank_elem) {
    if (this.active_id === bank_elem.id) return;
    if (this.animated_sprite !== undefined) {
      this.animated_sprite.hide();
    }
    this.active_id = bank_elem.id;
    this.animated_sprite.show();
  }

  draw(x, y) {
    this.animated_sprite.flip(this.scale);
    this.animated_sprite.draw(x, y);
  }

  hide() {
    this._visible = false;
    this.animated_sprite.hide();
  }

}
