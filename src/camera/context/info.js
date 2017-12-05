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
  return ScopedContext(ctx, initialState, {
    transformMatrix() { return kMat4Identity },
    localMatrix() { return kMat4Identity },

    projectionMatrix(ctx, args) {
      return pick('projectionMatrix', [args, initialState, defaults]) || kMat4Identity
    },

    aspect(ctx, args) {
      const width = pick('viewportWidth', [args, ctx])
      const height = pick('viewportHeight', [args, ctx])
      return width/height
    },

    target(ctx, args) {
      const scale = pick('scale', [ctx, args, initialState, defaults])
      const target  = pick('target', [args, ctx, initialState, defaults])
      return vec3.multiply([], target, scale)
    },

    up(ctx, args) {
      return pick('up', [args, ctx, initialState, defaults])
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
