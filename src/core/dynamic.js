import coalesce from 'defined'

export class DynamicValue {
  static createCounter() {
    return new DynamicValueCounter()
  }

  static pluck(scope, property, key, ...defaultValues) {
    let value = undefined
    if (scope && null != scope[property]) {
      value = null != key ? scope[property][key] : scope[property]
    }
    return DynamicValue.primitive(coalesce(value, ...defaultValues))
  }

  static primitive(v) {
    let value = v
    if (null == v) { value = undefined }
    if ('object' == typeof v) {
      const hasLength = 'number' == typeof v.length
      const hasIterator = 'function' == typeof v[Symbol.iterator]
      // array
      if (hasLength) {
        if (hasIterator) { value = [...v] }
        else { value = Array(v.length).fill(0).map((_, i) => v[i]) }
      }
      // object
      else {
        value = Object.assign({}, v)
      }
    }
    return value
  }

  constructor(ctx, initialState = {}, props = {}) {
    const define = (k, v, def) => Object.defineProperty(this, k, {
      enumerable: false, get: () => v || def
    })
    define('ctx', ctx, {})
    define('valueState', {}, {})
    define('initialState', initialState, {})
    this.set(props)
  }

  set(name, value) {
    if (name && 'object' == typeof name) {
      const descriptors = Object.getOwnPropertyDescriptors(name)
      for (const key in descriptors) {
        if (null == name[key]) { continue }
        this.valueState[key] = name[key]
        try {
          Object.defineProperty(this, key, {
            enumerable: true,
            get: () => this.valueState[key] || this.initialState[key] || null,
            set:  (v) => this.valueState[key] = v
          })
        } catch (e) { }
      }
    } else if ('string' == typeof name && null != value) {
      this.valueState[name] = value
      try {
        Object.defineProperty(this, name, {
          enumerable: true,
          set:  (v) => this.valueState[name] = v,
          get: () => {
            if ('function' == typeof value) {
              return (ctx, args) => {
                if (null == args) { args = {} }
                if ('object '== typeof args) {
                  return value(ctx, extend(true, {}, initialState, args))
                } else {
                  return value(ctx, args)
                }
              }
            } else {
              return DynamicValue.primitive(
                this.valueState[name] ||
                this.initialState[name]
              ) || null
            }
          },
        })
      } catch(e) {}
    }
    this.purge()
    return this
  }

  unset(name) {
    if ('string' == typeof name) {
      delete this[name]
    }
    return this
  }

  purge() {
    for (const key in this) {
      if (null == this[key]) {
        try { delete this[key] }
        catch (err) { }
      }
    }
    return this
  }
}

export class DynamicValueCounter {
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

  sumSetForContext(ctx) {
    return this.getSetForContext(ctx).size()
  }

  listSetForContext(ctx) {
    return [ ...this.getSetForContext(ctx) ]
  }

  list() {
    return [ ...this.contexts ]
  }
}
