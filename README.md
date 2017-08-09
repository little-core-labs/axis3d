Axis3D
======

*Axis3D* is a lightweight functional graphics library built on top of
[regl][regl]. It aims to be compatible with many components within the
[stack.gl](http://stack.gl) ecosystem. It provides a set of components
with sane defaults. It is not intended to replace existing libraries,
but instead provide an alternative way for rendering graphics.

This library is heavily inspired by the underlying mechanics of [regl][regl]
and the functional/reactive component patterns introduced in
[react](https://github.com/facebook/react). The scene graph and transform
state is implied by the declarative structure of the components.

Everything is a function that injects a [regl context][regl-context].
Vectors and matrices are plain arrays that are compatible with
[gl-matrix](https://github.com/toji/gl-matrix) and
[the like](https://www.npmjs.com/search?q=gl-matrix). Axis3D should
feel familiar to [three.js](https://github.com/mrdoob/three.js), but
with less features.

## Status

***Stable*** - *This project is in active development towards _1.0.0_*

## Installation

```js
$ npm install axis3d
```

## Features

* Everything is a function with predictable output based on some input
* Large focus on shaders with a [standard GLSL library](src/core/glsl)
* Reusable components
* Geometry with support for [simplicial-complex][simplicial-complex] modules (see: [bunny][bunny])
* Declarative scene
  * Implicit [TRS transform matrix][transformation-matrix]
* [regl][regl] compatibility
  * Command based (see: [regl-commands][regl-commands])
  * Context injection

## Example

```js
import { Geometry, Material, Context, Frame, Mesh } from 'axis3d'
import { PerspectiveCamera } from 'axis3d/camera'
import Bunny from 'bunny'
import quat from 'gl-quat'

// scale vertices along the `y-axis` down a bit
for (const p of Bunny.positions) { p[1] = p[1] - 4 }

const ctx = new Context()
const rotation = quat.identity([])
const material = new Material(ctx)
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const bunny = new Mesh(ctx, {geometry: new Geometry({complex: Bunny})})

// requestAnimationFrame loop helper with context injection
frame(scene)

// the scene drawn every frame
function scene({time}) {
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  camera({rotation, position: [0, 0, 5]}() => {
    material(() => {
      bunny()
    })
  })
}
```

## Comparisons

The following are comparisons for effectively doing the same thing in Axis3D
below.

### Axis3D

```js
import { PerspectiveCamera, Context, Material, Frame, Mesh, } from 'axis3d'
import { BoxGeometry } from 'axis3d-geometry'
import quat from 'gl-quat'

const ctx = new Context()

const rotation = quat.identity([])
const geometry = new BoxGeometry({x: 10, y: 10, z: 10})
const material = new Material(ctx)
const camera = new PerspectiveCamera(ctx, {fov: 60, near: 0.1, far: 1000})
const frame = new Frame(ctx)
const mesh = new Mesh(ctx, {geometry})

frame(({time}) => {
  quat.setAxisAngle(rotation, [0, 1, 0], 0.5*time)
  camera({position: [0, 0, 5]}, () => {
    material({color: [0, 0, 1]}, () => {
      mesh({rotation})
    })
  })
})
```

### THREE

```js
const aspect = window.innerWidth/window.innerHeight
const near = 0.1
const far = 1000
const fov = 60

const renderer = new THREE.WebGLRenderer()
const geometry = new THREE.BoxGeometry(10, 10, 10)
const material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true})
const camera = new THREE.PerspectiveCamera(fov, aspect, near, faar)
const scene = new THREE.Scene()
const mesh = new THREE.Mesh(geometry, material)

camera.position.z = 5
renderer.setSize(window.innerWidth, window.innerHeight)
scene.add(mesh)
document.body.appendChild(renderer.domElement)

frame()
function frame() {
  requestAnimationFrame(frame)
  mesh.rotation.y = 0.5*Date.now()
  renderer.render(scene, camera)
}
```

## Contributors

* [Joseph Werle](https://github.com/jwerle)
* [Vanessa Pyne](https://github.com/vipyne)

## Docs

TBD

## See Also

* [regl][regl] - Functional WebGL
* [glslify][glslify] - A node.js-style module system for GLSL
* [stackgl][stackgl] - Modular WebGL components
* [simplicial-complex](simplicial-complex)

## License

MIT

[regl]: https://github.com/regl-project/regl
[bunny]: https://github.com/mikolalysenko/bunny
[stackgl]: https://github.com/stackgl
[glslify]: https://github.com/stackgl/glslify
[regl-context]: https://github.com/regl-project/regl/blob/gh-pages/API.md#context
[regl-commands]: https://github.com/regl-project/regl/blob/gh-pages/API.md#commands
[simplicial-complex]: https://github.com/mikolalysenko/simplicial-complex
[transformation-matrix]: https://en.wikipedia.org/wiki/Transformation_matrix
