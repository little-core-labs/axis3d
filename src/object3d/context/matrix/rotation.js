import { assertComponentArguments, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../../defaults'
import { alloc } from '../../../core/buffer'
import mat4 from 'gl-mat4'

/**
 * The Object3DRotationMatrixContext component maps input rotation,
 * rotation, and scale arguments into context variables. Default values
 * are used if not provided as input arguments to this component function.
 *
 * Object3DRotationMatrixContext(ctx) -> ScopedContext(ctx) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?(Object} [initialState = {}]
 * @return {Function}
 * @throws BadArgumentError
 * @throws MissingContextError
 */
export function Object3DRotationMatrixContext(ctx, initialState = {}) {
  assertComponentArguments('Object3DRotationMatrixContext', ctx, initialState)
  const matrix = mat4.identity(alloc(ctx, 16))
  return ScopedContext(ctx, initialState, {
    rotationMatrix({}, args) {
      const rotation = pick('rotation', [args, initialState, defaults])
      return mat4.fromQuat(matrix, rotation)
    }
  })
}
