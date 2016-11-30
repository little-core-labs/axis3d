/**
 * Vignette shader borrowed from:
 * https://github.com/regl-project/regl/blob/gh-pages/example/metaball.js
 */

precision mediump float;

/**
 * Shader uniforms.
 */

uniform vec4 color;
uniform vec2 resolution;
uniform float noise;
uniform float boost;
uniform float reduction;

#pragma glslify: createVignette = require(color-shader-functions/vignette)

/**
 * Vignette reduction factor value.
 */

float random(vec3 scale, float seed) {
	return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}

void main() {
	vec2 center = resolution * 0.5;
	vec3 base = color.xyz;
  vec3 vignette = createVignette(color, boost, reduction, resolution).xyz;

	float n = noise * (0.5 - random(vec3(1.0), length(gl_FragCoord)));
	float v = .5 * length(vec2(gl_FragCoord.y / resolution.y, (1.0 - abs(0.5 - gl_FragCoord.x/resolution.x))));

	base += vec3(pow(v, 2.));
	gl_FragColor = vec4(base * vignette + vec3(n), 1.);
}
