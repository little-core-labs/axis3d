import { DynamicValue } from './gl'
import { Command } from './command'

let entityCount = 0

export class Entity extends Command {
  static id() { return ++ entityCount }
  static defaults() { return {} }

  static compose(ctx, entities) {
    return new Entity(ctx, (state, block) => {
      walk(entities.slice().concat(block))
      function walk(entities) {
        const entity = entities.shift()
        if ('function' == typeof entity) {
          entity(state, () => { walk(entities) })
        } else { walk(entities) }
      }
    })
  }

  constructor(ctx, initialState = {}, update) {
    if ('function' == typeof initialState) {
      update = initialState
      initialState = {}
    }
    const context = ctx.regl({context: new EntityContext(ctx, initialState)})
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
      context(currentState, (...args) => {
        if ('function' == typeof update) {
          update(currentState, block, previousState)
        } else {
          block(...args)
        }
      })
    })
  }
}

export class EntityContext extends DynamicValue {
  constructor(ctx, initialState = {}, id = Entity.id()) {
    super(ctx, initialState, {
      ...initialState.context,
      entityID() { return id }
    })
  }
}
