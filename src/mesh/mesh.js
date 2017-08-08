import { CameraShaderUniforms } from '../camera'
import { assignDefaults } from '../utils'
import * as defaults from './defaults'
import { Component } from '../core'
import { Object3D } from '../object3d'
import { Geometry } from '../core'

import { MeshContext } from './context'
import { MeshState } from './state'
import {
  MeshShaderAttributes,
  MeshShaderUniforms,
  MeshShaderDefines,
  MeshShader
} from './shader'


export class Mesh extends Component {
  static defaults() {
    return { ...defaults }
  }

  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Mesh.defaults())
    if (null == initialState.geometry.complex) {
      initialState.geometry = new Geometry({complex: initialState.geometry})
    }
    const getContext = ctx.regl({})
    const draw = ctx.regl({ ...initialState.regl })
    super(ctx, initialState,
      new Object3D(ctx, initialState),
      new MeshContext(ctx, initialState),
      new MeshState(ctx, initialState),
      new MeshShaderDefines(ctx, initialState),
      new MeshShaderAttributes(ctx, initialState),
      new MeshShaderUniforms(ctx, initialState),
      new MeshShader(ctx, initialState),
      new CameraShaderUniforms(ctx, { ...initialState.camera }),
      (state, block) => {
        draw(state)
        getContext(block)
      }
    )
  }
}
