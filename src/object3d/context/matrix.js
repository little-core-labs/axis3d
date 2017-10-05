import { assignDefaults, normalizeScaleVector, pick } from '../../utils'
import { ScopedContext } from '../../scope'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

/**
 * Component to compute 3D local and world transform matrix. This component
 * depends on
 *
 * Object3DMatrixContext(ctx) -> ScopedContext(ctx) -> (args, scope) -> Any
 *
 * @public
 * @param {Context}
 * @return {Function}
 */
export function Object3DMatrixContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const transformMatrix = mat4.identity(new Float32Array(16))
  const localMatrix = mat4.identity(new Float32Array(16))
  return ScopedContext(ctx, initialState, {
    matrix(ctx, args, batchId) {
      const position = pick('position', [args, defaults, ctx])
      const rotation = pick('rotation', [args, defaults, ctx])
      const scale = normalizeScaleVector(pick('scale', [args, defaults, ctx]))
      // M = T * R * S
      mat4.identity(localMatrix)
      mat4.fromRotationTranslation(localMatrix, rotation, position)
      mat4.scale(localMatrix, localMatrix, scale)
      return localMatrix
    },
    transform(ctx, args) {
      const {transform: parentTransformMatrix} = ctx
      const {transform: externalTransformMatrix} = (args || {})
      mat4.identity(transformMatrix)
      // M' = Mp * M
      if (parentTransformMatrix) {
        mat4.multiply(transformMatrix, parentTransformMatrix, localMatrix)
      }

      // apply external transform from arguments to computed transform
      if (externalTransformMatrix) {
        mat4.multiply(transformMatrix, externalTransformMatrix, transformMatrix)
      }
      return transformMatrix
    },
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
