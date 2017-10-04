import { assignDefaults, pick } from '../../utils'
import { ScopedContext } from '../../scope'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'

const kMat4Identity = mat4.identity([])

/**
 * CameraInfoContext(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {Object} initialState
 * @return {Function}
 */
export function CameraInfoContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return ScopedContext(ctx, initialState, {
    transform() { return kMat4Identity },
    matrix() { return kMat4Identity },

    projection(ctx, args) {
      return pick('projection', [args, ctx, initialState]) || kMat4Identity
    },

    aspect(ctx, args) {
      const width = pick('viewportWidth', [args, ctx])
      const height = pick('viewportHeight', [args, ctx])
      return width/height
    },

    target(ctx, args) {
      const scale = pick('scale', [ctx, args, initialState])
      const target  = pick('target', [args, ctx, initialState])
      return vec3.multiply([], target, scale)
    },

    up(ctx, args) {
      return pick('up', [args, ctx, initialState])
    },

    viewport(ctx, args) {
      const viewport = pick('viewport', [args, ctx, initialState])
      const height = pick('viewportHeight', [args, ctx, initialState])
      const width = pick('viewportWidth', [args, ctx, initialState])
      const left = pick('viewportLeft', [args, ctx, initialState])
      const top = pick('viewportTop', [args, ctx, initialState])
      return viewport || [
        (left || 0), (top || 0), (width || 0), (height || 0)
      ]
    },
  })
}
