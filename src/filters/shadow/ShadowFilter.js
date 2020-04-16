class ShadowFilter extends PIXI.Filter {

    constructor(vertex_src, fragment_src, params = {}) {
        super(vertex_src, fragment_src);
        const uniforms = Object.assign({}, ShadowFilter.defaults, params);
        for (let key in uniforms) {
          this.uniforms[key] = uniforms[key];
        }

        this.uniforms.transformX = this.thickness * Math.cos(this.angle);
        this.uniforms.transformY = this.thickness * Math.sin(this.angle);
        this.need_sprite = true;
        this.light_x = this.uniforms.l_x;
        this.light_y = this.uniforms.l_y;
    }

    get thickness() {
      return this.uniforms.thickness;
    }

    get angle() {
      return deg2rad(this.uniforms.rotation);
    }

    updateSprite() {
      const u = this.uniforms;
      const l = u.l_sprite;
      const p = (u.p_sprite.hitbox ? u.p_sprite.hitbox : u.p_sprite);
      const lx = l.x + this.light_x,
            ly = l.y + this.light_y,
            px = p.x + p.width/2,
            py = p.y + p.height/2;
      const angle = Math.atan2(py - ly, px - lx);
      this.uniforms.transformX = this.thickness * Math.cos(angle);
      this.uniforms.transformY = this.thickness * Math.sin(angle);
    }
}

ShadowFilter.defaults = {
    rotation: 45,
    thickness: 1,
    lightAlpha: 0.5,
    shadowAlpha: 0.5,
    light_color: [1.0, 1.0, 1.0]
}

exports.constructor = ShadowFilter;
