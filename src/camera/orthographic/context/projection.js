import { assignDefaults, get } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

const scratchMatrix = mat4.identity([])

export class OrthographicCameraProjectionContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, OrthographicCameraProjectionContext.defaults())
    super(ctx, initialState,
      new ScopedContext(ctx, {
        projection(ctx, args) {
          const projection = mat4.identity(scratchMatrix)
          const viewport = get('viewport', [args, ctx, initialState])
          const near = get('near', [args, ctx, initialState])
          const far = get('far', [args, ctx, initialState])
          const left = viewport[0]
          const bottom = viewport[1]
          const right = viewport[2]
          const top = viewport[3]
          mat4.ortho(projection, left, right, bottom, top, near, far)
          return projection
        }
      })
    )
  }
}
