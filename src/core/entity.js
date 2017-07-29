import { Command } from './command'

/**
 * An Entity is a command that injects a context with a unique ID. State
 * is not preserved, but rather just provided. The current and previous states
 * are captured and provided to an optional update function given to the
 * constructor of this class. Basically, this class just constructs a command
 * function that accepts some input, passes it to an optional update function,
 * and then injects a regl context. The context just defines an `entityID`
 * property. Most classes inherit from Component, which inherits Entity.
 */

let entityCount = 0
export class Entity extends Command {
  static id() { return ++ entityCount }
  constructor(ctx, update) {
    const id = Entity.id()
    const context = ctx.regl({context: {entityID: () => id}})
    let currentState = {}
    let previousState = null
    super((state, block) => {
      if ('function' == typeof state) {
        block = state;
        state = {}
      }
      state = 'object' == typeof state && state ? state : {}
      block = 'function' == typeof block ? block : function() {}
      previousState = { ...currentState }
      currentState = { ...state }
      context(currentState, (...args) => {
        if ('function' == typeof update) {
          update(currentState, () => block(...args), previousState)
        } else {
          block(...args)
        }
      })
    })
  }
}
