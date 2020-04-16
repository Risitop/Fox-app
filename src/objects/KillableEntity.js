class KillableEntity extends Entity {

  constructor(obj = KillableEntity.default) {
    obj = Object.assign(KillableEntity.default, obj);
    super({
      'x': obj.x,
      'y': obj.y,
      'sprite': obj.sprite,
      'hitbox': obj.hitbox
    });
    this.hp = obj.hp;
    this.max_hp = obj.hp;
  }
  
}

KillableEntity.default = {
  'x': 0,
  'y': 0,
  'hp': 100,
  'sprite': null,
  'hitbox': null
}
