class Hero extends Character {

  constructor(obj = Hero.default) {
    obj = Object.assign(Hero.default, obj);
    const h_obj = obj.h_obj;
    const hb = new RectangleHitbox(
      h_obj.initial_position.x,
      h_obj.initial_position.y,
      h_obj.sprite.width_hb, h_obj.sprite.height_hb,
      h_obj.sprite.lmargin, h_obj.sprite.tmargin
    );
    super({
      'x': h_obj.initial_position.x,
      'y': h_obj.initial_position.y,
      'hp': h_obj.max_hp,
      'sprite': obj.spritebank,
      'hitbox': hb
    });
    this.direction_left = 0;
    this.direction_right = 0;
    this.has_jumped = false;
    this.jump_preparing = false;
    this.jump_pressed = false;
    this.sprite.tint = 0xFFFFFF;
  }

  get direction() {
    return this.direction_right - this.direction_left;
  }

  setOnGround(bool) {
    if (bool && this.jumping) {
      this.stun = true;
      this.jumping = false;
      this.has_jumped = false;
      this.sprite.loadSprite(HERO_BANK.jump_end);
      const that = this;
      setTimeout(function() { that.stun = false; }, JUMP_STUN);
    }
    super.setOnGround(bool);
  }

  get hitting() {
    return false;
    return this.sprite.row == CLAW_HIT && this.sprite.col <= 5;
  }

  get idle() {
    return (!this.jump_preparing && !this.stun && !this.hitting && this.direction === 0);
  }

  moveLeft(b) {
    this.direction_left = b;
  }

  moveRight(b) {
    this.direction_right = b;
  }

  update() {
    this.updateEvents();
    super.update();
  }

  updateSprite() {
    if (this.dy < 0) {
      this.sprite.loadSprite(HERO_BANK.jump_up);
      return;
    }
    if (this.dy > 0) {
      this.sprite.loadSprite(HERO_BANK.jump_down);
      return;
    }
    if (this.idle) {
      this.sprite.loadSprite(HERO_BANK.idle);
      return;
    }
    if (this.direction > 0) {
      this.sprite.loadSprite(HERO_BANK.running);
      this.sprite.flip(1);
      return;
    }
    else if (this.direction < 0) {
      this.sprite.loadSprite(HERO_BANK.running);
      this.sprite.flip(-1);
      return;
    }
  }

  get ddx() {
    if (this.on_ground) {
      return DDX;
    }
    return DDX_ONAIR;
  }

  get can_jump() {
    return this.on_ground;
  }

  updateEvents() {
    this.setDdy(DDY);
    switch (this.direction) {
      case -1:
        this.dx -= this.ddx;
        this.dx = max(DX_MIN, this.dx);
        this.sprite.flip(-1);
        break;
      case 1:
        this.dx += this.ddx;
        this.dx = min(DX_MAX, this.dx);
        this.sprite.flip(1);
        break;
      case 0:
        if (this.dx > 0) {
          this.dx = (this.dx - this.ddx)*(1 - this.on_ground);
          this.dx = max(0, this.dx);
        }
        if (this.dx < 0) {
          this.dx = (this.dx + this.ddx)*(1 - this.on_ground);
          this.dx = min(0, this.dx);
        }
        break;
      default:
        break;
    }
    if (this.jump_pressed && this.dy < 0) {
      this.setDdy(DDY_LIGHT);
      return;
    }
    //this.updateSprite();
  }

  _jump() {
    if (this.jump_preparing) {
      this.jump_preparing = false;
    }
    super.jump(JUMP_DY);
    this.jumping = true;
    this.stayInAir(true);
  }

  jump() {
    if (!this.can_jump) return;
    this.sprite.loadSprite(HERO_BANK.jump_preparing);
    this.jump_preparing = true;
    this.has_jumped = true;
    const that = this;
    setTimeout(
      function() { that._jump(); }, JUMP_DELAY
    );
  }

  hit() {
    if (this.hitting) return;
    this.sprite.stopCycle();
    this.sprite.cycle(CLAW_HIT, SPRITE_FSTEP);
  }

  setDdy(ddy) {
    this.ddy = ddy;
  }

  stayInAir(b = true) {
    this.jump_pressed = b;
  }

}

Hero.default = {
  'h_obj': HERO,
  'spritebank': null
}
