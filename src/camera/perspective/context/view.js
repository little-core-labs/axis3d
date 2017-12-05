import { assignDefaults, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'
import { lookAt } from '../../look-at'
import { alloc } from '../../../core/buffer'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'
import quat from 'gl-quat'

const scratchQuaternion = quat.identity([])
const scratchMatrix = mat4.identity([])
const kMat4Identity = mat4.identity([])

export function PerspectiveCameraViewContext (ctx, initialState = {}) {
  const matrix = mat4.identity(alloc(ctx, 16))
  return ScopedContext(ctx, {
    viewMatrix(ctx, args) {
      const viewMatrix = pick('viewMatrix', [ctx, args])
      if (viewMatrix) {
        return viewMatrix
      }
      const center = [0, 0, 0]
      const direction = pick('direction', [ctx, args])
      const position = pick('position', [ctx, args])
      const rotation = pick('rotation', [ctx, args])
      const target = pick('target', [ctx, args])
      const scale = pick('scale', [ctx, args])
      const up = pick('up', [ctx, args])
      if (!position || !rotation || !target || !scale) {
        return kMat4Identity
      }
      lookAt(direction, target, position, up)
      vec3.add(center, position, direction)
      quat.normalize(scratchQuaternion, rotation)
      mat4.fromQuat(scratchMatrix, scratchQuaternion)
      mat4.lookAt(matrix, position, center, up)
      mat4.multiply(matrix, matrix, scratchMatrix)
      mat4.scale(matrix, matrix, scale)
      return matrix
    }
  })
}
