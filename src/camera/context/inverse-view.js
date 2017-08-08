import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'

import mat4 from 'gl-mat4'

const kMat4Identity = mat4.identity([])

export class CameraInverseViewContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState) {
    assignDefaults(initialState, CameraInverseViewContext.defaults())
    super(ctx, initialState,
      new ScopedContext(ctx, {
        invertedView({view}) {
          return view ? mat4.invert([], view) : kMat4Identity
        }
      })
    )
  }
}
