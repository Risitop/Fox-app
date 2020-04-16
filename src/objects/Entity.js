class Entity extends SolidObject {

  /**  An entity is a movable solid object.
   * constructor - description
   *
   * @param  {type} x      description
   * @param  {type} y      description
   * @param  {type} sprite description
   * @param  {type} hitbox description
   * @return {type}        description
   */
  constructor(obj = Entity) {
    obj = Object.assign(Entity.default, obj);
    super(obj);
    this.dx = 0;
    this.dy = 0;
    this.ddy = DDY;
    this.on_ground = false;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  setOnGround(bool) {
    this.on_ground = bool;
  }
}

Entity.default = {
  'x': 0,
  'y': 0,
  'sprite': null,
  'hitbox': null
}
