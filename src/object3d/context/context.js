import { Object3DTransformContext } from './transform'
import { Object3DMatrixContext } from './matrix'
import { Object3DTRSContext } from './trs'
import { assignDefaults } from '../../utils'
import { Component } from '../../core'
import * as defaults from '../defaults'

export class Object3DContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Object3DContext.defaults())
    super(ctx, initialState,
      new Object3DTRSContext(ctx, initialState),
      new Object3DMatrixContext(ctx, initialState),
      new Object3DTransformContext(ctx, initialState))
  }
}

