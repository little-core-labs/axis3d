import { Command } from './command'

/**
 * An Entity is a command that injects a context with a unique ID. State
 * is not preserved, but rather just provided. The current and previous states
 * are captured and provided to the scope block function given to the intance
 * entity function. The previous state is exposed as a property on the curren
 * state object. Basically, this class just constructs a command function
 * that accepts some input, injects a regl context, and passes it to an optional
 * block function. The context just defines an `entityID` property. Most
 * classes inherit from Component, which inherits Entity.
 */
let entityCount = 0
export class Entity extends Command {
  static id() { return ++ entityCount }
  constructor(ctx) {
    const id = Entity.id()
    const injectContext = ctx.regl({context: {entityID: () => id}})
    super((state, block) => {
      if ('function' == typeof state) { block = state; state = {} }
      state = 'object' == typeof state && state ? state : {}
      block = 'function' == typeof block ? block : function() {}
      injectContext(state, block)
    })
  }
}
