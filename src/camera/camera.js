import { assignDefaults } from '../utils'
import { CameraContext } from './context'
import * as defaults from './defaults'
import { Entity } from '../core'

/**
 * CameraShaderUniforms(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {Object} initialState
 * @return {Function}
 */
export function Camera(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return Entity(ctx, initialState, CameraContext(ctx, initialState))
}
