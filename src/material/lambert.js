'use strict'

import { LambertMaterialType as type } from './types'
import { kMaxDirectionalLights } from '../light/directional'
import { kMaxAmbientLights } from '../light/ambient'
import { kMaxPointLights } from '../light/point'
import { isArrayLike } from '../utils'
import { FogUniforms } from '../core/fog'
import * as lightTypes from '../light/types'
import { Vector } from '../core/vector'
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

export const kDefaultLambertMaterialAlbedo = 0.8
export const kDefaultLambertMaterialRoughness = 0.8
export const kDefaultLambertMaterialEmissiveColor = new Color('black')
export const kDefaultLambertMaterialAmbientColor =
  new Color(0.2*255, 0.2*255, 0.2*255)

export class LambertMaterial extends Material {
  constructor(ctx, initialState = {}) {
    const {
      uniforms = new LambertMaterialUniforms(ctx, initialState)
    } = initialState
    super(ctx, { type, ...initialState, uniforms })
  }
}

export class LambertMaterialContext extends MaterialContext {
  constructor(ctx, initialState = {}) {
    super(ctx, initialState)
  }
}

export class LambertMaterialUniforms extends MaterialUniforms {
  constructor(ctx, initialState = {}) {
    super(ctx, initialState)

    const lightContext = [
      ...(initialState.lightContext || []),
      DirectionalLight.contextEntry(),
      AmbientLight.contextEntry(),
      PointLight.contextEntry(),
    ]

    for (let light of lightContext) {
      this.setLightsInContext(light)
    }

    // fog uniform properties
    this.set(new FogUniforms(ctx, initialState))

    // material uniform properties
    this.set({
      'material.roughness': ({}, {roughness} = {}) => coalesce(
        roughness,
        initialState.roughness,
        kDefaultLambertMaterialRoughness
      ),

      'material.emissive': ({}, {emissive} = {}) => [...coalesce(
        emissive,
        initialState.emissive,
        kDefaultLambertMaterialEmissiveColor
      )],

      'material.albedo': ({}, {albedo} = {}) => coalesce(
        albedo,
        initialState.albedo,
        kDefaultLambertMaterialAlbedo
      ),

      'material.ambient': ({}, {ambient} = {}) => [...coalesce(
        ambient,
        initialState.ambient,
        kDefaultLambertMaterialAmbientColor
      )],
    })

    // light context uniform properties
    this.set({
      'lightContext.ambient.count': ({lights}) => {
        const {AmbientLightType} = lightTypes
        const count = lights
          .filter(Boolean)
          .filter((l) => l.type == AmbientLightType)
          .length
        return count
      },

      'lightContext.directional.count': ({lights}) => {
        const {DirectionalLightType} = lightTypes
        const count = lights
          .filter(Boolean)
          .filter((l) => l.type == DirectionalLightType)
          .length
        return count
      },

      'lightContext.point.count': ({lights}) => {
        const {PointLightType} = lightTypes
        const count = lights
          .filter(Boolean)
          .filter((l) => l.type == PointLightType)
          .length
        return count
      },
    })
  }

  setLightsInContext({identifier, type, max, defaults}) {
    for (let i = 0; i < max; ++i) {
      const set = (property, fallback) => {
        const key = `${identifier}Lights[${i}]`
        this.set(`${key}.${property}`, ({lights}, args = {}) => {
            const light = lights.filter((l) => type == l.type)[i]
            let value =
              light
              ? coalesce(light[property], args[property], fallback)
              : fallback
            if (value instanceof Vector) { value = [ ...value ] }
            else if (isArrayLike(value)) { value = [ ...value ] }
            return value
        })
      }

      for (let key in defaults) {
        set(key, defaults[key])
      }
    }
  }
}
