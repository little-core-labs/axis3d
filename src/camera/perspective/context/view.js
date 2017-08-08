import { assignDefaults, get } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'
import { lookAt } from '../../look-at'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'
import quat from 'gl-quat'

const scratchQuaternion = quat.identity([])
const scratchMatrix = mat4.identity([])
const kMat4Identity = mat4.identity([])

export class PerspectiveCameraViewContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, PerspectiveCameraViewContext.defaults())
    super(ctx, initialState,
      new ScopedContext(ctx, {
        view(ctx, args) {
          const matrix = mat4.identity([])
          const center = [0, 0, 0]
          const direction = get('direction', [ctx, args])
          const position = get('position', [ctx, args])
          const rotation = get('rotation', [ctx, args])
          const target = get('target', [ctx, args])
          const scale = get('scale', [ctx, args])
          const up = get('up', [ctx, args])
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
    )
  }
}
