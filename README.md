Axis3D
======

*Axis3D* is a lightweight functional graphics library built on top of
[regl][regl]. It aims to be compatible with many components within the
[stack.gl](http://stack.gl) ecosystem. It provides a set of components
with sane defaults.

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

***Stable*** - *This project is in active development*

## Installation

See the [Installation Documentation](doc/install.md) for more
information on how to install Axis3D into your project.

## Features

* Everything is a function
* Reusable components
* Geometries with support for [simplicial-complex][simplicial-complex] modules (see: [bunny][bunny])
* Basic materials implementing common shading models
  * Flat
  * Lambert
  * Blinn-Phong
* Basic lighting components
  * Ambient
  * Directional
  * Point
* Declarative scene
  * Implicit transforms
* [regl][regl] compatibility
  * Command based (see: [regl-commands][regl-commands])
  * Context injection
* Common input providers
  * Keyboard
  * Mouse
  * Device orientation
  * WebVR

## Example

The following [hello world example](doc/hello-world.md) demonstrates rendering a
green box to the screen. A `canvas` is created with a `webgl` context and
automatically appended to the `body` DOM element.

```js
'use strict'
import {
  PerspectiveCamera,
  FlatMaterial,
  BoxGeometry,
  Context,
  Color,
  Frame,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'

const ctx = Context()

const material = FlatMaterial(ctx)
const camera = PerspectiveCamera(ctx, {position: [0, 0, 2]})
const frame = Frame(ctx)
const box = Mesh(ctx, { geometry: BoxGeometry() })

const rotation = [0, 0, 0, 1]
const angle = [0, 0, 0, 1]
const color = Color('green') // [0, 1, 0, 1]

frame(({time}) => {
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.01)
  camera({rotation}, () => {
    material({color}, () => {
      box({wireframe: true})
    })
  })
})
```

## Contributors

* [Joseph Werle](https://github.com/jwerle)
* [Vanessa Pyne](https://github.com/vipyne)

## Docs

* [Documentation](doc/index.md) (TBA)
* [Axis3D Hello World](doc/hello-world.md)
* [Getting Started With Axis3D](doc/getting-started.md)

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
