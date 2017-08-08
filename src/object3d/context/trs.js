import { assignDefaults, get } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'

export class Object3DTRSContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Object3DTRSContext.defaults())
    super(ctx, initialState, new ScopedContext(ctx, {
      scale(ctx, args) {
        const scale = get('scale', [args, initialState, ctx])
        if ('number' == typeof scale) { return [scale, scale, scale] }
        return scale
      },

      position(ctx, args) {
        return get('position', [args, initialState, ctx])
      },

      rotation(ctx, args) {
        return get('rotation', [args, initialState, ctx])
      },
    }))
  }
}
