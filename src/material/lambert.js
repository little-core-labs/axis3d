'use strict'

/**
 * Module dependencies.
 */

import { LambertMaterialType as type } from './types'
import { kMaxDirectionalLights } from '../light/directional'
import { kMaxAmbientLights } from '../light/ambient'
import { kMaxPointLights } from '../light/point'
import { isArrayLike } from '../utils'
import * as lightTypes from '../light/types'
import { Vector } from '../math/vector'
import { Color } from '../core/color'

import { DirectionalLight } from '../light/directional'
import { AmbientLight } from '../light/ambient'
import { PointLight } from '../light/point'

import {
  MaterialUniforms,
  MaterialContext,
  MaterialState,
  Material,
} from '../core/material'

import coalesce from 'defined'

/**
 * Default material albedo.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultLambertMaterialAlbedo = 0.8

/**
 * Default material roughness.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultLambertMaterialRoughness = 0.8

/**
 * Default material emissive color.
 *
 * @public
 * @const
 * @type {Color}
 */

export const kDefaultLambertMaterialEmissiveColor =
  new Color('black')

/**
 * Default material ambient color.
 *
 * @public
 * @const
 * @type {Color}
 */

export const kDefaultLambertMaterialAmbientColor =
  new Color(0.2*255, 0.2*255, 0.2*255)

/**
 * LambertMaterial class
 *
 * @public
 * @class LambertMaterial
 * @extends Material
 */

export class LambertMaterial extends Material {

  /**
   * LambertMaterial class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
  */

  constructor(ctx, initialState = {}) {
    const {
      uniforms = new LambertMaterialUniforms(ctx, initialState)
    } = initialState
    super(ctx, { type, ...initialState, uniforms })
  }
}

/**
 * LambertMaterialContext class.
 *
 * @public
 * @class LambertMaterialContext
 * @extends MaterialContext
 */

export class LambertMaterialContext extends MaterialContext {

  /**
   * LambertMaterialContext class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    super(ctx, initialState)
  }
}

/**
 * LambertMaterialUniforms class.
 *
 * @public
 * @class LambertMaterialUniforms
 * @extends MaterialUniforms
 */

export class LambertMaterialUniforms extends MaterialUniforms {

  /**
   * LambertMaterialUniforms class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    super(ctx, initialState)

    /**
     * Lights that affect a lambert matertial.
     *
     * @private
     */

    const lightContext = [
      DirectionalLight.contextEntry(),
      AmbientLight.contextEntry(),
      PointLight.contextEntry(),

      ...(initialState.lightContext || [])
    ]

    for (let light of lightContext) {
      this.setLightsInContext(light)
    }

    /**
     * Material roughness.
     *
     * @public
     * @type {Number}
     */

    this['material.roughness'] = ({}, {roughness} = {}) => {
      return coalesce(
        roughness,
        initialState.roughness,
        kDefaultLambertMaterialRoughness)
    }

    /**
     * Material emissive color.
     *
     * @public
     * @type {Color|Array<Number>}
     */

    this['material.emissive'] = ({}, {emissive} = {}) => {
      return [
        ...coalesce(
          emissive,
          initialState.emissive,
          kDefaultLambertMaterialEmissiveColor)
      ]
    }

    /**
     * Material albedo.
     *
     * @public
     * @type {Number}
     */

    this['material.albedo'] = ({}, {albedo} = {}) => {
      return coalesce(
        albedo,
        initialState.albedo,
        kDefaultLambertMaterialAlbedo)
    }

    /**
     * Material ambient color.
     *
     * @public
     * @type {Color|Array<Number>}
     */

    this['material.ambient'] = ({}, {ambient} = {}) => {
      return [
        ...coalesce(
          ambient,
          initialState.ambient,
          kDefaultLambertMaterialAmbientColor)
      ]
    }

    /**
     * Total ambient light count.
     *
     * @public
     * @type {Number}
     */

    this['lightContext.ambient.count'] = ({lights}) => {
      const {AmbientLightType} = lightTypes
      const count = lights
        .filter(Boolean)
        .filter((l) => l.type == AmbientLightType)
        .length
      return count
    }

    /**
     * Total directional light count.
     *
     * @public
     * @type {Number}
     */

    this['lightContext.directional.count'] = ({lights}) => {
      const {DirectionalLightType} = lightTypes
      const count = lights
        .filter(Boolean)
        .filter((l) => l.type == DirectionalLightType)
        .length
      return count
    }

    /**
     * Total point light count.
     *
     * @public
     * @type {Number}
     */

    this['lightContext.point.count'] = ({lights}) => {
      const {PointLightType} = lightTypes
      const count = lights
        .filter(Boolean)
        .filter((l) => l.type == PointLightType)
        .length
      return count
    }
  }

  /**
   * Sets a lights in shader light context uniform at
   * identifier with a type and defaults.
   *
   * @protected
   */

  setLightsInContext({identifier, type, max, defaults}) {
    for (let i = 0; i < max; ++i) {
      const key = `lightContext.${identifier}.lights[${i}]`
      const set = (property, fallback) => {
        Object.assign(this, {
          [`${key}.${property}`]({lights}, args = {}) {
            const light = lights.filter((l) => type == l.type)[i]
            let value =
              light
              ? coalesce(light[property], args[property], fallback)
              : fallback

            if (value instanceof Vector) { value = [ ...value ] }
            else if (isArrayLike(value)) { value = [ ...value ] }
            return value
          }
        })
      }

      for (let key in defaults) {
        set(key, defaults[key])
      }
    }
  }
}
