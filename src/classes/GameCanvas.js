class GameCanvas {

  constructor() {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    this.app = new PIXI.Application({
      width: F_WIDTH,
      height: F_HEIGHT,
      antialias: false,
      transparent: false,
      resolution: 2
    });
    this.app.ticker.maxFPS = 60;
    document.body.appendChild(this.app.view);

    this.image_manager = new ImageManager();
    this.filter_engine = new FilterEngine();
    this.particle_engine = new ParticleEngine();

    // position of top left corner in the game_envt
    this.position = new Position(0, 0, T_SIDE, T_SIDE);
    this.middlex = 7;

    this._stroke = 0x000000;
    this._strokealpha = 1;
    this._fill = 0xFFFFFF;
    this._fillalpha = 1;
    this.sprites = {};
    this.backgrounds = {};
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
    return this.app.view.width;
  }

  get height() {
    return this.app.view.height;
  }

  stroke(color, alpha=1) {
    this._stroke = color;
    this._strokealpha = alpha;
  }

  fill(color, alpha=1) {
    this._fill = color;
    this._fillalpha = alpha;
  }

  rectangle(x, y, w, h) {
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(this._fill, this._fillalpha);
    rectangle.lineStyle(1, this._stroke, this._strokealpha);
    rectangle.drawRect(x, y, w, h);
    rectangle.endFill();
    this.app.stage.addChild(rectangle);
    return rectangle;
  }

  clear() {
    // this.fill(0xFFFFFF);
    // this.stroke(0, 0);
    // this.rectangle(0, 0, this.width, this.height);
    // this.app.stage.children = [];
  }

  updatePos(level_manager) {
    const hero = level_manager.hero;
    const maxx = level_manager.width - NCOLS;
    this.middlex = 5 + hero.x / T_SIDE / level_manager.width * 5;
    const dx = hero.gridx - this.middlex;
    this.gridx = hero.gridx - this.middlex;
    this.offx = hero.offx;
    if (this.x <= 0) {
      this.offx = 0;
      this.gridx = 0;
    }
    if (this.x > maxx*T_SIDE) {
      this.offx = 0;
      this.gridx = maxx;
    }

  }

  addHitbox(solid_object) {
    this.app.stage.addChild(solid_object.hitbox.sprite);
  }

  addBackground(background_obj) {
    const sprite = this.addAnimatedSprite(
      background_obj.atlas, background_obj.url, background_obj.sp_width,
      background_obj.sp_height, background_obj.n_sprites, background_obj.delay,
      background_obj.applied_filters
    );
    this.backgrounds[background_obj.layer] = sprite;
  }

  addAnimatedSprite(atlas, url, width, height, n_sprites, delay, filters) {
    const anim_sprite = new AnimatedSprite({
      'texture': this.image_manager.getTexture(atlas, url),
      'spwidth': width,
      'spheight': height,
      'n_sprites': n_sprites,
      'delay': delay,
      'applied_filters': filters
    });
    this.addSprite(anim_sprite.sprite);
    return anim_sprite;
  }

  addSpriteBank(atlas, bank, filters) {
    const sprite_bank = new SpriteBank(
     this.image_manager, atlas, bank, filters
   );
   this.addSprites(sprite_bank.sprites);
   return sprite_bank;
  }

  addSprites(sprites) {
    for (let sprite of sprites) {
      this.addSprite(sprite);
    }
  }

  addSprite(sprite) {
    this.app.stage.addChild(sprite);
  }

  addFilters(decorations, backgrounds, objects) {
    this.filter_engine.addFilters(decorations, backgrounds, objects);
  }

  loadFilters(filters_json) {
    this.filter_engine.loadFilters(filters_json);
  }

  createFilter(id, params = {}) {
    return this.filter_engine.createFilter(id, params);
  }

  drawBackgroundLayer(depth) {
    this.backgrounds[depth].draw(-this.x*depth, 0);
  }

  drawHUD() {
    image(this.image_manager.getTexture('hud'), 20, 20, 96*HUD_SCALE, 32*HUD_SCALE);
    image(this.image_manager.getTexture('torus'), 30 + 6*HUD_SCALE, 20 + 7*HUD_SCALE, 16*HUD_SCALE, 16*HUD_SCALE);
  }

  update(level_manager) {
    this.particle_engine.update();
    const hero = level_manager.hero,
      platforms = level_manager.platforms,
      entities = level_manager.entities,
      decorations = level_manager.decorations;
    this.clear();

    const im = this.image_manager;
    // Draw backgroundqq
    this.drawBackgroundLayer(0);
    // this.drawBackgroundLayer(im.getTexture('barrels'), 0.25);
    // this.drawBackgroundLayer(im.getTexture('blackboard'), 0.5);
    // this.drawBackgroundLayer(im.getTexture('wires'), 0.4);
    //this.drawBackgroundLayer(im.getTexture('scaffolds'), 1);
    //this.drawBackgroundLayer(im.getTexture('bars'), 0.5);

    this.updatePos(level_manager);

    for (let platform of platforms) {
      // draw each platform
      platform.draw(
        platform.x - this.x,
        platform.y - this.y
      );

      if (SHOW_HB || platform.hitbox.shown) {
        platform.drawHitbox(
          platform.hitbox.x - this.x,
          platform.hitbox.y - this.y
        );
      }
    }

    for (let entity of entities) {
      // draw each entity
      entity.updateSprite();  // to rename or something less misleading
      entity.draw(
        entity.x - this.x,
        entity.y - this.y
      );

      if (SHOW_HB || entity.hitbox.shown) {
        entity.drawHitbox(
          entity.hitbox.x - this.x,
          entity.hitbox.y - this.y
        );
      }
    }

    for (let decoration of decorations) {
      decoration.draw(
        decoration.x - this.x,
        decoration.y - this.y
      )
    }

    this.app.renderer.render(this.app.stage);

    //this.drawHUD();
  }

}
