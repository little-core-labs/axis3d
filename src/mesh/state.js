import { assignDefaults, pick } from '../utils'
import * as defaults from './defaults'
import clamp from 'defined'

export function MeshState(ctx, initialState = {}) {
  assignDefaults(initialState, defaults.state)
  const {geometry} = initialState
  let elements = null
  const opts = {
    primitive(ctx, args) {
      if (pick('wireframe', [args, initialState])) {
        return pick('wireframePrimitive', [args, initialState])
      }
      return pick('primitive', [args, initialState])
    },

    lineWidth(ctx, args) {
      return Math.max(1, pick('lineWidth', [args, initialState])) || 1
    }
  }

  if (geometry.cells) {
    elements = ctx.regl.elements({data: geometry.cells})
    Object.assign(opts, {
      elements,
      count(ctx, args) {
        const dim = geometry.positions[0].length
        const max = dim*geometry.cells.length
        const count = pick('count', [args, initialState])
        if (null != count) { return clamp(count, 0, max) }
        return max
      }
    })
  } else if (geometry.positions) {
    Object.assign(opts, {
      count(ctx, args) {
        const count = pick('count', [args, initialState])
        const max = geometry.positions.length
        if (null != count) { return clamp(count, 0, max) }
        return max
      }
    })
  }

  return ctx.regl(opts)
}
