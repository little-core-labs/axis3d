import { CubeTextureContext } from './context'
import { assignDefaults } from '../../utils'
import * as defaults from './defaults'
import { Component } from '../../core'

export class CubeTexture extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}, ...children) {
    assignDefaults(initialState, CubeTexture.defaults())
    super(ctx, initialState,
      new CubeTextureContext(ctx, initialState)
    )
  }
}
