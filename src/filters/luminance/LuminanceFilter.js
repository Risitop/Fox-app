class LuminanceFilter extends PIXI.Filter {

  constructor(vertex_src, fragment_src, params = {}) {
    super(vertex_src, fragment_src);
    const uniforms = Object.assign({}, LuminanceFilter.defaults, params);
    for (let key in uniforms) {
      this.uniforms[key] = uniforms[key];
    }
  }
}

LuminanceFilter.defaults = {
  "light_intensity": 1.0,
  "light_gain": 1.0,
  "light_color": [1.0, 1.0, 1.0]
}

exports.constructor = LuminanceFilter;
