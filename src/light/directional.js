'use strict'

/**
 * Module dependencies.
 */

import { DirectionalLightType as type } from './types'
import { kMaxDirectionalLights } from './limits'
import { incrementStat } from '../stats'
import { Light } from '../core/light'

import coalesce from 'defined'
import mat4 from 'gl-mat4'

/**
 * Default directional light intensity.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultDirectionalLightIntensity = 0.5

/**
 *
 * Default directional light radius.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultDirectionalLightRadius = 0.05

/**
 * Default point light ambient factor.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultDirectionalLightAmbient = 0.005

/**
 * The defualt light context entry object for
 * a light uniform.
 *
 * @public
 * @const
 * @type {Object}
 */

export const kDefaultDirectionalLightContextEntry = {
  identifier: 'directional',
  type: type,
  max: kMaxDirectionalLights,
  defaults: {
    transform: mat4.identity([]),
    position: [0, 0, 0, 0],
    color: [0, 0, 0, 0],
    intensity: 0,
    visible: false,
    ambient: 0,
    radius: 0,
  },
}

/**
 * DirectionalLight class.
 *
 * @public
 * @class DirectionalLight
 * @extends Light
 */

export class DirectionalLight extends Light {

  /**
   * DirectionalLight class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D Context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    incrementStat('DirectionalLight')
    super(ctx, {
      type,
      radius: kDefaultDirectionalLightRadius,
      ambient: kDefaultDirectionalLightAmbient,
      intensity: kDefaultDirectionalLightIntensity,
      ...initialState,
    })
  }

  /**
   * Returns the light context entry object for
   * a light uniform.
   *
   * @public
   * @static
   * @method
   * @return {Object}
   */

  static contextEntry() {
    return kDefaultDirectionalLightContextEntry
  }
}
