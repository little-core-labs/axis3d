precision mediump float;

/**
 * Shader uniforms.
 */

uniform sampler2D albedoTexture;

/**
 * Shader IO.
 */

varying vec2 vuv;

/**
 * Shader entry.
 */

void main() {
  gl_FragColor = texture2D(albedoTexture, vuv);
}
