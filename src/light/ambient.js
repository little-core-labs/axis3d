'use strict'

/**
 * Module dependencies.
 */

import { AmbientLightType as type } from './types'
import { kMaxAmbientLights } from './limits'
import { incrementStat } from '../stats'
import { Light } from '../core/light'
import coalesce from 'defined'

export const kDefaultAmbientLightAmbient = 0.01
export const kDefaultAmbientLightContextEntry = {
  identifier: 'ambient',
  type: type,
  max: kMaxAmbientLights,
  defaults: {
    color: [0, 0, 0, 0],
    visible: false,
  }
}

/**
 * AmbientLight class.
 *
 * @public
 * @class AmbientLight
 * @extends Light
 */
export class AmbientLight extends Light {

  /**
   * AmbientLight class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */
  constructor(ctx, initialState = {}) {
    incrementStat('AmbientLight')
    super(ctx, {
      ...initialState,
      ambient: coalesce(initialState.ambient, kDefaultAmbientLightAmbient),
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
    return kDefaultAmbientLightContextEntry
  }
}
