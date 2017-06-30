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

    // fog update function
    function update(state, block) {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      const states = Object.assign(initialState, state)

      fogState.update({
        ...states
      })

      return this
    }
  }
}

export class FogState {
  constructor(ctx, initialState = {}) {
    Object.assign(this, {
      ...initialState
    })

    let fogColor = kFogColor

    let fogAmount = kFogAmount

    let fog = (fogState) => {
      Object.assign(ctx._reglContext, {
        fcolor: fogState.fcolor || fogColor,
        famount: fogState.famount || fogAmount
      })

      return this
    }

    Object.defineProperties(this, {
      ctx: {
        enumerable: false,
        get() { return ctx },
      },

      fog: {
        enumerable: false,
        get() { return fog },
      }
    })
  }

  update(fogState) {
    this.fcolor = fogState.fcolor
    this.famount = fogState.famount
    if ('function' == typeof this.fog) {
      this.fog(this)
    } else {
      throw new TypeError(
      `FogState expects .fog to be a function. `+
      `Got ${typeof this.fog}.`)
    }
  }
}
