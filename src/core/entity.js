'use strict'

import { Command } from './command'

let entityCount = 0

export class Entity extends Command {
  static id() { return ++ entityCount }
  constructor(ctx, initialState = {}, update) {
    if ('function' == typeof initialState) {
      update = initialState
      initialState = {}
    }

    const id = Entity.id()
    const context = new EntityContext(ctx, initialState, id)
    const injectContext = ctx.regl({context})
    let currentState = { ...initialState }
    let previousState = null
    super((state, block) => {
      if ('function' == typeof state) {
        block = state
        state = {}
      }
      state = 'object' == typeof state && state ? state : {}
      block = 'function' == typeof block ? block : function() {}
      previousState = { ...currentState }
      currentState = { ...initialState, ...state }
      injectContext(currentState, () => {
        update(currentState, block, previousState)
      })
    })
  }
}

export class EntityContext {
  constructor(ctx, initialState = {}, id = 0) {
    Object.assign(this, {entityID: id})
    if ('context' in initialState ) {
      Object.assign(this, { ...initialState.context })
    }
  }
}
