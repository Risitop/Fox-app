class LevelManager {

  constructor() {
    this.platforms = [];
    this.entities = [];
    this.decorations = [];
    this.level = null;
    this.hero = null;
  }

  get width() {
    return this.level.width;
  }

  get height() {
    return this.level.height;
  }

  addEntity(e) {
    this.entities.push(e);
    //this.game_canvas.addHitbox(e);
  }

  addPlayer(hero) {
    this.addEntity(hero);
    this.hero = hero;
  }

  addPlatform(p) {
    this.platforms.push(p);
    //this.game_canvas.addHitbox(p);
  }

  addDecoration(d) {
    this.decorations.push(d);
  }

  parseLevel(level_json) {
    this.level = level_json;
  }

  update() {
    this.entities.forEach(e => e.update());
  }
  
}
