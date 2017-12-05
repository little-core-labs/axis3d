import { assertComponentArguments, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../../defaults'
import { alloc } from '../../../core/buffer'
import mat4 from 'gl-mat4'

/**
 * The Object3DTransformMatrixContext component maps input position,
 * rotation, and scale arguments into context variables. Default values
 * are used if not provided as input arguments to this component function.
 *
 * Object3DTransformMatrixContext(ctx) -> ScopedContext(ctx) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?(Object} [initialState = {}]
 * @return {Function}
 * @throws BadArgumentError
 * @throws MissingContextError
 */
export function Object3DTransformMatrixContext(ctx, initialState = {}) {
  assertComponentArguments('Object3DTransformMatrixContext', ctx, initialState)
  const matrix = mat4.identity(alloc(ctx, 16))
  const kIdentityMatrix = mat4.identity(alloc(ctx, 16))
  return ScopedContext(ctx, initialState, {
    transformMatrix({
      localMatrix = kIdentityMatrix,
      transformMatrix: parentTransformMatrix = kIdentityMatrix
    }) {
      mat4.copy(matrix, localMatrix)
      // M' = Mp * M
      if (parentTransformMatrix) {
        mat4.multiply(matrix, parentTransformMatrix, localMatrix)
      }
      return matrix
    }
  })
}
