import { assignDefaults, isolate } from '../utils'
import { CameraShaderUniforms } from '../camera'
import { FrameShaderUniforms } from '../frame'
import * as defaults from './defaults'
import { Object3D } from '../object3d'
import { Geometry } from '../core'
import { Entity } from '../core'

import { MeshContext } from './context'
import { MeshState } from './state'
import {
  MeshShaderAttributes,
  MeshShaderUniforms,
  MeshShader
} from './shader'

export function Mesh(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  if (null == initialState.geometry.complex) {
    initialState.geometry = new Geometry({complex: initialState.geometry})
  }
  const getContext = ctx.regl({})
  const draw = ctx.regl({ ...initialState.regl })
  return Entity(ctx, initialState, [
    //mesh
    MeshContext(ctx, initialState),
    MeshState(ctx, initialState),

    // shader
    MeshShaderAttributes(ctx, initialState),
    MeshShaderUniforms(ctx, initialState),
    MeshShader(ctx, initialState),

    // uniforms
    CameraShaderUniforms(ctx, initialState.camera),
    FrameShaderUniforms(ctx, initialState.frame),

    // draw
    (args, next) => {
      if (false !== draw.args) { draw() }
      return next()
    },
  ])
}
