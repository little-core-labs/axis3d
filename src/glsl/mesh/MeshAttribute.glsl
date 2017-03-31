/**
 * Represents an mesh attribute stucture for varying
 * geometry properties.
 */

#pragma glslify: export(MeshAttribute)
struct MeshAttribute {
#ifdef HAS_POSITIONS
  vec3 position;
#endif

#ifdef HAS_NORMALS
  vec3 normal;
#endif

#ifdef HAS_UVS
  vec2 uv;
#endif
};
