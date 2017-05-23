'use strict'

/**
 * Module dependencies.
 */

import { Object3D, Object3DContext } from '../core/object3d'
import { Quaternion, Vector3 } from '../math'
import { registerStat } from '../stats'

import computeEyeVector from 'eye-vector'
import coalesce from 'defined'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'
import quat from 'gl-quat'

const scratchQuaternion = new Quaternion()
const scratchMatrix = mat4.identity([])

/**
 * The Camera class represents an abstraction around a view matrix. It
 * inherits from Object3D, so it has positional state input.
 *
 * @public
 * @abstract
 * @class Camera
 * @extends Object3D
 * @see {@link Object3D}
 * @see {@link PerspectiveCamera}
 * @see {@link OrthographicCamera}
 */

export class Camera extends Object3D {

  /**
   * Camera class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   * @throws TypeError
   */

  constructor(ctx, initialState = {}) {
    registerStat('Camera')

    /**
     * The injected regl context.
     */

    const {context = new CameraContext(ctx, initialState)} = initialState

    /**
     * Regl shader uniforms
     */

    const {uniforms = new CameraUniforms(ctx, initialState)} = initialState

    /**
     * Regl context injection function.
     */

    const injectContext = ctx.regl({ context, uniforms })

    super(ctx, {
      ...initialState,

      // all Object3D descendants must implement an update
      // method to actually do something
      update({}, state, block) {
        injectContext(state, block)
      }
    })
  }
}

/**
 * CameraContext class.
 *
 * @public
 * @class CameraContext
 * @extends Object3DContext
 */

export class CameraContext extends Object3DContext {

  /**
   * CameraContext class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   * @throws TypeError
   */

  constructor(ctx, initialState) {
    super(ctx, {
      ...initialState,
      computeTransformMatrix: false,
      computeLocalMatrix: false,
    })

    /**
     * Initial, and default camera lookAt target.
     */

    const {initialTarget = new Vector3(0, 0, 0)} = initialState

    /**
     * Base camera controller.
     */

    const {controller} = initialState
    if (null == controller) {
      throw TypeError("CameraContext expects a controller.")
    }

    /**
     * Computed view matrix.
     */

    const viewMatrix = mat4.identity([])

    /**
     * Computed eye vector.
     */

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

    /**
     * The copmuted viewport aspect ratio.
     *
     * @public
     * @type {Number}
     */

    this.aspect = ({viewportWidth: width, viewportHeight: height}) => {
      return width/height
    }

    /**
     * The computed projection matrix for a camera.
     *
     * @public
     * @type {Array<Number>}
     */

    this.projection = (...args) => {
      this.updateCameraController(...args)
      return controller.projection.slice()
    }

    /**
     * The computed view matrix for a camera.
     *
     * @public
     * @type {Array<Number>}
     */

    this.view = (...args) => {
      return this.computeViewMatrix(...args)
    }

    /**
     * The computed inverted view matrix for a camera.
     *
     * @public
     * @type {Array<Number>}
     */

    this.invertedView = (...args) => {
      return mat4.invert([], this.view(...args))
    }

    /**
     * The view direction for a camera.
     *
     * @public
     * @type {Array<Number>}
     */

    this.direction = (...args) => {
      this.updateCameraController(...args)
      return controller.direction
    }

    /**
     * The view target.
     *
     * @public
     * @type {Array<Number>}
     */

    this.target = ({}, {target} = {}) => {
      return coalesce(target, initialTarget)
    }

    /**
     * The near plane for a camera.
     *
     * @public
     * @type {Number}
     */

    this.near = (...args) => {
      this.updateCameraController(...args)
      return controller.near
    }

    /**
     * The far plane for a camera.
     *
     * @public
     * @type {Number}
     */

    this.far = (...args) => {
      this.updateCameraController(...args)
      return controller.far
    }

    /**
     * The computed eye vector for a camera.
     *
     * @public
     * @type {Array<Number>}
     * @see {@link https://github.com/hughsk/eye-vector}
     */

    this.eye = (...args) => {
      computeEyeVector(viewMatrix, eye)
      return eye
    }

    /**
     * The computed up vector for a camera.
     *
     * @public
     * @type {Array<Number>}
     */

    this.up = (...args) => {
      this.updateCameraController(...args)
      return controller.up
    }

    /**
     * Creates a picking ray from a mouse input
     *
     * @public
     * @type {Function}
     * @param {MouseInput|Function} mouse
     * @return {Ray3D}
     * @see {@link https://github.com/Jam3/ray-3d}
     */

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

    /**
     *
     * @public
     * @type {Array<Number>}
     */

    this.viewport = ({}, args) => {
      args = args || {}
      return coalesce(args.viewport, initialState.viewport, null)
    }
  }

  /**
   * Computes the view matrix.
   *
   * @protected
   * @method
   * @return {Array}
   */

  // context properties are ignored
  computeViewMatrix({}, {
    position = this.initialPosition,
    rotation = this.initialRotation,
    target = this.initialTarget,
    scale = this.initialScale,
  } = {}) {
    this.updateCameraController(...arguments)
    this.updateCameraViewport(...arguments)

    if (!position || !rotation || !scale) {
      return
    }

    const {
      localMatrix,
      viewMatrix,
      controller,
    } = this

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

  /**
   * Updates controller camera controller, if needed.
   *
   * @protected
   * @abstract
   * @method
   * @param {{far: Number, near: Number}} opts
   */

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

  /**
   * Updates base camera controller viewport.
   *
   * @protected
   * @abstract
   * @method
   * @param {!Object} opts
   * @param {Number} opts.viewportTop
   * @param {Number} opts.viewportLeft
   * @param {Number} opts.viewportWidth
   * @param {Number} opts.viewportHeight
   */

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

/**
 * CameraUniforms class.
 *
 * @public
 * @class CameraUniforms
 */

export class CameraUniforms {

  /**
   * CameraUniforms class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState) {

    /**
     * The computed projection matrix for a camera used
     * as a uniform mat4 in a shader.
     *
     * @public
     * @type {Array<Number>}
     */

    this['camera.projection'] = ({projection}) => {
      return projection
    }

    /**
     * The computed aspect ratio for a camera used
     * as a uniform float in a shader.
     *
     * @public
     * @type {Number}
     */

    this['camera.aspect'] = ({aspect}) => {
      return aspect
    }

    /**
     * The computed view matrix for a camera used
     * as a uniform mat4 in a shader.
     *
     * @public
     * @type {Array<Number>}
     */

    this['camera.view'] = ({view}) => {
      return view
    }

    /**
     * The computed eye vector  for a camera used
     * as a uniform vec3 in a shader.
     *
     * @public
     * @type {Array<Number>}
     */

    this['camera.eye'] = ({eye}) => {
      return [...eye]
    }

    /**
     * The computed inverted view used
     * as a uniform mat4 in a shader.
     *
     * @public
     * @type {Array<Number>}
     */

    this['camera.invertedView'] = ({invertedView}) => {
      return invertedView
    }
  }
}
