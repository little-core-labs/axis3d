Geometry
=======

*[src/core/geometry.js](../../src/core/geometry.js)*

Geometry is an interface for representing [simplicial
complex][simplicial-complex] data used to represent [Mesh][Mesh]
attribute data. It is compatible with various [stack.gl][stackgl] mesh
models.

## Usage

```js
new Geometry({complex, flatten: false})
```

The `Geometry` class accepts an object of parameters that are used to
determine the final geometry.

### Initialization Options & Properties

#### flatten

If set to true, the complex will be flatten. This can give a low-poly
look for a mesh. Defaults to `false`.

#### complex

The [simplicial complex][simplicial-complex] holding position vertices
and optionally, cell indicies, normal vectors, and uv coordinates.

##### positions

An array of position vertices describing the geometry. This array should
not be flattened.

##### normals

An array of normal position vectors. This array should not be flattened.

##### cells

An array of vectors containing indexes of the position vertices used to
draw a trignale. This array should not be flattened.

##### uvs

An array of vectors containing coordinates for mapping texture data to a
geometry fragment.

### Example

```js
const bunny = new Geometry({complex: require('bunny', flatten: true)})
```


[simplicial-complex]: https://en.wikipedia.org/wiki/Simplicial_complex
[stackgl]: http://stack.gl
