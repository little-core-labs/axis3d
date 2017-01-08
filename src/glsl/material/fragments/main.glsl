precision mediump float;

//
// Shader dependencies.
//
#pragma glslify: GeometryContext = require('../../geometry/context')
#pragma glslify: LightContext = require('../../light/context')

// materials
#pragma glslify: LambertMaterial = require('../LambertMaterial')
#pragma glslify: PhongMaterial = require('../PhongMaterial')
#pragma glslify: FlatMaterial = require('../FlatMaterial')

#ifndef MATERIAL_TYPE
#define MATERIAL_TYPE FlatMaterial
#endif

#ifndef useFlatMaterial
#define useFlatMaterial 1
#endif

#define isinf(n) (n >= 0.0 || n <= 0.0)
#define isnan(n) !isinf(n) && n != n

#define getGeometryContext() GeometryContext(vposition, vnormal, vuv)

//
// Shader IO.
//
varying vec3 vposition;
varying vec3 vnormal;
varying vec2 vuv;

//
// Shader uniforms.
//
uniform MATERIAL_TYPE material;
uniform LightContext lightContext;
uniform vec3 eye;

#ifdef HAS_MAP
#pragma glslify: Map = require('../Map')
uniform Map map;
#endif

//
// Lambertian shading model.
//
import drawLambertMaterial from './lambert' where {
  getGeometryContext=getGeometryContext,
  lightContext=lightContext,
  material=material,
  map=map,
  eye=eye,
  isnan=isnan,
  isinf=isinf
}

//
// Phong shading model.
//
import drawPhongMaterial from './phong' where {
  getGeometryContext=getGeometryContext,
  lightContext=lightContext,
  material=material,
  map=map,
  eye=eye,
  isnan=isnan,
  isinf=isinf
}

//
// Flat shading model.
//
import drawFlatMaterial from './flat' where {
  getGeometryContext=getGeometryContext,
  material=material,
  map=map,
}

//
// Shader entries.
//
#ifdef useLambertMaterial
void main() {
  drawLambertMaterial();
}
#elif defined usePhongMaterial
void main() {
  drawPhongMaterial();
}
#elif defined useFlatMaterial
void main() {
  drawFlatMaterial();
}
#elif defined SHADER_MAIN_BODY
void main() {
  SHADER_MAIN_BODY
}
#else
void main() {
  discard;
}
#endif
