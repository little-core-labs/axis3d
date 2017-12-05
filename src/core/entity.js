import { MissingContextError, BadArgumentError } from '../errors'
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
 * @throws MissingContextError
 * @throws BadArgumentError
 */
export function Entity(ctx, initialState, ...components) {
  if (undefined === ctx) {
    throw new MissingContextError('Entity')
  } else if (null === ctx || 'object' != typeof ctx || Array.isArray(ctx)) {
    throw new BadArgumentError(0, 'ctx', ctx, 'object')
  }

  if (initialState) {
    if (Array.isArray(initialState)) {
      components = initialState
      initialState = {}
    } else if ('function' == typeof initialState) {
      components.unshift(initialState)
    } else if ('object' != typeof initialState) {
      throw new BadArgumentError(1, 'initialState', initialState, 'object')
    }
  }

  if (Array.isArray(components[0])) {
    components = components[0]
  }

  initialState = { ...initialState }

  const entityId = generateEntityId()
  const entityContext = ctx.regl({context: new EntityContext(entityId)})
  const flatComponents = flattenComponents(initialState, components)
  const combinedComponents = combine(ctx.regl, flatComponents.components)

  return Object.assign(function (...vargs) {
    const [kargs, next] = parseArguments(initialState, ...vargs)
    return entityContext(kargs, ({}, args, batchId) => {
      return combinedComponents(args, (ctx, cargs) => {
        return next(ctx, cargs, batchId)
      })
    })
  }, {
    get isEntity() { return true },
    combinedComponents,
    initialState,
    components,
    entityId,
  })
}

/**
 * Entity context object wrapper.
 */
class EntityContext {
  constructor(entityId) {
    Object.assign(this, {
      entityId() { return entityId },
      batchId({}, args, batchId) {
        return batchId
      }
    })
  }
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
    if (component.isEntity && Array.isArray(component.components)) {
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
