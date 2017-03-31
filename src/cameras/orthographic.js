'use strict'

/**
 * Module dependencies.
 */

import { CameraContext, Camera } from '../core/camera'
import { radians } from '../utils'

import createBaseCameraController from 'orthographic-camera'
import coalesce from 'defined'
import vec4 from 'gl-vec4'

/**
 * Default far plane value for a camera. Used as input for computing
 * a orthographic projection atrix.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultCameraFar = 1000.0

/**
 * Default near plane value for a camera. Used as input for computing
 * a orthographic matrix.
 *
 * @public
 * @const
 * @type {Number}
 */
export const kDefaultCameraNear = 0.1

/**
 * A OrthographicCamera class represents an abstraction around a camera
 * with an orthographic projection that is affected by viewport bounds.
 *
 * @public
 * @class OrthographicCamera
 * @extends Camera
 * @see {@link Camera}
 * @see {@link https://github.com/littlstar/orthographic-camera}
 */

export class OrthographicCamera extends Camera {

  /**
   * OrthographicCamera class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState) {

    /**
     * Camera regl context.
     */

    const context = new OrthographicCameraContext(ctx, {
      ...initialState
    })

    super(ctx, {
      ...initialState,
      context
    })
  }
}

/**
 * OrthographicCameraContext class.
 *
 * @public
 * @class OrthographicCameraContext
 * @extends CameraContext
 * @see {@link https://github.com/Jam3/orthographic-camera}
 */

export class OrthographicCameraContext extends CameraContext {

  /**
   * OrthographicCameraContext class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   * @see {@link CameraContext#constructor}
   */

  constructor(ctx, initialState) {

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
     * Base orthographic camera controller.
     */

    const controller = createBaseCameraController({
      position: [...(initialState.position || [0, 0, 0])],
      near: initialNear,
      far: initialFar,
    })

    super(ctx, {
      ...initialState,
      controller
    })
  }

  /**
   * Updates base camera controller viewport. If a viewport
   * object is given, it will supersede other viewport* values
   * given to this function.
   *
   * @protected
   * @method
   * @param {!Object} opts
   * @param {Number} opts.viewportTop
   * @param {Number} opts.viewportLeft
   * @param {Number} opts.viewportWidth
   * @param {Number} opts.viewportHeight
   * @param {Number} opts.viewport
   */

  updateCameraViewport({
    viewportWidth,
    viewportHeight,
    viewport: contextViewport = this.initialViewport
  }, {
    viewport = contextViewport
  } = {}) {
    // update controller viewport
    Object.assign(this.controller.viewport, viewport || [
      -viewportWidth,
      -viewportHeight,
      viewportWidth,
      viewportHeight,
    ])
  }
}
