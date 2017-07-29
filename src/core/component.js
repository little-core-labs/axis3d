import { Entity } from './entity'

/**
 * A Component is an Entity that composes one or more components and functions
 * into a self-contained entity that is invokable like any command function.
 * An initial or default state can be given which is injected into the block
 * context object each call.
 */
export class Component extends Entity {
  static defaults() { return { } }

  static compose(...components) {
    if (Array.isArray(components[0])) { components = components[0] }
    components = Array.isArray(components) ? components : []
    return (state, block) => {
      walk(components.slice().concat(block))
      function walk(components) {
        const component = components.shift()
        if ('function' == typeof component) {
          component(state, () => { walk(components.slice()) })
        } else { walk(components.slice()) }
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
    Object.assign(initialState, Component.defaults(), initialState)
    children = Component.compose(children)
    super(ctx, (state, block) => {
      children({ ...initialState, ...state }, block)
    })
  }
}
