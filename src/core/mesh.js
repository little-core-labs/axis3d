import { isArrayLike, assign, get } from '../utils'
import { AttributesComponent } from './components/attributes'
import { UniformsComponent } from './components/uniforms'
import { ContextComponent } from './components/context'
import { CameraUniforms } from './camera'
import { Component } from './component'
import { Object3D } from './object3d'
import { Geometry } from './geometry'
import { Shader } from './shader'

import clamp from 'clamp'
import mat4 from 'gl-mat4'
import mat3 from 'gl-mat3'
import vec3 from 'gl-vec3'
import vec2 from 'gl-vec2'

const kMat4Identity = mat4.identity([])
const kMat3Identity = mat3.identity([])

export class Mesh extends Component {
  static defaults() {
    return {
      wireframePrimitive: 'line strip',
      uniformName: 'mesh',
      primitive: 'triangles',
      lineWidth: 1
    }
  }

  constructor(ctx, initialState = {}) {
    assign(initialState, Mesh.defaults(), initialState)
    if (false == initialState.geometry instanceof Geometry) {
      initialState.geometry = new Geometry({complex: initialState.geometry})
    }
    const getContext = ctx.regl({})
    const draw = ctx.regl({})
    super(ctx, initialState,
      new Object3D(ctx, initialState),
      new MeshContext(ctx, initialState),
      new MeshState(ctx, initialState),
      new MeshShader(ctx, initialState),
      new MeshAttributes(ctx, initialState),
      new MeshUniforms(ctx, initialState),
      new CameraUniforms(ctx, initialState),
      (state, block) => {
        draw(state)
        getContext(block)
      }
    )
  }
}

export class MeshContext extends Component {
  constructor(ctx, initialState = {}) {
    assign(initialState, Mesh.defaults(), initialState)
    const {geometry} = initialState
    let computedBoundingBox = null
    let computedSize = null
    super(ctx, initialState, new ContextComponent(ctx, {
      geometry() { return geometry },
      size({boundingBox, scale}) {
        if (!boundingBox) { return [0, 0] }
        if (computedSize) { return computedSize }
        const dimension = boundingBox && boundingBox[0].length
        const min = boundingBox[0]
        const max = boundingBox[1]
        switch (dimension) {
          case 3:
            computedSize = []
            vec3.subtract(computedSize, max, min);
            vec3.multiply(computedSize, computedSize, scale);
            break
          case 2:
            vec2.subtract(computedSize, max, min);
            vec2.multiply(computedSize, computedSize, scale);
            break
        }
        return computedSize
      },

      boundingBox() {
        if (!geometry) { return null }
        if (computedBoundingBox) { return computedBoundingBox }
        computedBoundingBox = geometry.computeBoundingBox()
        return computedBoundingBox
      }
    }))
  }
}

export class MeshShader extends Shader {
  constructor(ctx, initialState = {}) {
    assign(initialState, Mesh.defaults(), initialState)
    const {uniformName} = initialState
    super(ctx, {
      vertexShader: ({vertexShader}) => vertexShader || `
      #define GLSL_MESH_UNIFORM_VARIABLE ${uniformName}
      #include <camera/camera>
      #include <mesh/vertex>
      #include <mesh/mesh>

      #include <camera/uniforms>
      #include <mesh/uniforms>

      #include <vertex/attributes/position>
      #include <vertex/attributes/normal>
      #include <vertex/attributes/uv>

      #include <varying/position>
      #include <varying/normal>
      #include <varying/uv>
      #include <varying/emit>

      #include <vertex/main>
      void Main(inout vec4 vertexPosition, inout VaryingData data) {
        vertexPosition = MeshVertex(
          camera.projection,
          camera.view,
          ${uniformName}.model,
          position);
      }

     `,

      ...initialState
    })
  }
}

export class MeshUniforms extends Component {
  constructor(ctx, initialState = {}) {
    assign(initialState, Mesh.defaults(), initialState)
    const {uniformName} = initialState
    initialState.prefix = `${uniformName}.`
    super(ctx, initialState,
      new UniformsComponent(ctx, initialState, {
        position(ctx, args) {
          return get('position', [ctx, args, initialState])
        },

        rotation(ctx, args) {
          return get('rotation', [ctx, args, initialState])
        },

        scale(ctx, args) {
          return get('scale', [ctx, args, initialState])
        },

        modelNormal({transform}) {
          return isArrayLike(transform)
            ? mat3.normalFromMat4([], transform) || kMat3Identity
            : kMat3Identity
        },

        model({transform}) {
          return isArrayLike(transform)
            ? transform
            : kMat4Identity
        },
      })
    )
  }
}

export class MeshAttributes extends Component {
  constructor(ctx, initialState) {
    assign(initialState, Mesh.defaults(), initialState)
    const {geometry} = initialState
    super(ctx, initialState, new AttributesComponent(ctx, {
      position: geometry.positions || null,
      normal: geometry.normals || null,
      uv: geometry.uvs || null,
    }))
  }
}

export class MeshState extends Component {
  constructor(ctx, initialState) {
    assign(initialState, Mesh.defaults(), initialState)
    const {geometry} = initialState
    const opts = {
      lineWidth(ctx, args) {
        return Math.max(1, get('lineWidth', [args, ctx, initialState]))
      },

      primitive(ctx, args) {
        if (get('wireframe', [args, ctx, initialState])) {
          return get('wireframePrimitive', [args, ctx, initialState])
        }
        return get('primitive', [args, ctx, initialState])
      }
    }

    if (geometry && geometry.cells) {
      opts.elements = (ctx, args) => {
        const cells = geometry.cells
        const count = get('count', [args, initialState, ctx])
        if (cells && 'number' == typeof count) {
          return cells.slice(0, clamp(Math.floor(count), 0, cells.length))
        }
        return cells
      }
    } else if (geometry) {
      opts.count = (ctx, args) => {
        return get('count', [args, initialState, ctx])
          || geometry.positions.length
      }
    }

    super(ctx, initialState, ctx.regl(opts))
  }
}
