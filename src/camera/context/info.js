import { assignDefaults, get } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'

const kMat4Identity = mat4.identity([])

export class CameraInfoContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState) {
    assignDefaults(initialState, CameraInfoContext.defaults())
    super(ctx, initialState,
      new ScopedContext(ctx, {
        transform() { return kMat4Identity },
        matrix() { return kMat4Identity },

        projection(ctx, args) {
          return get('projection', [args, ctx, initialState]) || kMat4Identity
        },

        aspect(ctx, args) {
          const width = get('viewportWidth', [args, ctx])
          const height = get('viewportHeight', [args, ctx])
          return width/height
        },

        target(ctx, args) {
          const scale = get('scale', [ctx, args, initialState])
          const target  = get('target', [args, ctx, initialState])
          return vec3.multiply([], target, scale)
        },

        up(ctx, args) {
          return get('up', [args, ctx, initialState])
        },

        viewport(ctx, args) {
          const viewport = get('viewport', [args, ctx, initialState])
          const height = get('viewportHeight', [args, ctx, initialState])
          const width = get('viewportWidth', [args, ctx, initialState])
          const left = get('viewportLeft', [args, ctx, initialState])
          const top = get('viewportTop', [args, ctx, initialState])
          return viewport || [
            (left || 0), (top || 0), (width || 0), (height || 0)
          ]
        },
      }))
  }
}
