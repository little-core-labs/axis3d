import { assignDefaults } from '../../../utils'
import { Component } from '../../../core'
import * as defaults from '../defaults'

import { CubeTexturePointerContext } from './pointer'
import { CubeTextureDataContext } from './data'
import { CubeTextureInfoContext } from './info'

export class CubeTextureContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, CubeTextureContext.defaults())
    const {uniformName} = initialState
    super(ctx, initialState,
      new CubeTextureDataContext(ctx, initialState),
      new CubeTexturePointerContext(ctx, initialState),
      new CubeTextureInfoContext(ctx, initialState),
    )
  }
}
