'use strict'

/**
 * Module dependencies.
 */

import { ReflectionMaterialType as type } from './types'
import { Material } from '../core/material'

/**
 * ReflectionMaterial class represents a basic material that
 * reflects a given environment map.
 *
 * @public
 * @class ReflectionMaterial
 * @extends Material
 */

export class ReflectionMaterial extends Material {

  /**
   * ReflectionMaterial class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    super(ctx, { type, ...initialState })
  }
}
