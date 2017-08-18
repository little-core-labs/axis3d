Core Components
===============

The following modules are the core components in which Axis3D is
composed. Many of the essential components like [Texture][Texture],
[Mesh][Mesh], and [Material][Material] build upon the components
described below.

## [command](command.md)

A command extends the built-in `Function` class directly and
encapsulates a given function for later execution. Most components in
Axis3D are extensions of this class.

## [component](component.md)

A Component is a [Command][Command] that composes one or more components and
functions into a single function that is callable like a function.
An initial or default state can be given which is injected into the block
context object each call unless overwritten by incoming arguments.

## [context](context.md)

A context wraps a [regl][regl] environment and provides it to all
components in Axis3d. All WebGL resources are managed by [regl][regl]
and destroyed by the [Context][Context] class.

## [entity](entity.md)

An Entity instance is just a function that inject a [regl][regl] context. It
accepts a state object and a block, or "next" function that is given to
the internal regl command that inject a context containing the entity ID
created when an Entity is created.

## [geometry](geometry.md)

Geometry is an interface for representing [simplicial
complex][simplicial-complex] data used to represent [Mesh][Mesh]
attribute data. It is compatible with various [stack.gl][stackgl] mesh
models.

## [shaderlib](shaderlib.md)

The built-in shader library provides a set of interfaces for creating
GLSLwhen creating vertex and fragment shaders. It adds the ability to
include shader source much like in C with an added `#include` directive.
GLSL is preprocessed ahead of time and cached. Only the GLSL that is
actually used is compiled into a shader program.

See the [Axis3D Standard GLSL Library][stdglsl] for detailed
documentation on the GLSL types, macros, uniforms, and functions
available and how to include them in your shader.




[simplicial-complex]: https://en.wikipedia.org/wiki/Simplicial_complex
[stackgl]: http://stack.gl
[stdglsl]: ../glsl/index.md
[regl]: https://github.com/regl-project/regl

[Context]: context.md#context
[Context]: command.md#command

[Material]: ../material/material.md
[Texture]: ../texture/texture.md
[Mesh]: ../mesh/mesh.md

