'use strict'

/**
 * Module dependencies.
 */

import { Command } from './command'
import { incrementStat } from '../stats'

import coalesce from 'defined'

export const kFogColor = [1.0, 0.0, 1.0, 1.0]

export class Fog extends Command {

  constructor(ctx, initialState = {}) {
    console.log('yes i am a constructor')
    incrementStat('fog')
    super(update)

    /**
     * Injected material uniforms.
     */

    const {uniforms = new FogUniforms(ctx, initialState)} = initialState
    // console.log('uniforms', uniforms)

    const {fogState = new FogState(ctx, initialState)} = initialState
    // console.log('fogState', fogState)

    const injectContext = ctx.regl({
      // ...fogState,
      uniforms,
    })

    // fog update function
    function update(state, block) {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      fogState.update({
        ...initialState,
        ...state,
      })

      injectContext(block)

      return this
    }
  }
}

export class FogState {
  constructor(ctx, initialState = {}) {
    console.log('FogState')
    Object.assign(this, {
      color: kFogColor,
      near: 1.0,
      far: 2000.0,
      ...initialState
    })
  }
}

export class FogUniforms {
  constructor(ctx, initialState = {}) {
    console.log('FogUniforms')
    // if (null == initialState.color) {
    //   initialState.fog = {}
    // }

    // this['fog.color'] = [0.6,0.3,0.5,1.0]

    this['fog.color'] = ({fog = initialState.fog}) => {
      debugger
      console.log('inside fog this.color')
      // console.log('coalesce(fog, kFogColor)', coalesce(fog, kFogColor))
      console.log('fog', fog)
      return coalesce(fog, kFogColor)
    }

    this['fog.near'] = 1.0

    this['fog.far'] = 2000.0
  }
}