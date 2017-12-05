import { assignDefaults } from '../../../utils'
import * as defaults from '../defaults'
import { Entity } from '../../../core'

import { TexturePointerContext } from './pointer'
import { TextureDataContext } from './data'
import { TextureInfoContext } from './info'

export function TextureContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return Entity(ctx, initialState,
    TextureDataContext(ctx, initialState),
    TexturePointerContext(ctx, initialState),
    TextureInfoContext(ctx, initialState),
  )
}
