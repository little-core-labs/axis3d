Hello World
===========

The following hello world example demonstrates rendering a blue triangle
to the screen. A `canvas` is created with a `webgl` context and
automatically appended to the `body` DOM element.

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

If successful, the you should see the following:

<img src="assets/hello-world.png">

# <a name="see-also"></a> See Also

* [Setup](setup.md)
* [Getting Started](getting-started.md)
