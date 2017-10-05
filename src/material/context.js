import { assignDefaults, ensureRGB, pick } from '../utils'
import { ScopedContext} from '../scope'
import * as defaults from './defaults'

export function MaterialContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return ScopedContext(ctx, initialState, {
    lineWidth: (ctx, args) => pick('lineWidth', [args, defaults, ctx]),
    wireframe: (ctx, args) => pick('wireframe', [args, defaults, ctx]),
    opacity: (ctx, args) => pick('opacity', [args, defaults, ctx]),
    color: (ctx, args) => ensureRGB(pick('color', [args, defaults, ctx])),
  })
}
