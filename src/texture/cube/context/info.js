import { getCubeTextureDataResolution } from '../../utils'
import { assignDefaults } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'

export class CubeTextureInfoContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, CubeTextureInfoContext.defaults())
    const {uniformName} = initialState
    super(ctx, initialState,
      new ScopedContext(ctx, {
        cubeTextureUniformName() { return uniformName },
        cubeTextureResolution({cubeTextureData}) {
          return getCubeTextureDataResolution(cubeTextureData)
        }
      })
    )
  }
}
