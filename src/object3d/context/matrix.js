import { assignDefaults, get } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

export class Object3DMatrixContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Object3DMatrixContext.defaults())
    super(ctx, initialState, new ScopedContext(ctx, {
      matrix(ctx, args) {
        const matrix = mat4.identity([])
        const position = get('position', [ctx, args])
        const rotation = get('rotation', [ctx, args])
        const scale = get('scale', [ctx, args, initialState])
        // M = T * R * S
        mat4.fromRotationTranslation(matrix, rotation, position)
        mat4.scale(matrix, matrix, scale)
        return matrix
      }
    }))
  }
}
