Core Components
===============

The following modules are the core components in which Axis3D is
built on.

## [context](context.md)
## [entity](entity.md)
## [geometry](geometry.md)
## [shaderlib](shaderlib.md)

The built-in shader library provides a set of interfaces for creating
GLSLwhen creating vertex and fragment shaders. It adds the ability to
include shader source much like in C with an added `#include` directive.
GLSL is preprocessed ahead of time and cached. Only the GLSL that is
actually used is compiled into a shader program.

See the [Axis3D Standard GLSL Library][stdglsl] for detailed
documentation on the GLSL types, macros, uniforms, and functions
available and how to include them in your shader.


[stdglsl]: ../glsl/index.md
