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
blue triangle to the screen. A `canvas` is created with a `webgl` context and
automatically appended to the `body` DOM element.

<table>
  <tbody>
  <tr>
    <td>

```js
import { Triangle } from 'axis3d/mesh'
import {
  Context,
  Camera,
  Frame,
}  from 'axis3d'

const ctx = Context()
const frame = Frame(ctx)
const camera = Camera(ctx)
const triangle = Triangle(ctx)

frame(({time}) => {
  camera({position: [0, 0, 1]}, () => {
    triangle({color: [0, 0, 1, 1]})
  })
})
```

    </td>
    <td><img src="doc/assets/hello-world.png"></td>
  </tr>
  </tbody>
</table>

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
