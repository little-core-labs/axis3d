import { Command } from './command'
import { Entity } from './entity'
import { assign } from '../utils'

/**
 * A Component is a commandthat composes one or more components and functions
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
          else { component(state, block) }
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
    assign(initialState, Component.defaults(), initialState)
    children = Component.compose(children)
    const entity = new Entity(ctx, initialState)
    super((state, block) => {
      if ('function' == typeof state) { block = state; state = {} }
      state = 'object' == typeof state && state ? state : {}
      block = 'function' == typeof block ? block : function() {}
      if (Array.isArray(state)) {
        state = state.map((s) => ({ ...initialState, ...s }))
      } else {
        state = { ...initialState, ...state }
      }
      entity(state, ({}, args, batchID) => {
        children(args, block)
      })
    })
  }
}
