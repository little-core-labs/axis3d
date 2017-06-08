//
// Shader dependencies.
//

#pragma glslify: GeometryContext = require('../../geometry/GeometryContext')

// lights
#pragma glslify: DirectionalLight = require('../../light/DirectionalLight')
#pragma glslify: PositionedLight = require('../../light/PositionedLight')
#pragma glslify: AmbientLight = require('../../light/AmbientLight')
#pragma glslify: PointLight = require('../../light/PointLight')
#pragma glslify: Camera = require('../../camera/Camera')

// unpack
#pragma glslify: unpackPositionedDirectionalLight = require('../../light/unpack_positioned_directional')
#pragma glslify: unpackPositionedPointLight = require('../../light/unpack_positioned_point')

// utils
#pragma glslify: toLambertMaterial = require('../to_lambert')
#pragma glslify: computeLightDirection = require('../../light/compute_direction')
#pragma glslify: computeDiffuse = require('../../light/compute_diffuse')
#pragma glslify: phong = require('glsl-specular-blinn-phong')

//
// Material implementation header guard.
//
#ifdef usePhongMaterial

void applyPositionedLight(PositionedLight light,
                          GeometryContext geometry,
                          in vec3 surfaceColor,
                          inout vec3 fragColor)
{
  vec3 ambient = light.ambient * material.ambient.xyz;
  vec3 specular = vec3(0.0);
  vec3 viewpoint = normalize(camera.eye - geometry.position);
  vec3 direction = computeLightDirection(light.position, geometry.position);

  float diffuse =
    computeDiffuse(light,
                   geometry,
                   camera,
                   toLambertMaterial(material),
                   direction);

  if (material.shininess > 0.0 || material.shininess < 0.0) {
    float power =
      phong(normalize(direction),
            viewpoint,
            geometry.normal,
            material.shininess);
    if (power > 0.0 || power < 0.0) {
      specular = material.specular.xyz * power;
    }
  }

  vec3 combined =
      diffuse
    * surfaceColor
    * light.color.xyz
    * light.intensity
    ;

  fragColor +=
     ambient
   + combined
   + specular
   ;
}

#pragma glslify: export(main)
void main() {
  GeometryContext geometry = getGeometryContext();
  vec3 surfaceColor = material.color.xyz;
  vec3 fragColor = vec3(0.0);

#ifdef HAS_MAP
  if (map.resolution.x > 0.0 && map.resolution.y > 0.0) {
    surfaceColor = texture2D(map.data, geometry.uv).rgb;
  }
#endif

#ifdef HAS_CUBE_MAP
  surfaceColor = textureCube(cubemap.data, geometry.localPosition).rgb;
#endif

#ifdef HAS_ENV_MAP
  if (envmap.resolution.x > 0.0 && envmap.resolution.y > 0.0) {
    surfaceColor = texture2D(envmap.data, geometry.uv);
  }
#endif

#ifdef HAS_ENV_CUBE_MAP
  surfaceColor = textureCube(envcubemap.data, geometry.localPosition);
#endif

  // accumulate ambient
  for (int i = 0; i < MAX_AMBIENT_LIGHTS; ++i) {
    AmbientLight light = lightContext.ambient.lights[i];
    if (i >= lightContext.ambient.count) {
      break;
    } else if (light.visible) {
      fragColor += (
          vec4(surfaceColor, 1.0)
        * light.color
        * material.ambient
      ).xyz;
    }
  }

  for (int i = 0; i < MAX_DIRECTIONAL_LIGHTS; ++i) {
    DirectionalLight light = lightContext.directional.lights[i];
    if (i >= lightContext.directional.count) {
      break;
    } else if (light.visible) {
      applyPositionedLight(unpackPositionedDirectionalLight(light),
                           geometry,
                           surfaceColor.xyz,
                           fragColor);
    }
  }

  for (int i = 0; i < MAX_POINT_LIGHTS; ++i) {
    PointLight light = lightContext.point.lights[i];
    if (i >= lightContext.point.count) {
      break;
    } else if (light.visible) {
      applyPositionedLight(unpackPositionedPointLight(light),
                           geometry,
                           surfaceColor,
                           fragColor);
    }
  }

  fragColor = fragColor + material.emissive.xyz;
  gl_FragColor = vec4(fragColor, material.opacity);
}

#endif
