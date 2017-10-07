import coalesce from 'defined'

/**
 * The DynamicValue class represents an object accessor values
 * that can be dynamically accessed while also providing initial,
 * or default state. Function values are evaluated with a regl context
 * object and an arguments object with default state merged in.
 * @public
 * @class DynamicValue
 */
export class DynamicValue {

  /**
   * Creates a new DynamicValueCounter
   * @public
   * @static
   * @method
   * @return {DynamicValueCounter}
   */
  static createCounter() {
    return new DynamicValueCounter()
  }

  /**
   * DynamicValue class constructor.
   * @public
   * @constructor
   * @param {Context} ctx Axis3D context object
   * @param {?(Object)} [initialState = {}] Initial state object
   * @param {?(Object)} [props = {}] Optional initial properties
   * @throws TypeError
   */
  constructor(ctx, initialState = {}, props = {}) {
    if (!ctx || 'object' != typeof ctx || Array.isArray(ctx)) {
      throw new TypeError("DynamicValue(): Expecting context object.")
    }
    if (initialState && 'object' != typeof initialState || Array.isArray(initialState)) {
      throw new TypeError("DynamicValue(): Expecting initial state to be an object.")
    }

    if (props && 'object' != typeof props || Array.isArray(props)) {
      throw new TypeError("DynamicValue(): Expecting props to be an object.")
    }
    const define = (k, v, def) => Object.defineProperty(this, k, {
      enumerable: false, get: () => v || def
    })
    define('ctx', ctx, {})
    define('valueState', {}, {})
    define('initialState', initialState, {})
    this.set(props)
  }

  /**
   * Sets named value by key on instance or an object of
   * key value pairs.
   * @public
   * @method
   * @param {String|Object} key Value name or object
   * @param {?(Mixed)} [value] Any value
   * @return {DynamicValue}
   * @throws TypeError
   */
  set(key, value) {
    if (key && 'object' == typeof key && !Array.isArray(key) && undefined === value) {
      for (const k of Object.getOwnPropertyNames(key)) {
        this.set(k, key[k])
      }
    } else if ('string' == typeof key || 'number' == typeof key) {
      if (undefined === value) {
        throw TypeError("DynamicValue(): Attempting to set undefined value.")
      } else {
        createAccessor(this, key)
        this[key] = value
      }
    } else {
      throw TypeError("DynamicValue(): Attempting to set invalid key value.")
    }
    return this
  }

  /**
   * Unset value by key name.
   * @public
   * @method
   * @param {String} key Value key name
   * @return {DynamicValue}
   */
  unset(key) {
    if ('string' == typeof key && key in this.valueState) {
      delete this.valueState[key]
    }
    return this
  }
}

class DynamicValueCounter {
  constructor() {
    Object.defineProperties(this, {
      contexts: { enumerable: false, value: new Set() },
      map: { enumerable: false, value: new WeakMap() },
    })
  }

  setContext(ctx) {
    const set = this.map.get(ctx) || new Set()
    this.map.set(ctx, set)
    if (false == this.contexts.has(ctx)) {
      this.contexts.add(ctx)
    }
    return this
  }

  getSetForContext(ctx) {
    this.setContext(ctx)
    return this.map.get(ctx)
  }

  addValueForContext(ctx, dynamicValue) {
    const set = this.getSetForContext(ctx)
    if (false == set.has(dynamicValue)) {
      set.add(dynamicValue)
    }
    return this
  }

  listSetForContext(ctx) {
    return [ ...this.getSetForContext(ctx) ]
  }

  list() {
    return [ ...this.contexts ]
  }
}

function getPrimitiveValue(v) {
  let value = v
  if (null == v) { value = undefined }
  if (v && 'object' == typeof v) {
    const hasLength = 'number' == typeof v.length
    const hasIterator = 'function' == typeof v[Symbol.iterator]
    // array
    if (hasLength && hasIterator) {
      value = [...v]
    } else if (hasLength) {
      value = Array(v.length).fill(0).map((_, i) => v[i])
    } else {
      value = Object.assign({}, v)
    }
  }
  return value
}

function createAccessor(object, key) {
  if (!(key in object)) {
    return Object.defineProperty(object, key, {enumerable: true, set, get })
  }

  function set(value) {
    object.valueState[key] = value
  }

  function get() {
    const {valueState, initialState} = object
    const value = coalesce(valueState[key], initialState[key], null)
    return getPrimitiveValue(value)
  }
}
