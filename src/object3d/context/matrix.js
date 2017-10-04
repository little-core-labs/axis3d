import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import * as defaults from '../defaults'
import { pick } from '../../utils'
import mat4 from 'gl-mat4'

/**
 * Component to compute 3D local matrix. This component depends on
 * `Object3DTRSContext` context variables or similar from arguments
 * being invoked
 *
 * Object3DMatrixContext(ctx) -> ScopedContext(ctx) -> (args, scope) -> Any
 *
 * @public
 * @param {Context}
 * @return {Function}
 */
export function Object3DMatrixContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const matrix = mat4.identity(new Float32Array(16))
  const previousRotation = new Float32Array(4)
  const previousPosition = new Float32Array(3)
  const previousScale = new Float32Array(3)
  return ScopedContext(ctx, initialState, {
    matrix(ctx, args) {
      const position = pick('position', [ctx, args, defaults])
      const rotation = pick('rotation', [ctx, args, defaults])
      const scale = pick('scale', [ctx, args, defaults])
      if (
        compareVectors(previousPosition, position) ||
        compareVectors(previousRotation, rotation) ||
        compareVectors(previousScale, scale)
      ) {
        copy(previousPosition, position)
        copy(previousRotation, rotation)
        copy(previousScale, scale)
        // M = T * R * S
        mat4.fromRotationTranslation(matrix, rotation, position)
        mat4.scale(matrix, matrix, scale)
      }
      return matrix
    }
  })
}

function compareVectors(a, b) {
  if (a.length != b.length) { return true }
  for (let i = 0; i < a.length; ++i) {
    if (a[i] != b[i]) { return true }
  }
  return false
}

function copy(a, b) {
  for (let i = 0; i < b.length; ++i) {
    a[i] = b[i]
  }
}

