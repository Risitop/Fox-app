precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;

uniform float transformX;
uniform float transformY;
uniform float lightAlpha;
uniform float shadowAlpha;
uniform vec3 light_color;

const vec3 SHADOW_COLOR = vec3(0.0);

void main(void) {
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);
    vec2 dl = vTextureCoord - transform;
    float light = texture2D(uSampler, dl).a;
    if (dl[0] <= 0.0 || dl[1] <= 0.0) {
      light = 0.0;
    }
    vec2 ds = vTextureCoord + transform;
    float shadow = texture2D(uSampler, ds).a;
    if (ds[0] <= 0.0 || ds[1] <= 0.0) {
      shadow = 0.0;
    }

    color.rgb = mix(color.rgb, light_color, clamp((color.a - light) * lightAlpha, 0.0, 1.0));
    color.rgb = mix(color.rgb, SHADOW_COLOR, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));
    gl_FragColor = vec4(color.rgb * color.a, color.a);
}
