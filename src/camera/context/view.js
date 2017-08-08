import { assignDefaults, get } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'

import mat4 from 'gl-mat4'
import quat from 'gl-quat'

const scratchQuaternion = quat.identity([])
const scratchMatrix = mat4.identity([])
const kMat4Identity = mat4.identity([])

export class CameraViewContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState) {
    assignDefaults(initialState, CameraViewContext.defaults())
    super(ctx, initialState,
      new ScopedContext(ctx, {
        view(ctx, args) {
          const matrix = mat4.identity([])
          const position = get('position', [ctx, args])
          const rotation = get('rotation', [ctx, args])
          const target = get('target', [ctx, args])
          const scale = get('scale', [ctx, args])
          const up = get('up', [ctx, args])
          if (!position || !rotation || !target || !scale) {
            return kMat4Identity
          }
          quat.normalize(scratchQuaternion, rotation)
          mat4.fromQuat(scratchMatrix, scratchQuaternion)
          mat4.translate(matrix, matrix, position)
          mat4.lookAt(matrix, target, position, up)
          mat4.multiply(matrix, matrix, scratchMatrix)
          mat4.scale(matrix, matrix, scale)
          return matrix
        }
      }))
  }
}
