'use strict'

/**
 * Module dependencies.
 */

import { LambertMaterial, LambertMaterialUniforms } from './lambert'
import { PhongMaterialType as type } from './types'
import { Color } from '../core/color'

import coalesce from 'defined'

/**
 * Default PhongMaterial specular color.
 *
 * @public
 * @const
 * @type {Color}
 */

export const kDefaultPhongMaterialSpecularColor =
  new Color(0x111111)

/**
 * Default PhongMaterial shininess.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultPhongMaterialShininess = 40

/**
 * PhongMaterial class.
 *
 * @public
 * @class PhongMaterial
 * @extends LambertMaterial
 * @see Material
 */

export class PhongMaterial extends LambertMaterial {
  constructor(ctx, initialState = {}) {
    const {
      uniforms = new PhongMaterialUniforms(ctx, initialState)
    } = initialState
    super(ctx, { type, ...initialState, uniforms })
  }
}

/**
 * PhongMaterialUniforms class.
 *
 * @public
 * @class PhongMaterialUniforms
 * @extends LambertMaterialUniforms
 */

export class PhongMaterialUniforms extends LambertMaterialUniforms {

  /**
   * PhongMaterialUniforms class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    super(ctx, initialState)

    /**
     * Material shininess.
     *
     * @public
     * @type {Number}
     */

    this['material.shininess'] = ({}, {shininess} = {}) => {
      return coalesce(
        shininess,
        initialState.shininess,
        kDefaultPhongMaterialShininess)
    }

    /**
     * Material specularity.
     *
     * @public
     * @type {Color|Array<Number>}
     */

    this['material.specular'] = ({}, {specular} = {}) => {
      return [
        ...coalesce(
          specular,
          initialState.specular,
          kDefaultPhongMaterialSpecularColor)
      ]
    }
  }
}
