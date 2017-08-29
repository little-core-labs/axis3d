import { assignDefaults, get } from '../utils'
import { Component } from '../core'
import * as defaults from './defaults'
import clamp from 'defined'

export class MeshState extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState) {
    assignDefaults(initialState, MeshState.defaults())
    const {geometry} = initialState
    let elements = null
    const opts = {
      primitive(ctx, args) {
        if (get('wireframe', [args, ctx])) {
          return get('wireframePrimitive', [args, ctx])
        }
        return get('primitive', [args, ctx])
      },

      lineWidth(ctx, args) {
        return Math.max(1, get('lineWidth', [args, ctx]))
      }
    }

    if (geometry.cells) {
      elements = ctx.regl.elements({data: geometry.cells})
      Object.assign(opts, {
        elements,
        count(ctx, args) {
          const dim = geometry.positions[0].length
          const max = dim*geometry.cells.length
          const count = get('count', [args, ctx])
          if (null != count) { return clamp(count, 0, max) }
          return max
        }
      })
    } else if (geometry.positions) {
      Object.assign(opts, {
        count(ctx, args) {
          const count = get('count', [args, ctx])
          const max = geometry.positions.length
          if (null != count) { return clamp(count, 0, max) }
          return max
        }
      })
    }

    super(ctx, initialState, ctx.regl(opts))
  }
}
