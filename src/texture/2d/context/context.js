import { assignDefaults } from '../../../utils'
import { Component } from '../../../core'
import * as defaults from '../defaults'

import { TexturePointerContext } from './pointer'
import { TextureDataContext } from './data'
import { TextureInfoContext } from './info'

export class TextureContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, TextureContext.defaults())
    const {uniformName} = initialState
    super(ctx, initialState,
      new TextureDataContext(ctx, initialState),
      new TexturePointerContext(ctx, initialState),
      new TextureInfoContext(ctx, initialState),
    )
  }
}
