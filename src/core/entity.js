'use strict'

/**
 * Module dependencies.
 */
import { Command } from './command'

let entityCount = 0

export class Entity extends Command {

  /**
   * Return next entity id
   */
  static id() { return ++ entityCount }

  /**
   * Entity class constructor.
   */
  constructor(ctx, initialState = {}, update) {
    const id = Entity.id()
    const context = new EntityContext(ctx, initialState, id)
    const injectContext = ctx.regl({context})
    super((state, block) => {
      // ensure correct values
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = 'object' == typeof state && state ? state : {}
      block = 'function' == typeof block ? block : function() {}
      Object.assign({}, initialState, state)
      //injectContext(state, () => {
        update(state, block)
      //})
    })
  }
}

export class EntityContext {
  constructor(ctx, initialState = {}, id) {
    if ('context' in initialState) {
      Object.assign(this, initialState.context)
    }
    Object.assign(this, {entityID: id})
  }
}
