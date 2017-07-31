import { CameraUniforms, CameraEyeContext, Camera } from '../core/camera'
import { radians, assign, get } from '../utils'
import { UniformsComponent } from '../core/components/uniforms'
import { ContextComponent } from '../core/components/context'
import { Component } from '../core/component'
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

export class PerspectiveCamera extends Component {
  static defaults() {
    return { ...Component.defaults(), ...Camera.defaults(),
      near: 0.01, far: 1000, fov: radians(60),
    }
  }

  constructor(ctx, initialState = {}) {
    assign(initialState, PerspectiveCamera.defaults(), initialState)
    super(ctx, initialState,
      new Camera(ctx, initialState),
      new PerspectiveCameraContext(ctx, initialState),
      new PerspectiveCameraProjectionContext(ctx, initialState),
      new PerspectiveCameraViewContext(ctx, initialState),
      new CameraEyeContext(ctx, initialState),
    )
  }
}

export class PerspectiveCameraProjectionContext extends Component {
  static defaults() { return { ...PerspectiveCamera.defaults() } }
  constructor(ctx, initialState = {}) {
    const defaults = PerspectiveCameraProjectionContext.defaults()
    assign(initialState, defaults, initialState)
    super(ctx, initialState,
      new ContextComponent(ctx, {
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
      })
    )
  }
}

export class PerspectiveCameraViewContext extends Component {
  static defaults() { return { ...PerspectiveCamera.defaults() } }
  constructor(ctx, initialState = {}) {
    const defaults = PerspectiveCameraViewContext.defaults()
    assign(initialState, defaults, initialState)
    super(ctx, initialState,
      new ContextComponent(ctx, {
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
    )
  }
}

export class PerspectiveCameraContext extends Component {
  constructor(ctx, initialState = {}) {
    assign(initialState, PerspectiveCamera.defaults(), initialState)
    super(ctx, initialState,
      new ContextComponent(ctx, {
        direction(ctx, args) {
          return get('direction', [args, ctx, initialState])
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

        up(ctx, args) {
          return get('up', [args, ctx, initialState])
        },
      })
    )
  }
}
