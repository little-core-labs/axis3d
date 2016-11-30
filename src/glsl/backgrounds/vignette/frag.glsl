/**
 * Vignette shader borrowed from:
 * https://github.com/regl-project/regl/blob/gh-pages/example/metaball.js
 */

precision mediump float;

varying vec2 vuv;

/**
 * Shader uniforms.
 */

uniform vec3 scale;
uniform vec4 color;
uniform vec2 resolution;
uniform float noise;
uniform float boost;
uniform float reduction;
uniform float interpolation;

#ifdef HAS_MAP
uniform sampler2D map;
uniform bool isMapLoaded;
#endif

#pragma glslify: createVignette = require(color-shader-functions/vignette)

/**
 * Vignette reduction factor value.
 */

float random(vec3 scale, float seed) {
	return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}

void main() {
  vec3 base = color.xyz;
  vec4 c = color;

#ifdef HAS_MAP
  if (isMapLoaded) {
    c = mix(color,
            texture2D(map, vec2(gl_FragCoord.x/resolution.x, gl_FragCoord.y/resolution.y)),
            interpolation);
    base = c.xyz;
  } else {
    discard;
  }
#endif

	vec2 center = resolution * 0.5;
  vec3 vignette = createVignette(c, boost, reduction, resolution).xyz;

  float x = gl_FragCoord.y/resolution.y;
  float y = 1.0 - abs(0.5 - gl_FragCoord.x/resolution.x);
	float n = noise*(0.5 - random(scale, length(gl_FragCoord)));
	float k = 0.5*length(vec2(x, y));

	base += vec3(pow(k, 2.0));
	gl_FragColor = vec4(base * vignette + vec3(n), 1.0);
}
