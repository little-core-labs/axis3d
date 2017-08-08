import { MaterialShaderUniforms, MaterialShader } from './shader'
import { MaterialContext } from './context'
import { assignDefaults } from '../utils'
import { MaterialState } from './state'
import { Component } from '../core'
import * as defaults from './defaults'

export class Material extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Material.defaults())
    super(ctx, initialState,
      new MaterialState(ctx, initialState),
      new MaterialContext(ctx, initialState),
      new MaterialShaderUniforms(ctx, initialState),
      new MaterialShader(ctx, initialState),
    )
  }
}
