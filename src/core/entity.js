'use strict'

import { Command } from './command'

let entityCount = 0

export class Entity extends Command {
  static id() { return ++ entityCount }
  constructor(ctx, initialState = {}, update) {
    const id = Entity.id()
    const context = new EntityContext(ctx, initialState, id)
    const injectContext = ctx.regl({context})
    let currentState = { ...initialState }
    super((state, block) => {
      if ('function' == typeof state) {
        block = state
        state = {}
      }
      state = 'object' == typeof state && state ? state : {}
      block = 'function' == typeof block ? block : function() {}
      currentState = { ...currentState, ...state }
      injectContext(currentState, () => {
        update(currentState, block)
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
