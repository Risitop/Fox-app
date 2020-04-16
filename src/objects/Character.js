class Character extends KillableEntity {

  constructor(obj = Character.default) {
    obj = Object.assign(Character.default, obj);
    super(obj);
    this.jumping = false;
  }

  addDy(ddy) {
    this.dy += ddy;
  }

  jump(dy) {
    if (this.on_ground) {
      this.addDy(dy);
      this.setOnGround(false);
      this.jumping = true;
    }
  }
  
}

Character.default = {
  'x': 0,
  'y': 0,
  'hp': 100,
  'sprite': null,
  'hitbox': null
}
