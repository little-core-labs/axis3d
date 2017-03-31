'use strict'

/**
 * Module dependencies.
 */

import { PointLightType as type } from './types'
import { DirectionalLight } from './directional'
import { kMaxPointLights } from './limits'
import { incrementStat } from '../stats'

import coalesce from 'defined'
import mat4 from 'gl-mat4'

/**
 * Default point light intensity.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultPointLightIntensity = 0.4

/**
 * Default point light ambient factor.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultPointLightAmbient = 0.0005

/**
 * Default point light radius.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultPointLightRadius = 0.0005

/**
 * The defualt light context entry object for
 * a light uniform.
 *
 * @public
 * @const
 * @type {Object}
 */

export const kDefaultPointLightContextEntry = {
  identifier: 'point',
  type: type,
  max: kMaxPointLights,
  defaults: {
    transform: mat4.identity([]),
    position: [0, 0, 0, 0],
    color: [0, 0, 0, 0],
    intensity: 0,
    visible: false,
    ambient: 0,
    radius: 0,
  }
}

/**
 * PointLight class.
 *
 * @public
 * @class PointLight
 * @extends PointLight
 */

export class PointLight extends DirectionalLight {

  /**
   * PointLight class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D Context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    incrementStat('PointLight')

    super(ctx, {
      ...initialState,
      intensity: coalesce(initialState.intensity, kDefaultPointLightIntensity),
      ambient: coalesce(initialState.ambient, kDefaultPointLightAmbient),
      radius: coalesce(initialState.radius, kDefaultPointLightRadius),
      type: coalesce(initialState.type, type),
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
    return kDefaultPointLightContextEntry
  }
}
