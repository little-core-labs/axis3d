Axis3D
======

Axis3D is a lightweight declarative graphics library built on top of
[regl][regl] with first class support for media.

# STATUS

***In Development*** - *This project is in active development*

# Installation

See the [Installation Documentation](doc/install.md) for more
information on how to install Axis3D into your project.

# Example

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
const box = Mesh(ctx, { geometry: BoxGeometry(ctx) })

const rotation = [0, 0, 0, 1]
const angle = [0, 0, 0, 1]

frame(({time}) => {
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.01)
  camera({rotation}, () => {
    material({color: Color('cyan')}, () => {
      box({wireframe: true})
    })
  })
})
```

# See Also

* [Axis3D Hello World](doc/hello-world.md)
- [Getting Started With Axis3D](doc/getting-started.md)
* [regl][regl] - Functional WebGL
* [glslify][glslify] - A node.js-style module system for GLSL
* [stackgl][stackgl] - Modular WebGL components

# License

MIT

[regl]: https://github.com/regl-project/regl
[stackgl]: https://github.com/stackgl
[glslify]: https://github.com/stackgl/glslify
