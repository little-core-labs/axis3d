import { getTextureDataResolution } from '../../utils'
import { assignDefaults } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'

export class TextureInfoContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, TextureInfoContext.defaults())
    const {uniformName} = initialState
    super(ctx, initialState,
      new ScopedContext(ctx, {
        textureUniformName() { return uniformName },
        textureResolution({textureData}) {
          return getTextureDataResolution(textureData)
        }
      })
    )
  }
}
