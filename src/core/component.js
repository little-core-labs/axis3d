import { Command } from './command'
import { Entity } from './entity'

/**
 * A Component is a command that composes one or more components and functions
 * into a single function  that is invokable like any command function.
 * An initial or default state can be given which is injected into the block
 * context object each call.
 */
let componentCount = 0
export class Component extends Command {
  static id() { return ++ componentCount }
  static defaults() { return { } }
  static compose(...components) {
    if (Array.isArray(components[0])) { components = components[0] }
    components = Array.isArray(components) ? components : []
    return component
    function component(state, block) {
      if ('function' == typeof state) { block = state; state = {} }
      state = 'object' == typeof state && state ? state : {}
      block = 'function' == typeof block ? block : function() {}
      if (0 == components.length) { return block(state) }
      else { walk(components.slice()) }
      function walk(list) {
        const component = list.shift()
        if ('function' == typeof component) {
          if (list.length) { component(state, () => walk(list)) }
          else if (block != component) { component(state, block) }
        } else { walk(list) }
      }
    }
  }

  constructor(ctx, initialState = {}, ...children) {
    if ('function' == typeof initialState) {
      children.unshift(initialState)
      initialState = {}
    } else if (Array.isArray(initialState)) {
      children = initialState
      initialState = {}
    }
    children = Component.compose(children)
    const entity = new Entity(ctx, initialState)
    const injectContext = ctx.regl({
      context: {
        batchLength: ({batchLength: bl}, {batchLength}) => bl > 1 ? bl : batchLength,
        batchId: ({}, {batchId}) => batchId,
      }
    })
    super((state, block) => {
      let batchLength = 1
      if ('function' == typeof state) { block = state; state = {} }
      state = 'object' == typeof state && state ? state : {}
      block = 'function' == typeof block ? block : function() {}
      if (Array.isArray(state)) {
        state = state.map((s) => ({ ...initialState, ...s }))
        batchLength = state.length
      } else if ('number' == typeof state) {
        batchLength = state
        state = Array(batchLength).fill({ ...initialState })
      } else {
        state = { ...initialState, ...state }
      }
      entity(state, ({}, args, batchId) => {
        injectContext({batchLength, batchId}, () => {
          children(args, block)
        })
      })
    })
  }
}
