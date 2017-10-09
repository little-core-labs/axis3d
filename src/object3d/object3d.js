import { assertComponentArguments, } from '../utils'
import { Object3DContext } from './context'
import * as defaults from './defaults'
import { Entity } from '../core'

/**
 * The Object3D component wraps the Object3DContext component.
 *
 * Object3DMatrixContext(ctx) -> ScopedContext(ctx) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?(Object} [initialState = {}]
 * @return {Function}
 * @throws BadArgumentError
 * @throws MissingContextError
 */
export function Object3D(ctx, initialState = {}) {
  assertComponentArguments('Object3D', ctx, initialState)
  return Object3DContext(ctx, initialState)
}

