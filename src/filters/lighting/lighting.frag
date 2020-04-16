precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;

uniform float light_intensity;
uniform vec3 light_color;

// Light position
uniform float l_x;
uniform float l_y;
uniform float l_z;

// Sprite position
uniform float p_x;
uniform float p_y;
uniform float p_z;

const float light_alpha = 0.3;
const float I_THR = 0.0;
const float SIGMA = 80.0;
const float SQRT2PI = 2.5067;

void main(void) {
    vec2 transform = vec2(1.0 / filterArea);
    vec3 p_light = vec3(l_x, l_y, l_z);
    vec3 p_plane = vec3(p_x, p_y, p_z);

    vec4 color = texture2D(uSampler, vTextureCoord);
    vec3 p_point = p_plane + vec3(vTextureCoord.xy * vec2(filterArea), 0.0);
    float d = distance(p_light, p_point);

    float intensity = light_intensity * exp(-0.5*pow(d/SIGMA, 2.0)) / (SIGMA*SQRT2PI);
    if (intensity >= I_THR) {
      color.rgb = mix(
        color.rgb,
        light_color,
        clamp((intensity - color.a)*light_alpha, 0.0, 1.0)
      );
    }
    gl_FragColor = color;
}
