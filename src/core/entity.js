import { Context } from './context'
import { combine } from 'regl-combine'
import extend from 'extend'

/**
 * Creates a function with initial (default) state that is given
 * to optional components when invoked as default argument state.
 *
 * Entity(ctx, initialState, ...components) -> (args, scope) -> Any
 * Entity(ctx, initialState, [...components]) -> (args, scope) -> Any
 * Entity(ctx, ...components) -> (args, scope) -> Any
 * Entity(ctx, [...components]) -> (args, scope) -> Any
 *
 * @public
 * @function
 * @param {Context} ctx
 * @param {Object} initialState
 * @return {Function}
 */
export function Entity(ctx, initialState, ...components) {
  if (!(ctx instanceof Context)) {
    throw new TypeError("Entity(): Expecting context instance.")
  }

  if (initialState) {
    if (Array.isArray(initialState)) {
      components = initialState
      initialState = {}
    } else if ('function' == typeof initialState) {
      components.unshift(initialState)
    } else if ('object' != typeof initialState) {
      throw new TypeError("Entity(): Expecting initial state to be an object.")
    }
  }

  if (Array.isArray(components[0])) {
    components = components[0]
  }

  initialState = { ...initialState }

  const entityId = generateEntityId()
  const flatComponents = flattenComponents(initialState, components)
  const combinedComponents = combine(ctx.regl, [
    ...flatComponents.components,
    {context: {entityId}},
  ])

  return Object.assign((...args) => {
    return combinedComponents(...parseArguments(initialState, ...args))
  }, { initialState, components, combinedComponents, entityId })
}

/**
 * noop(void) -> void
 */
const noop = () => void 0

/**
 * Generates an unique entity id.
 *
 * generateEntityId() -> Number
 */
let entityCount = 0
function generateEntityId() {
  return ++ entityCount
}

/**
 * Flatten and filter compoments into a single array.
 *
 * flattenComponents(components: [...Function|[Function]) -> [...Function]
 */
function flattenComponents(initialState = {}, ...components){
  components = Array.isArray(components[0]) ? components[0] : components
  return {
    initialState,
    components: components.filter(filter).map(map).reduce(reduce, [])
  }

  function filter(component) {
    return 'function' == typeof component
  }

  function map(component) {
    if ('entityId' in component && Array.isArray(component.components)) {
      if (component.initialState && 'object' == typeof component.initialState) {
        extend(true, initialState, component.initialState)
      }
      return flattenComponents(initialState, component.components).components
    } else {
      return component
    }
  }

  function reduce(components, component) {
    return components.concat(component)
  }
}

/**
 * Normalizes entity invokation arguments.
 * parseArguments(args, scope) -> [Any, Function]
 */
function parseArguments(defaults, args, scope) {
  if (defaults && 'object' == typeof defaults) {
    defaults = Object.assign({}, defaults, args)
  }
  if ('function' == typeof args) {
    if ('function' == typeof scope) {
      args = args()
    } else {
      scope = args;
      args = {}
    }
  } else if (args) {
    if (Array.isArray(args)) {
      args = Object.assign([], args)
    } else if ('object' == typeof args) {
      args = Object.assign({}, args)
    }
  }
  if (null == args) { args = {} }
  if (null == scope) { scope = noop }
  if (args && 'object' == typeof args && !Array.isArray(args)) {
    args = Object.assign({}, args, defaults)
  }
  return [args, scope]
}
