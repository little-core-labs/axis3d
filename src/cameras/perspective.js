'use strict'

/**
 * Module dependencies.
 */

import { CameraContext, Camera } from '../core/camera'
import { radians } from '../utils'

import createBaseCameraController from 'perspective-camera'
import coalesce from 'defined'

/**
 * Default far plane value for a camera. Used as input for computing
 * a perspective projection matrix.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultCameraFar = 1000.0

/**
 * Default near plane value for a camera. Used as input for computing
 * a perspective matrix.
 *
 * @public
 * @const
 * @type {Number}
 */
export const kDefaultCameraNear = 0.01

/**
 * Default field of view (FOV) angle value, in radians, for a camera.
 * It is used as input for computing a perspective matrix.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultCameraFieldOfView = radians(60)

/**
 * A PerspectiveCamera class represents an abstraction around a camera
 * with a perspective projection that is affected by a field of view.
 *
 * @public
 * @class PerspectiveCamera
 * @extends Camera
 * @see {@link Camera}
 * @see {@link https://github.com/Jam3/perspective-camera}
 */

export class PerspectiveCamera extends Camera {

  /**
   * PerspectiveCamera class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {

    /**
     * Camera regl context.
     */

    const context = new PerspectiveCameraContext(ctx, initialState)

    super(ctx, { ...initialState, context })
  }
}

/**
 * PerspectiveCameraContext class.
 *
 * @public
 * @class PerspectiveCameraContext
 * @extends CameraContext
 * @see {@link https://github.com/Jam3/perspective-camera}
 */

export class PerspectiveCameraContext extends CameraContext {

  /**
   * PerspectiveCameraContext class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   * @see {@link CameraContext#constructor}
   */

  constructor(ctx, initialState) {

    /**
     * Initial field of view value.
     */

    const initialFov = coalesce(
      initialState.fov,
      initialState.fieldOfView,
      kDefaultCameraFieldOfView)

    /**
     * Initial far plane value.
     */

    const initialFar = coalesce(
      initialState.far,
      kDefaultCameraFar)

    /**
     * Initial near plane value.
     */

    const initialNear = coalesce(
      initialState.near,
      kDefaultCameraNear)

    /**
     * Base perspective camera controller.
     */

    const controller = createBaseCameraController({
      direction: [...(initialState.direction || [0, 0, -1])],
      position: [...(initialState.position || [0, 0, 0])],
      near: initialNear,
      fov: initialFov,
      far: initialFar,
    })

    super(ctx, { ...initialState, controller })

    /**
     * The field of view (FOV) in radians for a camera.
     *
     * @public
     * @type {Number}
     */

    this.fov = (...args) => {
      this.updateCameraController(...args)
      return this.controller.fov
    }
  }

  /**
   * Updates perspective camera controller state.
   *
   * @protected
   * @method
   * @param {{fov: Number}} opts
   */

  updateCameraController({
    fov: contextFov = this.controller.fov
  } = {}, {
    fov = contextFov
  } = {}) {
    super.updateCameraController(...arguments)
    if (fov && this.controller.fov != fov) {
      this.controller.fov = fov
    }
    this.controller.update()
  }
}
