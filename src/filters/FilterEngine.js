class FilterEngine {

  constructor() {
    this.filter_bank = new FilterBank();
    this.light_sources = [];
  }

  loadFilters(filters_json) {
    this.filter_bank.loadFilters(filters_json);
  }

  createFilter(id, params = {}) {
    return this.filter_bank.createFilter(id, params);
  }

  addLights() {

  }

  addFilters_(objects) {
    // Gathering light sources
    for (let object of objects) {
      if (object.light_source) {
        this.light_sources.push(object);
      }
    }
    for (let object of objects) {
      // We want only sprites
      let sprite = object;
      if (!(object instanceof AnimatedSprite)) {
        if (object.sprite === null) continue;
        sprite = object.sprite;
      }
    }
  }

  addFilters(decorations, backgrounds, objects) {
    console.log("Creating filters...");
    // Light filters
    for (let id in decorations) {
      const decoration = decorations[id];
      if (decoration.light_source === undefined ||
          decoration.light_source === null) {
        continue;
      }

      // Backgrounds
      for (let anim_sprite of backgrounds) {
        if (anim_sprite.sprite === null) continue;
        anim_sprite.filters = anim_sprite.filters.concat([
          this.createFilter(
            'brightness',
            {
              'modifier': anim_sprite.applied_filters.brightness.modifier
            }
          ),
          this.createFilter(
            'lighting',
            {
              'light_intensity': decoration.light_source.light_intensity,
              'light_color': PIXI.utils.hex2rgb(decoration.light_source.light_color),
              'l_sprite': decoration.sprite,
              'l_x': decoration.light_source.sp_x,
              'l_y': decoration.light_source.sp_y,
              'l_z': 0,
              'p_sprite': anim_sprite,
              'p_z': 0
            }
          ),
        ]);
      }

      // Sprites
      for (let drawable of objects) {
        if (drawable.sprite === null) continue;
        //if (drawable.light_source) continue;
        drawable.sprite.filters = drawable.sprite.filters.concat([
          this.createFilter(
            'bevel', {
              'l_sprite': decoration,
              'l_x': decoration.light_source.sp_x,
              'l_y': decoration.light_source.sp_y,
              'p_sprite': drawable,
              'thickness': drawable.sprite.applied_filters.bevel.thickness,
              'light_color': PIXI.utils.hex2rgb(decoration.light_source.light_color)
            }
          )
        ]);
      }

      decoration.sprite.filters = [
        this.createFilter('luminance', {
          'light_gain': decoration.applied_filters.luminance.light_gain,
          "light_color": PIXI.utils.hex2rgb(decoration.light_source.light_color)
        })
      ];
    }
  }
  
}
