import { assertComponentArguments } from '../../utils'
import { Object3DMatrixContext } from './matrix'
import { Object3DTRSContext } from './trs'
import { Entity } from '../../core'

/**
 * The Object3DContext component wraps the Object3DTRSContext and
 * Object3DMatrixContext components into an Entity.
 *
 * Object3DContext(ctx, initialState) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?(Object} [initialState = {}]
 * @return {Function}
 * @throws BadArgumentError
 * @throws MissingContextError
 */
export function Object3DContext(ctx, initialState = {}) {
  assertComponentArguments('Object3DContext', ctx, initialState)
  return Entity(ctx, initialState,
    Object3DTRSContext(ctx, initialState),
    Object3DMatrixContext(ctx, initialState),
  )
}
