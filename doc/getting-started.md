Getting Started With Axis3D
===========================

# Table Of Contents

- [Installation](#installation)
- [Hello World](#hello-world)
- [Concepts](#concepts)
- [Documentation](#documentation)

# <a name="installation"></a> Installation

Axis3D can be installed into your project in various ways. Axis3D is
published to [npm][npm/axis3d], [released on Github][releases], and
installable with package managers like [yarn][yarn] and [npmi][npmi].

Follow the [installation guide](install.md) for a detailed approach to
installing Axis3D into your project. You're probably fine with the
following:

```sh
$ npm install --save axis3d
```

or

```sh
$ yarn add axis3d
```

# <a name="hello-world"></a> Hello World

The following [hello world example](hello-world.md) demonstrates rendering a
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
    <td><img src="assets/hello-world.png"></td>
  </tr>
  </tbody>
</table>

# <a name="concepts"></a> Concepts

Axis3D provides a simple, functional, and "stateless" API for describing
graphical components. Everything is a **function**. Everything is a
***[Command](api/Command.md)***. Commands are created with a core state that
is used when inputs are not provided when invoked. Commands provide stateless
operations based on some input to provide some output.

Commands also
* [collect input](concepts.md#input)
* [infer lighting](concepts.md#lighting),
* [infer scene hierarchy](concepts.md#scene-hierarchy])
* and [more](api/index.md)

Please read [Concepts](concepts.md) for more information.

# <a name="documentation"></a> Documentation

* [Documentation](index.md)
* [API Reference](api/index.md)
* [Makefile Targets](makefile.md)

# <a name="see-also"></a> See Also

* [Setup](setup.md)
* [Installation](install.md)
* [Concepts](concepts.md)
* [Hello World](hello-world.md)
* [API Reference](api/index.md)
* [Makefile Targets](makefile.md)

[npm/axis3d]: https://www.npmjs.com/package/axis3d
[releases]: https://github.com/littlstar/axis3d/releases
[THREE]: https://github.com/mrdoob/three.js
[npmi]: https://github.com/maxleiko/npmi
[yarn]: https://github.com/yarnpkg/yarn
[regl]: https://github.com/regl-project/regl
