import { ensureRGB, get, assignDefaults } from '../utils'
import { ScopedContext} from '../scope'
import { Component } from '../core'
import * as defaults from './defaults'

export class MaterialContext extends Component {
  static defualts() { return { ...defaults } }

  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MaterialContext.defaults())
    super(ctx, initialState, new ScopedContext(ctx, {
      lineWidth: (ctx, args) => get('lineWidth', [args, ctx]),
      wireframe: (ctx, args) => get('wireframe', [args, ctx]),
      opacity: (ctx, args) => get('opacity', [args, ctx]),
      color: (ctx, args) => ensureRGB(get('color', [args, ctx])),
    }))
  }
}
