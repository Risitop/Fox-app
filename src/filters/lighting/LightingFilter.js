class LightingFilter extends PIXI.Filter {
  constructor(vertex_src, fragment_src, params = {}) {
    super(vertex_src, fragment_src);
    const uniforms = Object.assign({}, LightingFilter.defaults, params);
    for (let key in uniforms) {
      this.uniforms[key] = uniforms[key];
    }
    this.need_sprite = true;

    this.light_x = this.uniforms.l_x;
    this.light_y = this.uniforms.l_y;
    this.t = 0;
    this.light_intensity_i = this.uniforms.light_intensity;
  }

  updateSprite() {
    const ldw = this.uniforms.l_sprite.width/2,
      ldh = this.uniforms.l_sprite.height/2,
      pdw = this.uniforms.p_sprite.width/2,
      pdh = this.uniforms.p_sprite.height/2;

    this.uniforms.l_x = (this.uniforms.l_sprite.x + this.light_x);
    this.uniforms.l_y = (this.uniforms.l_sprite.y + this.light_y);
    this.uniforms.p_x = this.uniforms.p_sprite.x;
    this.uniforms.p_y = this.uniforms.p_sprite.y;

    this.uniforms.light_intensity = this.light_intensity_i * (1 + Math.sin(this.t)*0.05);
    this.t += 0.05;
  }
}

LightingFilter.defaults = {
  "light_intensity": 1.0,
  "light_color": [1.0, 1.0, 1.0],
  "l_x": 0,
  "l_y": 0,
  "l_z": 0,
  "p_x": 0,
  "p_y": 0,
  "p_z": 0,
  "need_sprite": true
}

exports.constructor = LightingFilter;
