import { assertComponentArguments, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../../defaults'
import { alloc } from '../../../core/buffer'
import mat4 from 'gl-mat4'

/**
 * The Object3DTranslationMatrixContext component maps input position,
 * rotation, and scale arguments into context variables. Default values
 * are used if not provided as input arguments to this component function.
 *
 * Object3DTranslationMatrixContext(ctx) -> ScopedContext(ctx) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?(Object} [initialState = {}]
 * @return {Function}
 * @throws BadArgumentError
 * @throws MissingContextError
 */
export function Object3DTranslationMatrixContext(ctx, initialState = {}) {
  assertComponentArguments('Object3DTranslationMatrixContext', ctx, initialState)
  const matrix = mat4.identity(alloc(ctx, 16))
  return ScopedContext(ctx, initialState, {
    translationMatrix({}, args) {
      const position = pick('position', [args, initialState, defaults])
      mat4.identity(matrix)
      return mat4.translate(matrix, matrix, position)
    }
  })
}
