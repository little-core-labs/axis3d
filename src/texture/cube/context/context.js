import { assignDefaults } from '../../../utils'
import * as defaults from '../defaults'
import { Entity } from '../../../core'

import { CubeTexturePointerContext } from './pointer'
import { CubeTextureDataContext } from './data'
import { CubeTextureInfoContext } from './info'

export function CubeTextureContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const {uniformName} = initialState
  return Entity(ctx, initialState,
    CubeTextureDataContext(ctx, initialState),
    CubeTexturePointerContext(ctx, initialState),
    CubeTextureInfoContext(ctx, initialState),
  )
}
