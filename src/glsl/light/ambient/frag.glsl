precision mediump float;

/**
 * Shader uniforms.
 */

uniform sampler2D positionTexture;
uniform sampler2D normalTexture;
uniform sampler2D albedoTexture;
uniform float intensity;
uniform vec4 color;

/**
 * Shader IO.
 */

varying vec2 vuv;

/**
 * Shader entry.
 */

void main() {
  vec3 position = texture2D(normalTexture, vuv).xyz;
  vec4 ambient = intensity * color;
  vec3 normal = normalize(texture2D(normalTexture, vuv).xyz);
  vec4 albedo = texture2D(albedoTexture, vuv);
  gl_FragColor = vec4(ambient.xyz * albedo.xyz, albedo.a);
}
