//
// Shader dependencies.
//

#pragma glslify: GeometryContext = require('../../geometry/GeometryContext')

// lights
#pragma glslify: DirectionalLight = require('../../light/DirectionalLight')
#pragma glslify: PositionedLight = require('../../light/PositionedLight')
#pragma glslify: AmbientLight = require('../../light/AmbientLight')
#pragma glslify: PointLight = require('../../light/PointLight')

// unpack
#pragma glslify: unpackPositionedDirectionalLight = require('../../light/unpack_positioned_directional')
#pragma glslify: unpackPositionedPointLight = require('../../light/unpack_positioned_point')

//compute
#pragma glslify: computeLightAttenuation = require('../../light/compute_attenuation')
#pragma glslify: computeLightDirection = require('../../light/compute_direction')
#pragma glslify: computeDiffuse = require('../../light/compute_diffuse')

// fog
#pragma glslify: fogFactorExp2 = require(glsl-fog/exp2)

//
// Material implementation header guard.
//
#ifdef useLambertMaterial

#ifdef HAS_ENVIRONMENT_MAP
// adapted from https://github.com/regl-project/regl/blob/gh-pages/example/theta360.js
vec4 lookupEnv(vec3 dir) {
  float PI = 3.14;
  float lat = atan(dir.z, dir.x);
  float lon = acos(dir.y / length(dir));
  vec2 envLoc = vec2(0.5 + lat / (2.0 * PI), lon / PI);

  return texture2D(envmap.data, envLoc);
}
#endif

#ifdef HAS_ENVIRONMENT_CUBE_MAP
vec4 lookupCubeEnv(vec3 dir) {
  return textureCube(envmap.data, dir);
}
#endif

void applyPositionedLight(PositionedLight light,
                          GeometryContext geometry,
                          in vec3 surfaceColor,
                          inout vec3 fragColor)
{
  vec3 ambient = light.ambient * material.ambient.xyz;
  vec3 direction = computeLightDirection(light.position, geometry.position);
  float attenuation = computeLightAttenuation(light, direction);

  float diffuse =
    computeDiffuse(light,
                   geometry,
                   camera,
                   material,
                   direction);

  vec3 combined =
      diffuse
    * surfaceColor
    * light.color.xyz
    * light.intensity
    ;

  fragColor +=
    ambient
  + attenuation
  + combined
  ;
}

#pragma glslify: export(main)
// adapted from https://github.com/freeman-lab/gl-lambert-material/blob/master/fragment.glsl
void main() {
  GeometryContext geometry = getGeometryContext();
  vec3 surfaceColor = material.color.xyz;
  vec3 fragColor = vec3(0.0);
  vec3 reflectivity = vec3(0.0);
  float reflectivityAmount = 1.0;

  // adapted from https://github.com/regl-project/regl/blob/gh-pages/example/theta360.js
  mat4 invertedView = camera.invertedView;
  vec3 iv = invertedView[3].xyz / invertedView[3].w;
  vec3 eye = normalize(geometry.position.xyz - iv);
  vec3 rdir = reflect(eye, geometry.normal);

#ifdef HAS_MAP
  if (map.resolution.x > 0.0 && map.resolution.y > 0.0) {
    surfaceColor = texture2D(map.data, geometry.uv).rgb;
  }
#elif defined HAS_CUBE_MAP
  surfaceColor = textureCube(map.data, geometry.localPosition).rgb;
#endif

#ifdef HAS_ENVIRONMENT_MAP
  reflectivity = lookupEnv(rdir).rgb;
#elif defined HAS_ENVIRONMENT_CUBE_MAP
  reflectivity = lookupCubeEnv(rdir).rgb;
#endif

  // accumulate ambient
  for (int i = 0; i < MAX_AMBIENT_LIGHTS; ++i) {
    AmbientLight light = ambientLights[i];
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
    DirectionalLight light = directionalLights[i];
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
    PointLight light = pointLights[i];
    if (i >= lightContext.point.count) {
      break;
    } else if (light.visible) {
      applyPositionedLight(unpackPositionedPointLight(light),
                           geometry,
                           surfaceColor,
                           fragColor);
    }
  }

  reflectivity = reflectivityAmount * reflectivity;
  reflectivity = reflectivityAmount * reflectivity * surfaceColor;
  fragColor = fragColor + material.emissive.xyz + reflectivity;

  vec4 finalColor = vec4(fragColor, material.opacity);

  if (fog.enabled) {
    vec4 fogColor = fog.color;
    float fogAmount = fog.amount;
    float fogDistance = gl_FragCoord.z / gl_FragCoord.w;
    float fogAmountCalculated = fogFactorExp2(fogDistance, fogAmount);

    finalColor = mix(vec4(fragColor, material.opacity), fogColor, fogAmountCalculated);
  }

  gl_FragColor = finalColor;
}

#endif
