import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'

import computeEyeVector from 'eye-vector'
import mat4 from 'gl-mat4'

const kMat4Identity = mat4.identity([])

export class CameraEyeContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState) {
    assignDefaults(initialState, CameraEyeContext.defaults())
    super(ctx, initialState,
      new ScopedContext(ctx, {
        eye({view}, args) {
          return computeEyeVector(view || kMat4Identity)
        }
      })
    )
  }
}
