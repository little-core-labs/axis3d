import { assignDefaults, get } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

export class PerspectiveCameraProjectionContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, PerspectiveCameraProjectionContext.defaults())
    super(ctx, initialState,
      new ScopedContext(ctx, {
        projection(ctx, args) {
          const projection = mat4.identity([])
          if ('projection' in args && args.projection) {
            mat4.copy(projection, args.projection)
          } else {
            const aspect = get('aspect', [args, ctx])
            const near = get('near', [args, ctx])
            const far = get('far', [args, ctx])
            const fov = get('fov', [args, ctx])
            mat4.perspective(projection, fov, aspect, near, far)
          }
          return projection
        }
      })
    )
  }
}
