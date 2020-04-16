class BrightnessFilter extends PIXI.Filter {

    constructor(vertex_src, fragment_src, params = {}) {
        super(vertex_src, fragment_src);
        const uniforms = Object.assign({}, BrightnessFilter.defaults, params);
        for (let key in uniforms) {
          this.uniforms[key] = uniforms[key];
        }
    }
}

BrightnessFilter.defaults = {
  "modifier": 1.0
}

exports.constructor = BrightnessFilter;
