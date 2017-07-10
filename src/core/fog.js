'use strict'

/**
 * Module dependencies.
 */

import { Command } from './command'
import { incrementStat } from '../stats'

import coalesce from 'defined'

export const kFogColor = [1.0, 1.0, 1.0, 1.0]

export const kFogAmount = 0.02

export class Fog extends Command {

  constructor(ctx, initialState = {}) {
    incrementStat('fog')
    super(update)

    const {fogState = new FogState(ctx, initialState)} = initialState
    const injectContext = ctx.regl({})

    // fog update function
    function update(state, block) {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      Object.assign(fogState, Object.assign(initialState, state))

      injectContext((reglContext) => {
        Object.assign(reglContext, {fog: fogState})
        injectContext(block)
      })

      return this
    }
  }
}

export class FogState {
  constructor(ctx, initialState = {}) {
    this.enabled = true
    this.color = coalesce(initialState.color, kFogColor)
    this.amount = coalesce(initialState.amount, kFogAmount)
  }
}
