Context
=======

*[src/core/context.js](../../src/core/context.js)*

A context wraps a [regl][regl] environment and provides it to all
components in axis3d. All WebGL resources are managed by [regl][regl]
and destroyed by the [Context][#context] class.

## Default Optional Extensions

The following WebGL extensions are loaded if available. If they are not,
an error is not thrown.

* [ANGLE_instanced_arrays][ANGLE_instanced_arrays]
* [EXT_disjoint_timer_query][EXT_disjoint_timer_query]
* [OES_texture_float][OES_texture_float]
* [OES_element_index_uint][OES_element_index_uint]
* [OES_vertex_array_object][OES_vertex_array_object]

## Usage

```js
new Context(opts = {}, createRegl = require('regl'))
```

The `Context` class is an object that extends [`EventEmitter`][EventEmitter].
It creates a [regl][regl-api-initialization-options] environment
that is used to create [regl commands][regl-api-commands] that inject
[context variables][regl-api-context], [uniforms][regl-api-uniforms],
[attributes][regl-api-attributes], [vertex and fragment shader
programs][regl-api-shaders], and [more][regl-api-inputs]. Axis3D builds
on this pattern and is therefore functional by way of [regl][regl].

The `Context` class accepts two arguments. The first argument is an object
containing parameters to configure the context when it is created. The
second is a function used to create the [regl][regl] environment. It
defaults to the output of `requrie('regl')`.

### Arguments

#### Initialization Options

The first argument used to configure the instance may contain the
following properties.

##### pixelRatio

The device pixel ratio to use. If not provided, it defaults to
`window.devicePixelRatio || 1`.

##### canvas or element

A DOM element or DOM element selector string that represents a `<canvas>` or
an elment containing one. If one is not provided, then one is created and
appended to the DOM automatically

##### profile

If set to `true`, then profiling will be enabled for all
[regl commands][regl-api-commands] created by this context.

##### regl or gl

An object of [initialization options][regl-api-initialization-options] passed
directly to the [`createRegl`][#custom-regl] function.

#### Custom REGL

The second argument is an optional function that can be used to create
the regl environment. It defaults to exports of `require('regl')`.

### Properties

The following properties are public on a `Context` instance.

#### context.isDestroyed

A read-only `boolean` indicating whether the context has been destroyed
destroyed.

#### context.domElement

A read-only value pointing to the `<canvas>` DOM element associated with the
`WebGLRenderingContext`. The value may be `null` If the context is
destroyed are failed to initialize.

#### context.hasFocus

A read-only boolean indicating whether the `domElement` has user focus.
This can be made `true` or `false` programmatically or when a `'blur'` or
`'focus'` is dispatched on the `domElement`.

#### context.regl

A read-only value pointing to the `regl` function bound to the context.
This is used significantly in Axis3D components.

### Methods

The following methods are public on a `Context` instance.

#### context.focus()

Toggles internal focus to `true`, and emits the `'focus'` event.

#### context.blur()

Toggles internal focus to `false`, and emits the `'blur'` event.

#### context.destroy()

Destroys all resources created with [regl][regl] with `regl.destroy()` and removes
the `domElement` from its `parentElement`. The `'beforedestroy'` event is
emitted before anything is destroyed. The `'destroyed'` event is emitted
after everything has been destroyed. The `domElement` and `regl` properties
are removed from the instance.

#### context.refresh()

Refreshes [regl][regl] state by calling the internal `_refresh()`
method.

#### context.flush()

Calls `gl.flush()`.

#### context.poll()

Calls `regl.poll()` to poll and update internal regl state.


[EventEmitter]: https://nodejs.org/api/events.html#events_class_eventemitter

[regl-api-initialization-options]: https://github.com/regl-project/regl/blob/gh-pages/API.md#all-initialization-options
[regl-api-attributes]: https://github.com/regl-project/regl/blob/gh-pages/API.md#attributes
[regl-api-uniforms]: https://github.com/regl-project/regl/blob/gh-pages/API.md#uniforms
[regl-api-context]: https://github.com/regl-project/regl/blob/gh-pages/API.md#context
[regl-api-shaders]: https://github.com/regl-project/regl/blob/gh-pages/API.md#shaders
[regl-api-inputs]: https://github.com/regl-project/regl/blob/gh-pages/API.md#inputs
[regl]: https://github.com/regl-project/regl

[ANGLE_instanced_arrays]: https://developer.mozilla.org/en-US/docs/Web/API/ANGLE_instanced_arrays
[EXT_disjoint_timer_query]: https://developer.mozilla.org/en-US/docs/Web/API/EXT_disjoint_timer_query
[OES_texture_float]: https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_float
[OES_element_index_uint]: https://developer.mozilla.org/en-US/docs/Web/API/OES_element_index_uint
[OES_vertex_array_object]: https://developer.mozilla.org/en-US/docs/Web/API/OES_vertex_array_object
