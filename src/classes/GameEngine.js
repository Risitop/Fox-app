class GameEngine {
  /**
  * The GameEngine class is the central module. It articulates together
  * rendering, level managment, physical engine and event listener.
  */
  constructor() {
    /** @const GameCanvas */
    this.game_canvas = new GameCanvas();

    /** @const PhysicalEngine */
    this.physical_engine = new PhysicalEngine();

    /** @const EventListener */
    this.event_listener = new EventListener();

    /** @const LevelManager */
    this.level_manager = new LevelManager();
  }

  get backgrounds() {
    const d = [];
    for (let depth in this.game_canvas.backgrounds) {
      d.push(this.game_canvas.backgrounds[depth]);
    }
    return d;
  }

  get objects() {
    return this.level_manager.platforms
      .concat(this.level_manager.entities)
      .concat(this.level_manager.decorations);
  }

  get drawables() {
    return this.objects.concat(this.backgrounds);
  }

  get decorations() {
    return this.level_manager.decorations;
  }

  loadJSON(url, parse_callback, then_callback) {
    fetch(url)
      .then((response) => response.json())
      .then((level_json) => parse_callback(level_json))
      .then(() => then_callback());
  }

  loadLevel(level_url) {
    const that = this;
    this.loadJSON(
      level_url,
      (level_json) => that.level_manager.parseLevel(level_json),
      () => that.loadFilters()
    );
  }

  loadFilters(filters_url) {
    const that = this;
    this.loadJSON(
      FILTERS_URL,
      (filters_json) => that.parseFilters(filters_json),
      () => that.loadAtlases()
    );
  }

  parseFilters(filters_json) {
    this.game_canvas.loadFilters(filters_json);
  }

  loadAtlases() {
    this.game_canvas.image_manager.addAtlas(this.level_manager.level.atlases);
    const that = this;
    this.game_canvas.image_manager.loadAtlases(() => that.buildLevel());
  }

  buildLevel() {
    const im = this.game_canvas.image_manager;

    console.log("Adding backgrounds...")

    // Building parallax
    const level = this.level_manager.level;
    for (let url in level.backgrounds) {
      const background = level.backgrounds[url];
      this.game_canvas.addBackground(background);
    }

    console.log("Loading level tiles...")

    // Loading level tiles
    for (let i = 0; i < level.height; ++i) {
      for (let j = 0; j < level.width; ++j) {
        const tile = level.tiles[level.level[i][j]];
        if (tile === null) continue;
        let platform_sprite;
        if (tile.atlas === null) {
          platform_sprite = null;
        } else {
          platform_sprite = this.game_canvas.addAnimatedSprite(
            tile.atlas, tile.url,
            tile.sp_width, tile.sp_height, tile.n_sprites, tile.delay,
            tile.applied_filters
          );
        }
        const platform = new Platform({
          x: j*T_SIDE,
          y: i*T_SIDE,
          sprite: platform_sprite,
          tile: tile
        });
        this.level_manager.addPlatform(platform);
        this.game_canvas.addHitbox(platform);
      }
    }

    console.log("Loading decorations...");

    for (let id in level.decorations) {
      const decoration = level.decorations[id];
      const sprite = this.game_canvas.addAnimatedSprite(
        decoration.atlas, decoration.url,
        decoration.sp_width, decoration.sp_height,
        decoration.n_sprites, decoration.delay, decoration.applied_filters
      );
      const decoration_obj = new Decoration({
        sprite: sprite,
        decoration: decoration
      });
      this.level_manager.addDecoration(decoration_obj);
    }

    console.log("Initializing hero...")

    const hero_spritebank = this.game_canvas.addSpriteBank(
      HERO.sprite.atlas,
      HERO.sprite.bank,
      HERO.sprite.applied_filters
    );
    const hero = new Hero({
      h_obj: HERO,
      spritebank: hero_spritebank
    });
    this.level_manager.addPlayer(hero);
    this.game_canvas.addHitbox(hero);
    this.listenEvents();

    console.log("Initialization terminated.");

    this.game_canvas.addFilters(this.decorations, this.backgrounds, this.objects);

    const that = this;
    this.game_canvas.app.ticker.add(delta => that.gameLoop(delta))
    this.game_canvas.app.stage.addChild(
      this.game_canvas.particle_engine.addParticle(
        new FlyParticle({
          x: 478,
          y: 280,
          loop: true
        })
      )
    );
  }

  gameLoop(delta) {
    this.physical_engine.update(this.level_manager.entities, this.level_manager.platforms);
    this.game_canvas.update(this.level_manager);
  }

  listenEvents() {
    const that = this;
    this.event_listener.bindPress(
      KEYS.left, () => { that.level_manager.hero.moveLeft(true); }
    );
    this.event_listener.bindRelease(
      KEYS.left, () => { that.level_manager.hero.moveLeft(false); }
    );
    this.event_listener.bindPress(
      KEYS.right, () => { that.level_manager.hero.moveRight(true); }
    );
    this.event_listener.bindRelease(
      KEYS.right, () => { that.level_manager.hero.moveRight(false); }
    );
    this.event_listener.bindPress(
      KEYS.jump, () => { that.level_manager.hero.jump(); }
    );
    this.event_listener.bindRelease(
      KEYS.jump, () => { that.level_manager.hero.stayInAir(false); }
    );
  }
}
