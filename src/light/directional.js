'use strict'

import {
  incrementStat
} from '../stats'

import {
  LightCommand
} from './light'

import {
  DirectionalLight as type
} from './types'

module.exports = exports = (...args) => new DirectionalLightCommand(...args)
export const kMaxDirectionalLights = 32
export class DirectionalLightCommand extends LightCommand {
  constructor(ctx, initialState = {}) {
    incrementStat('DirectionalLight')
    super(ctx, {
      ...initialState,
      intensity: 5,
      radius: 80,
      type,
    })
  }
}
