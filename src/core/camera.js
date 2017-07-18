'use strict'

import { Object3D, Object3DContext } from './object3d'
import { Quaternion, Vector3 } from '../math'
import { ShaderUniforms } from './gl'
import { assignTypeName } from './types'
import { registerStat } from '../stats'

import computeEyeVector from 'eye-vector'
import coalesce from 'defined'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'
import quat from 'gl-quat'

const scratchQuaternion = new Quaternion()
const scratchMatrix = mat4.identity([])

export class Camera extends Object3D {
  constructor(ctx, initialState = {}) {
    const {context = new CameraContext(ctx, initialState)} = initialState
    const {uniforms = new CameraUniforms(ctx, initialState)} = initialState
    const injectContext = ctx.regl({ context, uniforms })

    super(ctx, {
      ...initialState,
      update({}, state, block) {
        injectContext(state, block)
      }
    })

   registerStat('Camera')
    assignTypeName(this, 'camera')
  }
}

export class CameraContext extends Object3DContext {
  constructor(ctx, initialState) {
    super(ctx, {
      ...initialState,
      computeTransformMatrix: false,
      computeLocalMatrix: false,
    })

    const {initialTarget = new Vector3(0, 0, 0)} = initialState
    const {controller} = initialState

    if (null == controller) {
      throw TypeError("CameraContext expects a controller.")
    }

    const viewMatrix = mat4.identity([])
    const eye = new Vector3(0, 0, 0)

    // protected properties
    Object.defineProperties(this, {
      initialViewport: {
        get() { return initialState.viewport },
        enumerable: false,
      },
      initialTarget: { get() { return initialTarget }, enumerable: false },
      viewMatrix: { get() { return viewMatrix }, enumerable: false },
      controller: { get() { return controller }, enumerable: false, },
    })

    this.aspect = ({viewportWidth: width, viewportHeight: height}) => {
      return width/height
    }

    this.projection = (...args) => {
      this.updateCameraController(...args)
      return controller.projection.slice()
    }

    this.view = (...args) => {
      return this.computeViewMatrix(...args)
    }

    this.invertedView = (...args) => {
      return mat4.invert([], this.view(...args))
    }

    this.direction = (...args) => {
      this.updateCameraController(...args)
      return controller.direction
    }

    this.target = ({scale}, {target} = {}) => {
      return vec3.multiply([],
        coalesce(target, initialTarget, [0, 0, 0]),
        coalesce(scale, this.initialScale, [1, 1, 1]))
    }

    this.near = (...args) => {
      this.updateCameraController(...args)
      return controller.near
    }

    this.far = (...args) => {
      this.updateCameraController(...args)
      return controller.far
    }

    this.eye = (...args) => {
      computeEyeVector(viewMatrix, eye)
      return eye
    }

    this.up = (...args) => {
      this.updateCameraController(...args)
      return controller.up
    }

    this.createPickingRay = ({viewportHeight: h}) => {
      let mx = 0, my = 0
      return (mouse) => {
        mouse(({currentX: x, currentY: y}) => {
          mx = x
          my = h - y
        })
        return controller.createPickingRay([mx, my])
      }
    }

    this.viewport = ({}, args) => {
      args = args || {}
      return coalesce(args.viewport, initialState.viewport, null)
    }
  }

  // context properties are ignored
  computeViewMatrix({}, {
    position = this.initialPosition,
    rotation = this.initialRotation,
    target = this.initialTarget,
    scale = this.initialScale,
  } = {}) {
    const {localMatrix, viewMatrix, controller } = this
    this.updateCameraController(...arguments)
    this.updateCameraViewport(...arguments)

    if (!position || !rotation || !scale) {
      return
    }

    // update controller controller
    controller.identity()
    controller.translate(position)
    controller.lookAt(vec3.multiply([], target, scale))
    controller.update()

    quat.normalize(scratchQuaternion, rotation)
    mat4.copy(viewMatrix, controller.view)
    mat4.fromQuat(scratchMatrix, scratchQuaternion)
    mat4.multiply(viewMatrix, viewMatrix, scratchMatrix)
    return viewMatrix
  }

  updateCameraController({
    near: contextNear = this.controller.near,
    far: contextFar = this.controller.far,
  }, {
    near = contextNear,
    far = contextFar,
  } = {}) {
    let needsUpdate = false
    if (far && this.controller.far != far) {
      this.controller.far = far
      needsUpdate = true
    }

    if (near && this.controller.near != near) {
      this.controller.near = near
      needsUpdate = true
    }

    if (needsUpdate) {
      this.controller.update()
    }
  }

  updateCameraViewport({
    viewportTop = -1,
    viewportLeft = -1,
    viewportWidth,
    viewportHeight,
    viewport: contextViewport = null
  }, {
    viewport = contextViewport
  } = {}) {
    // update controller viewport
    Object.assign(this.controller.viewport, viewport || [
      viewportLeft, viewportTop, viewportWidth, viewportHeight
    ])
  }
}

export class CameraUniforms extends ShaderUniforms {
  constructor(ctx, initialState) {
    super(ctx)
    this.set({
      ///** mat4 */ 'camera.invertedView': ({invertedView}) => invertedView,
      ///** mat4 */ 'camera.projection': ({projection}) => projection,
      ///** float */ 'camera.aspect': ({aspect}) => aspect,
      ///** mat4 */ 'camera.view': ({view}) => view,
      ///** vec3 */ 'camera.eye': ({eye}) => [...eye],
    })
  }
}
