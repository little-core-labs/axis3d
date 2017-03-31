'use strict'

/**
 * Module dependencies.
 */

import { FlatMaterialType as type } from './types'
import { Material } from '../core/material'

/**
 * FlatMaterial class represents a basic material that is not affected
 * by light.
 *
 * @public
 * @class FlatMaterial
 * @extends Material
 */

export class FlatMaterial extends Material {

  /**
   * FlatMaterial class constructor.
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
