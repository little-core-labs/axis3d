'use strict'

import * as lightTypes from '../light/types'
import coalesce from 'defined'

import {
  LambertMaterialCommand
} from './lambert'

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
  PhongMaterial as type
} from './types'

module.exports = exports = (...args) => new PhongMaterialCommand(...args)
export class PhongMaterialCommand extends LambertMaterialCommand {
  constructor(ctx, initialState = {}) {
    let {
      shininess: initialShininess = 20,
      specular: initialSpecular = [0.0, 0.0, 0.0, 1],
    } = initialState

    const uniforms = {
      'material.shininess': ({}, {shininess = initialShininess} = {}) => {
        return shininess
      },

      'material.specular': ({}, {specular = initialSpecular} = {}) => {
        return specular
      },

    }

    const shaderDefines = { }

    super(ctx, {
      ...initialState,
      shaderDefines,
      uniforms,
      type: initialState.type || type,
    })
  }
}
