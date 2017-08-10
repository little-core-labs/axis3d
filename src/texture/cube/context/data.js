import { assignDefaults, get } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'

import {
  getCubeTextureDataResolution,
  isCubeTextureDataReady
} from '../../utils'

export class CubeTextureDataContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, CubeTextureDataContext.defaults())
    super(ctx, initialState,
      new ScopedContext(ctx, {
        cubeTextureData(ctx, args) {
          const data = get('data', [args, ctx, initialState])
          if (data && Array.isArray(data) && data.some(isCubeTextureDataReady)) {
            const [w, h] = getCubeTextureDataResolution(data)
            if (w && h) { return [ ...data ] }
          }
          return null
        }
      })
    )
  }
}
