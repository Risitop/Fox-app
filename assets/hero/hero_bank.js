const HERO_BANK = {
  "idle": {
    "id": "idle",
    "url": "idle.png",
    "width": 64,
    "height": 64,
    "n_sprites": 8,
    "delay": 15
  },
  "claw_hit": {
    "id": "claw_hit",
    "url": "claw_hit.png",
    "width": 64,
    "height": 64,
    "n_sprites": 5,
    "delay": 10
  },
  "jump_preparing": {
    "id": "jump_preparing",
    "url": "jump-preparing.png",
    "width": 64,
    "height": 64,
    "n_sprites": 1,
    "delay": 1
  },
  "jump_up": {
    "id": "jump_up",
    "url": "jump-up.png",
    "width": 64,
    "height": 64,
    "n_sprites": 1,
    "delay": 1
  },
  "jump_down": {
    "id": "jump_down",
    "url": "jump-down.png",
    "width": 64,
    "height": 64,
    "n_sprites": 1,
    "delay": 1
  },
  "jump_end": {
    "id": "jump_end",
    "url": "jump-end.png",
    "width": 64,
    "height": 64,
    "n_sprites": 1,
    "delay": 1
  },
  "running": {
    "id": "running",
    "url": "running.png",
    "width": 64,
    "height": 64,
    "n_sprites": 8,
    "delay": 5
  }
};

const HERO = {
  "sprite": {
    "atlas": "assets/hero/hero.json",
    "bank": HERO_BANK,
    "width": 64,
    "height": 64,
    "width_hb": 16,
    "height_hb": 52,
    "lmargin": 22,
    "tmargin": 12,
    "applied_filters": {
      "bevel": {
        "thickness": 1.5
      }
    }
  },
  "initial_position": {
    "x": 446.5,
    "y": 187
  },
  "max_hp": 100
}
