import { MaterialShaderUniforms, MaterialShader } from './shader'
import { FrameShaderUniforms } from '../frame'
import { MaterialContext } from './context'
import { assignDefaults } from '../utils'
import { MaterialState } from './state'
import * as defaults from './defaults'
import { Entity } from '../core'

export function Material(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return Entity(ctx, initialState,
    MaterialContext(ctx, initialState),
    MaterialState(ctx, initialState),
    MaterialShaderUniforms(ctx, initialState),
    FrameShaderUniforms(ctx, initialState),
    MaterialShader(ctx, initialState),
  )
}
