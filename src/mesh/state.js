import { assignDefaults, get } from '../utils'
import { Component } from '../core'
import * as defaults from './defaults'
import clamp from 'defined'

export class MeshState extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState) {
    assignDefaults(initialState, MeshState.defaults())
    const {geometry} = initialState
    const opts = {
      primitive(ctx, args) {
        if (get('wireframe', [args, ctx])) {
          return get('wireframePrimitive', [args, ctx])
        }
        return get('primitive', [args, ctx])
      },

      lineWidth(ctx, args) {
        return Math.max(1, get('lineWidth', [args, ctx]))
      },
    }
    if (geometry && geometry.cells) {
      opts.elements = (ctx, args) => {
        const cells = geometry.cells
        const count = get('count', [args, ctx])
        if (cells && 'number' == typeof count) {
          return cells.slice(0, clamp(Math.floor(count), 0, cells.length))
        }
        return cells
      }
    } else if (geometry) {
      opts.count = (ctx, args) => {
        return get('count', [args, ctx]) || geometry.positions.length
      }
    }

    super(ctx, initialState, ctx.regl(opts))
  }
}
