import { assignDefaults, get } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

export class Object3DMatrixContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Object3DMatrixContext.defaults())
    const matrix = mat4.identity(new Float32Array(16))
    const previousRotation = []
    const previousPosition = []
    const previousScale = []
    super(ctx, initialState, new ScopedContext(ctx, {
      matrix(ctx, args) {
        const position = get('position', [ctx, args])
        const rotation = get('rotation', [ctx, args])
        const scale = get('scale', [ctx, args, initialState])
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
    }))

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
  }
}
