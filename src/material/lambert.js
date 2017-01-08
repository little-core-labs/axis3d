'use strict'

import * as lightTypes from '../light/types'
import coalesce from 'defined'

import {
  kMaxAmbientLights
} from '../light/ambient'

import {
  kMaxDirectionalLights
} from '../light/directional'

import {
  kMaxPointLights
} from '../light/point'

import {
  MaterialCommand
} from './material'

import {
  LambertMaterial as type
} from './types'

module.exports = exports = (...args) => new LambertMaterialCommand(...args)
export class LambertMaterialCommand extends MaterialCommand {
  constructor(ctx, initialState = {}) {
    let {
      roughness: initialRoughness = 0.8,
      emissive: initialEmissive = [0, 0, 0, 1],
      ambient: initialAmbient = [0.5, 0.5, 0.5, 1],
      albedo: initialAlbedo = 0.6,
    } = initialState

    const uniforms = {
      'material.roughness': ({}, {roughness = initialRoughness} = {}) => {
        return roughness
      },

      'material.emissive': ({}, {emissive = initialEmissive} = {}) => {
        return emissive
      },

      'material.albedo': ({}, {albedo = initialAlbedo} = {}) => {
        return albedo
      },

      'material.ambient': ({}, {ambient = initialAmbient} = {}) => {
        return ambient
      },

      'lightContext.ambient.count': ({lights}) => {
        const {AmbientLight} = lightTypes
        const count = lights
        .filter(Boolean)
        .filter((l) => l.type == AmbientLight).length
        return count
      },

      'lightContext.directional.count': ({lights}) => {
        const {DirectionalLight} = lightTypes
        const count = lights
        .filter(Boolean)
        .filter((l) => l.type == DirectionalLight).length
        return count
      },

      'lightContext.point.count': ({lights}) => {
        const {PointLight} = lightTypes
        const count = lights
        .filter(Boolean)
        .filter((l) => l.type == PointLight).length
        return count
      },

      ...initialState.uniforms
    }

    const shaderDefines = {
      ...initialState.shaderDefines
    }

    const lightContext = [{
        which: 'ambient',
        type: lightTypes.AmbientLight,
        max: kMaxAmbientLights,
        defaults: {
          color: [0, 0, 0, 0],
          visible: false,
        }
      }, {
        which: 'directional',
        type: lightTypes.DirectionalLight,
        max: kMaxDirectionalLights,
        defaults: {
          position: [0, 0, 0, 0],
          color: [0, 0, 0, 0],
          visible: false,
          radius: 0,
          ambient: 0,
          intensity: 0,
        },
      }, {
        which: 'point',
        type: lightTypes.PointLight,
        max: kMaxPointLights,
        defaults: {
          position: [0, 0, 0, 0],
          color: [0, 0, 0, 0],
          visible: false,
          radius: 0,
          ambient: 0,
          intensity: 0,
        }
      },

      ...(initialState.lightContext || [])
    ]

    for (let light of lightContext) {
      setLightsInContext(light)
    }

    super(ctx, {
      ...initialState,
      shaderDefines,
      uniforms,
      type: initialState.type || type,
    })

    function setLightsInContext({which, type, max, defaults}) {
      for (let i = 0; i < max; ++i) {
        const key = `lightContext.${which}.lights[${i}]`
        const set = (property, fallback) => {
          Object.assign(uniforms, {
            [`${key}.${property}`]({}, args) {
              const { lights = [] } = ctx.reglContext
              const filteredLights = lights
              .filter(Boolean)
              .filter((l) => l.type == type)
              let value = null
              if (filteredLights[i]) {
                value = coalesce(
                  filteredLights[i][property],
                  args[property],
                  fallback)
              } else {
                value = fallback
              }
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
}
