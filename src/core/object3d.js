import { DynamicValue } from './gl'
import { Entity } from './entity'
import coalesce from 'defined'
import mat4 from 'gl-mat4'

const kMat4Identity = mat4.identity([])

export class Object3D extends Entity {
  static defaults() {
    return {
      ...super.defaults(),
      rotation: [0, 0, 0, 1],
      position: [0, 0, 0],
      scale: [1, 1, 1]
    }
  }

  constructor(ctx, initialState = {}) {
    const get = (k, objs) => (objs.filter((o)=> o).find((o) => o[k]) || {})[k]
    const defaults = Object3D.defaults()
    const context = new Object3DContext(ctx, initialState)
    const injectContext = ctx.regl({context})

    const injectTRS = ctx.regl({
      context: new DynamicValue(ctx, initialState, {
        scale(ctx, args) {
          const scale = get('scale', [args, initialState, ctx, defaults])
          if ('number' == typeof scale) { return [scale, scale, scale] }
          return scale
        },

        position(ctx, args) {
          return get('position', [args, initialState, ctx, defaults])
        },

        rotation(ctx, args = {}) {
          return get('rotation', [args, initialState, ctx, defaults])
        },
      })
    })

    const injectMatrix = ctx.regl({
      context: new DynamicValue(ctx, initialState, {
        matrix(ctx, args) {
          const matrix = mat4.identity([])
          const position = get('position', [ctx, args, initialState, defaults])
          const rotation = get('rotation', [ctx, args, initialState, defaults])
          const scale = get('scale', [ctx, args, initialState, defaults])
          // M = T * R * S
          mat4.fromRotationTranslation(matrix, rotation, position)
          mat4.scale(matrix, matrix, scale)
          return matrix
        }
      })
    })

    const injectTransform = ctx.regl({
      context: {
        transform(ctx, args) {
          const {matrix: local, transform: parent} = ctx
          const matrix = mat4.identity([])
          const {transform} = (args || {})
          // M' = Mp * M
          if (parent) { mat4.multiply(matrix, parent, local) }
          // apply external transform from arguments to computed transform
          if (transform) { mat4.multiply(matrix, transform, matrix) }
          return matrix
        },
      }
    })

    Object.assign(initialState, defaults, initialState)
    super(ctx, initialState, (state, block) => {
      injectTRS(state, () => {
        injectMatrix(() => {
          injectTransform(() => {
            injectContext(state, (...args) => {
              const {update} = initialState
              if ('function' == typeof update) {
                update(state, block)
              } else if ('function' == typeof block) {
                block(...args)
              }
            })
          })
        })
      })
    })
  }
}

export class Object3DContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    const defaults = Object3D.defaults()
    Object.assign(initialState, defaults, initialState)
    super(ctx, initialState, { })
  }
}
