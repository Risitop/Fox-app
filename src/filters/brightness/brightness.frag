precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec4 filterClamp;

uniform float modifier;

void main(void) {
    vec4 pcolor = texture2D(uSampler, vTextureCoord);
    gl_FragColor.rgb = pcolor.rgb * modifier;
    gl_FragColor.a = pcolor.a;
}
