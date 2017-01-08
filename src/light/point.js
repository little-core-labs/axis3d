'use strict'

import {
  incrementStat
} from '../stats'

import {
  LightCommand
} from './light'

import {
  PointLight as type
} from './types'

import {
  SphereGeometry
} from '../geometry/sphere'

import {
  Geometry
} from '../geometry/geometry'

import {
  MeshCommand
} from '../mesh'

module.exports = exports = (...args) => new PointLightCommand(...args)
export const kMaxPointLights = 128
export class PointLightCommand extends LightCommand {
  constructor(ctx, initialState = {}) {
    incrementStat('PointLight')

    super(ctx, {
      ...initialState,
      intensity: 0.5,
      ambient: 0.005,
      radius: 0.01,
      type,

      update(state, block) {
        const noop = () => void 0

        if ('function' == typeof state) {
          block = state
          state = {}
        }

        state = state || {}
        block = block || noop

        block()
      }
    })
  }
}
