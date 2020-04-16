class PhysicalEngine {

  constructor() {

  }

  solveCollisions(entity, platforms) {
    for (let platform of platforms) {
      this.solveCollision(entity, platform);
    }
  }

  solveCollision(entity, platform, debug=false) {
    const ehb = entity.hitbox;
    const phb = platform.hitbox;
    if (!entity.hitbox.collides(platform.hitbox)) {
      platform.hitbox.hide();
      return;
    }
    // Collision detected!
    if (debug)
      platform.hitbox.show();

    if (ehb.prevy + ehb.h <= phb.y) { // We were above the platform
      ehb.y = phb.y - ehb.h;
    }
    if (Math.abs(ehb.y + ehb.h - phb.y) <= 1) { // We are on top of the platform
      entity.setOnGround(true);
      return;
    }

    if (ehb.prevy >= phb.y + phb.h) {
      ehb.y = phb.y + phb.h;
      entity.dy = -entity.dy;
    }

    if (ehb.prevx + ehb.w <= phb.x) {
      ehb.x = phb.x - ehb.w - 1;
    }

    if (ehb.prevx >= phb.x + phb.w) {
      ehb.x = phb.x + phb.w + 1;
    }

    // if (ehb.prevy + ehb.height >= phb.y + phb.h + ehb.h) { // we were under the platform
    //   entity.movey(phb.y + phb.h +ehb.h + entity.hitbox.h);
    //   entity.dy = -entity.dy;
    // }
    // if (entity.prevx + entity.hitbox.lmargin + entity.hitbox.w <= platform.x) {
    //   // We were at left
    //   entity.movex(platform.x - entity.hitbox.lmargin - entity.hitbox.w);
    // }
    // if (entity.prevx + entity.hitbox.lmargin >= platform.x +
    //     platform.hitbox.lmargin + platform.hitbox.w) { // At right now
    //   entity.movex(platform.x + platform.hitbox.lmargin + platform.hitbox.w - entity.hitbox.lmargin);
    // }
  }

  update(entities, platforms, debug=false) {
    for (let entity of entities) {
      if (debug)
        entity.hitbox.show();
      entity.setOnGround(false);
      entity.dy = min(entity.dy + entity.ddy, DY_MAX);
      entity.update();
      this.solveCollisions(entity, platforms, debug)
      if (entity.on_ground) {
        entity.dy = 0;
      }
    }
  }
  
}
