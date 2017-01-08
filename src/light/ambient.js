'use strict'

import {
  incrementStat
} from '../stats'

import {
  LightCommand
} from './light'

import {
  AmbientLight as type
} from './types'

module.exports = exports = (...args) => new AmbientLightCommand(...args)
export const kMaxAmbientLights = 16
export class AmbientLightCommand extends LightCommand {
  constructor(ctx, initialState = {}) {
    incrementStat('AmbientLight')
    super(ctx, {
      ...initialState,
      ambient: 0.01,
      type,
    })
  }
}
