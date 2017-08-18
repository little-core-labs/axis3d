shaderlib
=======

*[src/core/shaderlib.js](../../src/core/shaderlib.js)*

The built-in shader library provides a set of interfaces for creating
GLSLwhen creating vertex and fragment shaders. It adds the ability to
include shader source much like in C with an added `#include` directive.
GLSL is preprocessed ahead of time and cached. Only the GLSL that is
actually used is compiled into a shader program.

See the [Axis3D Standard GLSL Library][stdglsl] for detailed
documentation on the GLSL types, macros, uniforms, and functions
available and how to include them in your shader.

## kDefaultShaderLibPrecision

```js
const kDefaultShaderLibPrecision = 'mediump float'
```

The default GLSL shader precision used when compiling a shader.

## kDefaultShaderLibVersion

```js
const kDefaultShaderLibVersion = '100'
```

The default GLSL version used when compiling a shader

## kDefaultShaderName

```js
const kDefaultShaderName = '<anonymous>'
```

The default shader name used when compiling a shader. It is useful for
errors as they are used in the regl stack trace.


## ShaderLib

```js
new ShaderLib({
  preprocessor = undefined,
  middleware = [],
  precision = kDefaultShaderLibPrecision,
  version = kDefaultShaderLibVersion,
  defines = {},
  glsl,
})
```

The `ShaderLib` class accepts an object of parameters that configure how
the `ShaderLib` instance preprocesses and compiles GLSL.

### Initialization Options

The first argument used to configure the instance may contain the
following properties.

#### preprocessor

An instance of `ShaderLibPreprocessor`. If not provided, then one is
created See below.

#### middleware

An array of `ShaderLibPlugin` instances that act as transform middleware when
shaders are being compiled.

#### precision

The GLSL shader precision used when compiling a shader. Defaults to
`kDefaultShaderLibPrecision`.

#### version

The GLSL version used when compiling a shader. Defaults to
`kDefaultShaderLibVersion`.

#### defines

A key value mapping of defines that are injected into the shader source.

#### glsl

An object containing GLSL source where the key is the include path and
the value is the source string. This object can be constructed with
[glslify][glslify] and a roll your own build system. Axis3D does just
that.

## ShaderLibPreprocessor

```js
new ShaderLibPreprocessor(shaderLib)
```

The `ShaderLibPreprocessor` class is not typically used directly.
However, there may be an instance where you require an extension of it.
In order for it work correctly, it needs an instance of
`ShaderLib` given to it. This can be deferred to after creation and set
on the instance with `preprocessor.shaderLib = shaderLib`.

## ShaderLibPlugin

```js
new ShaderLibPlugin((shaderLib, preprocessor, src, opts) => {
})
```

A `ShaderLibPlugin` class is a transform middleware that is called when
shaders are being compiled. It is given an instance of the `ShaderLib`,
`ShaderLibPreprocessor`, GLSL source string, and parameters given at the
time of preprocess.




[glslify]: https://github.com/stackgl/glslify
[stdglsl]: ../glsl/index.md
[regl]: https://github.com/regl-project/regl
