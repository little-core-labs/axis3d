import { DynamicValue, ShaderUniforms } from './gl'
import { Object3D } from './object3d'
import { Component } from './entity'
import { Entity } from './entity'
import { get } from '../utils'

import computeEyeVector from 'eye-vector'
import coalesce from 'defined'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'
import quat from 'gl-quat'

const scratchQuaternion = quat.identity([])
const scratchMatrix = mat4.identity([])
const kMat4Identity = mat4.identity([])

export class Camera extends Entity {
  static defaults() {
    return {
      ...super.defaults(),
      direction: [0, 0, -1],
      target: [0, 0, 0],
      view: kMat4Identity,
      up: [0, 1, 0],
    }
  }

  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Camera.defaults(), initialState)
    super(ctx, initialState, Entity.compose(ctx, [
      new Object3D(ctx),
      ctx.regl({context: new CameraContext(ctx, initialState)}),
      ctx.regl({context: new CameraViewContext(ctx, initialState)}),
      ctx.regl({context: new CameraComputedContext(ctx, initialState)}),
      ctx.regl({uniforms: new CameraUniforms(ctx, initialState)}),
      initialState.update,
    ]))
  }
}

export class CameraContext extends DynamicValue {
  constructor(ctx, initialState) {
    Object.assign(initialState, Camera.defaults(), initialState)
    super(ctx, initialState, {
      matrix() { return kMat4Identity },

      projection(ctx, args) {
        return get('projection', [args, ctx, initialState]) || kMat4Identity
      },

      aspect(ctx, args) {
        const width = get('viewportWidth', [args, ctx])
        const height = get('viewportHeight', [args, ctx])
        return width/height
      },

      target(ctx, args) {
        const scale = get('scale', [ctx, args, initialState])
        const target  = get('target', [args, ctx, initialState])
        return vec3.multiply([], target, scale)
      },

      eye(ctx, args) {
        const view = get('view', [ctx, args]) || kMat4Identity
        return computeEyeVector(view)
      },

      up(ctx, args) {
        return get('up', [args, ctx, initialState])
      },

      viewport(ctx, args) {
        const viewport = get('viewport', [args, ctx, initialState])
        const height = get('viewportHeight', [args, ctx, initialState])
        const width = get('viewportWidth', [args, ctx, initialState])
        const left = get('viewportLeft', [args, ctx, initialState])
        const top = get('viewportTop', [args, ctx, initialState])
        return viewport || [
          (left || 0), (top || 0), (width || 0), (height || 0)
        ]
      },
    })
  }
}

export class CameraViewContext extends DynamicValue {
  constructor(ctx, initialState) {
    Object.assign(initialState, Camera.defaults(), initialState)
    super(ctx, initialState, {
      view(ctx, args) {
        const matrix = mat4.identity([])
        const position = get('position', [ctx, args, initialState])
        const rotation = get('rotation', [ctx, args, initialState])
        const target = get('target', [ctx, args, initialState])
        const scale = get('scale', [ctx, args, initialState])
        const up = get('up', [ctx, args, initialState])
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
    })
  }
}

export class CameraComputedContext extends DynamicValue {
  constructor(ctx, initialState) {
    Object.assign(initialState, Camera.defaults(), initialState)
    super(ctx, initialState, {
      invertedView({view}) {
        return view ? mat4.invert([], view) : kMat4Identity
      },
    })
  }
}

export class CameraUniforms extends ShaderUniforms {
  constructor(ctx, initialState) {
    super(ctx, initialState, {
      'camera.invertedView': ({invertedView}) => invertedView,
      'camera.projection': ({projection}) => projection,
      'camera.aspect': ({aspect}) => aspect,
      'camera.view': ({view}) => view,
      'camera.eye': ({eye}) => [...eye],
    })
  }
}
