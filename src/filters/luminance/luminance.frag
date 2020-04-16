precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec4 filterClamp;

uniform float light_intensity;
uniform float light_gain;
uniform vec3 light_color;

const float ANGLE_STEP = 0.1;
const float LIGHT_DIST = 10.0;
const float PI = 3.14159;
const float MAX_TOTAL_LUM = ceil(PI * 2.0 / ANGLE_STEP) * LIGHT_DIST;

float brightness(vec4 color) {
  return (color.r + color.g + color.b) * color.a / 3.0;
}

float luminosity() {
  vec2 px = 1.0 / filterArea.xy;
  vec2 direction;
  vec2 displaced;
  vec4 cur_color;
  float total_lum = 0.0;

  for (float angle = 0.0; angle < PI * 2.0; angle += ANGLE_STEP) {
    direction = vec2(cos(angle), sin(angle)) * px;
    for (float cur_dist = 0.0; cur_dist < LIGHT_DIST; cur_dist++) {
      displaced = clamp(
        vTextureCoord + direction * (cur_dist + 1.0),
        filterClamp.xy,
        filterClamp.zw
      );
      cur_color = texture2D(uSampler, displaced);
      total_lum += brightness(cur_color);
    }
  }
  return clamp(total_lum / MAX_TOTAL_LUM * light_gain, 0.0, 1.0);
}

void main(void) {
    vec4 pcolor = texture2D(uSampler, vTextureCoord);
    float pluminosity = luminosity();
    vec4 white = vec4(light_color, pluminosity);
    gl_FragColor.rgb = mix(
      pcolor.rgb, white.rgb, pluminosity*light_intensity
    );
    gl_FragColor.a = clamp(pcolor.a + white.a, 0.0, 1.0);
}
