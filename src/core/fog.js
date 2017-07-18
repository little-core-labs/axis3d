'use strict'

/**
 * Module dependencies.
 */
import { ShaderUniforms } from './gl'
import { incrementStat } from '../stats'
import { Command } from './command'
import coalesce from 'defined'

export const kFogDefaultDensity = 0.02
export const kFogDefaultColor = [1.0, 1.0, 1.0, 1.0]
export const kDefaultFogType = 'linear'
export const kFogDefaultNear = 1
export const kFogDefaultFar = 1000
export const kFogTypes = ['linear', 'exp', 'exp2']

export class Fog extends Command {
  static types() { return [...kFogTypes] }
  static get Linear() { return kFogTypes.indexOf('linear') }
  static get Exp2() { return kFogTypes.indexOf('exp2') }
  static get Exp() { return kFogTypes.indexOf('exp') }

  constructor(ctx, initialState = {}) {
    incrementStat('fog')
    super(update)

    const {uniforms = new FogUniforms(ctx, initialState)} = initialState
    const {fog = new FogState(ctx, initialState)} = initialState
    const injectContext = ctx.regl({uniforms})

    // fog update function
    function update(state, block) {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      Object.assign(fog, Object.assign(initialState, state))

      injectContext((reglContext) => {
        Object.assign(reglContext, {fog: fog})
        injectContext(block)
      })

      return this
    }
  }
}

export class FogState {
  constructor(ctx, initialState = {}) {
    if ('number' == typeof initialState.type) {
      initialState.type = Fog.types()[initialState.type]
    }
    this.enabled = coalesce(initialState.enabled, true)
    this.density = coalesce(initialState.density, kFogDefaultDensity)
    this.color = coalesce(initialState.color, kFogDefaultColor)
    this.type = Fog.types().indexOf(coalesce(initialState.type, 'linear'))
    this.near = coalesce(initialState.near, kFogDefaultNear)
    this.far = coalesce(initialState.far, kFogDefaultFar)

    initialState.type = this.type

    if (-1 == this.type) {
      throw new TypeError(`Fog(): Unknown fog type ${initialState.type}`)
    }
  }
}

export class FogUniforms extends ShaderUniforms {
  constructor(ctx, initialState) {
    super(ctx)
    this.set({
      'fog.enabled': this.context('fog', 'enabled', false),
      'fog.density': this.context('fog', 'density', 0.02),
      'fog.color': this.context('fog', 'color', [1.0, 1.0, 1.0, 1.0]),
      'fog.type': this.context('fog', 'type', Fog.types().indexOf(kDefaultFogType)),
      'fog.near': this.context('fog', 'near', 1),
      'fog.far': this.context('fog', 'far', 1000),
    })
  }
}
