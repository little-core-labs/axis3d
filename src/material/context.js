import { ensureRGB, pick, assignDefaults } from '../utils'
import { ScopedContext} from '../scope'
import * as defaults from './defaults'

export function MaterialContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return ScopedContext(ctx, initialState, {
    lineWidth: (ctx, args) => pick('lineWidth', [args, ctx]),
    wireframe: (ctx, args) => pick('wireframe', [args, ctx]),
    opacity: (ctx, args) => pick('opacity', [args, ctx]),
    color: (ctx, args) => ensureRGB(pick('color', [args, ctx])),
  })
}
