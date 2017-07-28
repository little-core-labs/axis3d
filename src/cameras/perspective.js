import { ShaderUniforms, DynamicValue } from '../core/gl'
import { CameraUniforms } from '../core/camera'
import { radians, get } from '../utils'
import { Camera } from '../core/camera'
import { Entity } from '../core/entity'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'
import quat from 'gl-quat'

const scratchQuaternion = quat.identity([])
const scratchMatrix = mat4.identity([])
const kMat4Identity = mat4.identity([])
const kEpsilon = 0.000000001

// adapted from:
// https://github.com/Jam3/perspective-camera/blob/master/lib/camera-look-at.js
function lookAt(direction, target, position, up) {
  const tmp = []
  vec3.subtract(tmp, target, position)
  vec3.normalize(tmp, tmp)
  if (tmp.every(Boolean)) { // not zero vector
    const d = vec3.dot(tmp, up)
    if (Math.abs(d - 1) < kEpsilon) { // collinear
      vec3.scale(up, direction, -1)
    } else if (Math.abs(d + 1) < kEpsilon) { // collinear opposite
      vec3.copy(up, direction)
    }
    vec3.copy(direction, tmp)
    vec3.cross(tmp, direction, up)
    vec3.normalize(tmp, tmp)
    vec3.cross(up, tmp, direction)
    vec3.normalize(up, up)
  }
}

export class PerspectiveCamera extends Entity {
  static defaults() {
    return {
      ...super.defaults(),
      ...Camera.defaults(),
      near: 0.01,
      far: 1000,
      fov: radians(60),
    }
  }

  constructor(ctx, initialState = {}) {
    Object.assign(initialState, PerspectiveCamera.defaults(), initialState)
    const update = Entity.compose(ctx, [
      new Camera(ctx, initialState),
      ctx.regl({context: new PerspectiveCameraContext(ctx, initialState)}),
      ctx.regl({context: new PerspectiveCameraComputeContext(ctx, initialState)}),
      ctx.regl({uniforms: new CameraUniforms(ctx, initialState)}),
    ])

    super(ctx, initialState, update)
  }
}

export class PerspectiveCameraComputeContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, PerspectiveCamera.defaults(), initialState)
    super(ctx, initialState, {
      projection(ctx, args) {
        const projection = mat4.identity([])
        if ('projection' in args && args.projection) {
          mat4.copy(projection, args.projection)
        } else {
          const aspect = get('aspect', [args, ctx, initialState])
          const near = get('near', [args, ctx, initialState])
          const far = get('far', [args, ctx, initialState])
          const fov = get('fov', [args, ctx, initialState])
          mat4.perspective(projection, fov, aspect, near, far)
        }
        return projection;
      },

      view(ctx, args) {
        const matrix = mat4.identity([])
        const center = [0, 0, 0]
        const direction = get('direction', [ctx, args, initialState])
        const position = get('position', [ctx, args, initialState])
        const rotation = get('rotation', [ctx, args, initialState])
        const target = get('target', [ctx, args, initialState])
        const scale = get('scale', [ctx, args, initialState])
        const up = get('up', [ctx, args, initialState])
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
}

export class PerspectiveCameraContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, PerspectiveCamera.defaults(), initialState)
    super(ctx, initialState, {
      direction(ctx, args) {
        return get('direction', [args, ctx, initialState])
      },

      up(ctx, args) {
        return get('up', [args, ctx, initialState])
      },

      near(ctx, args) {
        return get('near', [args, ctx, initialState])
      },

      far(ctx, args) {
        return get('far', [args, ctx, initialState])
      },

      fov(ctx, args) {
        return get('fov', [args, ctx, initialState])
      },

      viewport(ctx, args) {
        const viewport = get('viewport', [args, ctx, initialState])
        const height = get('viewportHeight', [args, ctx, initialState])
        const width = get('viewportWidth', [args, ctx, initialState])
        const left = get('viewportLeft', [args, ctx, initialState])
        const top = get('viewportTop', [args, ctx, initialState])
        return Object.assign(viewport, viewport || [
          (left || 0), (top || 0), (width || 0), (height || 0)
        ])
      },
    })
  }
}
