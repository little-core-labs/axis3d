'use strict'

import coalesce from 'defined'

export class DynamicValue {
  static createCounter() {
    return new DynamicValueCounter()
  }

  static pluck(scope, property, key, ...defaultValues) {
    let value = undefined
    if (null != scope[property]) {
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

  constructor(ctx, initialState = {}) {
    if ('object' == typeof ctx) {
      Object.defineProperty(this, 'ctx', {enumerable: false, get: () => ctx})
    }
    this.set(initialState)
  }

  set(name, value) {
    if (name && 'object' == typeof name) {
      Object.defineProperties(this, Object.getOwnPropertyDescriptors(name))
    } else if ('string' == typeof name && null != value) {
      this[name] = value
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
        delete this[key]
      }
    }
    return this
  }

  argument(property, key, ...defaultValues) {
    const {pluck} = DynamicValue
    return ({}, args) => pluck(args, property, key, ...defaultValues)
  }

  context(property, key, ...defaultValues) {
    const {pluck} = DynamicValue
    return (ctx) => pluck(ctx, property, key, ...defaultValues)
  }

  contextOrArgument(property, key, ...defaultValues) {
    const {pluck} = DynamicValue
    return (ctx, args) => coalesce(
      pluck(ctx, property, key, undefined),
      pluck(args, property, key, undefined),
      ...defaultValues
    )
  }

  argumentOrContext(property, key, ...defaultValues) {
    return (ctx, args) => coalesce(
      pluck(args, property, key, undefined),
      pluck(ctx, property, key, undefined),
      ...defaultValues
    )
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
