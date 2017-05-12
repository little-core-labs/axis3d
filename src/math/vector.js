'use strict'
/**

 * Module dependencies.
 */

import { define, isArrayLike } from '../utils'
import * as VectorSwizzleMap from './vector_swizzle_map'

import getPermutations from'get-unique-permutations'
import coalesce from 'defined'
import window from 'global/window'

/** @virtual {TypedArray} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray */

const TypedArray = Object.getPrototypeOf(Float32Array.prototype).constructor

/**
 * Vector swizzle component permutations cache local storage string name.
 * @private
 */

const kPermutationsCacheStringName = 'axis3d:vector:permutations:cache'

/**
 * Cached computed vector component permutations.
 * @private
 */

const permutationsCache = {}

/**
 * The Vector class represents the base class for various vector
 * types.
 *
 * @public
 * @abstract
 * @class Vector
 * @extends Array
 */

export class Vector {

  /**
   * Vector class constructor.
   *
   * @public
   * @constructor
   * @param {...Mixed} input
   */

  constructor(...input) {
    if (
      isArrayLike(input[0]) ||
      input[0] instanceof Vector ||
      input[0] instanceof TypedArray
    ) {
      input = input[0]
    }

    let elements = null

    if (input.every((i) => i instanceof TypedArray)) {
      elements = new Float32Array([
        ...input.reduce((x, y) => x.concat([...y]), [])
      ])
    } else if (input instanceof TypedArray) {
      elements = input
    } else {
      elements = new Float32Array([...input])
    }

    define(this, 'elements', { get: () => elements })

    for (let i = 0; i < elements.length; ++i) {
      define(this, i, {
        enumerable: true,
        get: () => elements[i],
        set: (v) => {
          elements[i] = v
          this.onchange(i, v)
        },
      })
    }

    if ('function' == typeof this.constructor.swizzles) {
      let permutations = []
      if (permutationsCache[this.constructor.name]) {
        permutations = permutationsCache[this.constructor.name]
      } else {
        for (const swizzle of this.constructor.swizzles()) {
          permutations.push(...getPermutations(swizzle))
        }
      }

      // update cache with permutations
      permutationsCache[this.constructor.name] = Object.assign(
        permutationsCache[this.constructor.name] || [],
        permutations)


      for (const permutation of permutations) {
        const identifier = permutation.join('')

        if (this.hasOwnProperty(identifier)) {
          continue
        }

        define(this, identifier, {
          get: () => {
            const values = []
            for (const component of permutation) {
              values.push(this[component])
            }

            if (/Vector/.test(this.constructor.name)) {
              switch (values.length) {
                case 4: return new Vector4(...values)
                case 3: return new Vector3(...values)
                case 2: return new Vector2(...values)
                case 1: return new Vector1(...values)
              }
            } else {
              return new this.constructor(...values)
            }
          }
        })
      }
    }
  }

  /**
   * Abstract onchange callback
   *
   * @public
   * @abstract
   * @method
   * @param {Number} index
   * @param {Mixed} value
   */

  onchange(index, value) {}


  /**
   * Vector length getter.
   *
   * @public
   * @accessor
   * @type {Number}
   */

  get length() { return this.elements.length }

  /**
   * Set components-wise values
   *
   * @public
   * @method
   * @param {...Mixed|Vector} args
   * @return {Vector}
   */

  set(...args) {
    if (
      isArrayLike(args[0]) ||
      args[0] instanceof Vector ||
      args[0] instanceof TypedArray
    ) {
      return this.set(...args[0])
    }
    for (let i = 0 ; i < args.length; ++i) {
      this[i] = coalesce(args[i], this[i])
    }
    return this
  }

  /**
   * Get value from internal elements array at
   * a specified offset.
   *
   * @public
   * @method
   * @param {Number} offset
   * @return {Mixed|null}
   */

  get(offset) {
    return this.elements[offset || 0] || 0
  }

  /**
   * Converts the vector into
   * a normal Array.
   *
   * @public
   * @method
   * @return {Array}
   */

  toArray() {
    return [...this.elements]
  }

  /**
   * Returns a JSON serializable value.
   *
   * @public
   * @method
   * @return {Array}
   */

  toJSON() {
    return this.toArray()
  }

  /**
   * Returns the underlying vector
   * array value.
   *
   * @public
   * @method
   * @return {Float64Array}
   */

  valueOf() {
    return this.elements
  }

  /**
   * Iterator protocol implementation.
   *
   * @public
   * @method
   * @implements Symbol.iterator
   * @return {Object}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols}
   */

  [Symbol.iterator]() {
    return this.toArray()[Symbol.iterator]()
  }
}

// given a Vector some array functionality
Object.setPrototypeOf(Vector.prototype, Array.prototype)

/**
 * The Vector2 class represents a vector with one components.
 *
 * @public
 * @class Vector1
 * @implements Vector
 * @extends Vector
 */

export class Vector1 extends Vector {

  /**
   * Vector1 class constructor.
   *
   * @public
   * @constructor
   * @param {Mixed} x
   */

  constructor(x = 0) {
    super(x)
  }

  static swizzles() {
    return VectorSwizzleMap.Vector
  }
}

/**
 * The Vector2 class represents a vector with two components.
 *
 * @public
 * @class Vector2
 * @implements Vector
 * @extends Vector
 */

export class Vector2 extends Vector {

  /**
   * Vector2 class constructor.
   *
   * @public
   * @constructor
   * @param {Mixed} x
   * @param {Mixed} y
   */

  constructor(x = 0, y = 0) {
    super(x, y)
  }

  static swizzles() {
    return VectorSwizzleMap.Vector
  }

  get x() { return this[0] }
  set x(x) { return this[0] = x }

  get y() { return this[1] }
  set y(y) { return this[1] = y }

}

/**
 * The Vector3 class represents a vector with two components.
 *
 * @public
 * @class Vector3
 * @implements Vector
 * @extends Vector2
 */

export class Vector3 extends Vector {

  /**
   * Vector3 class constructor.
   *
   * @public
   * @constructor
   * @param {Mixed} x
   * @param {Mixed} y
   * @param {Mixed} z
   */

  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z)
  }

  static swizzles() {
    return VectorSwizzleMap.Vector
  }

  get x() { return this[0] }
  set x(x) { return this[0] = x }

  get y() { return this[1] }
  set y(y) { return this[1] = y }

  get z() { return this[2] }
  set z(z) { return this[2] = z }

  get r() { return this[0] }
  set r(r) { return this[0] = r }

  get g() { return this[1] }
  set g(g) { return this[1] = g }

  get b() { return this[2] }
  set b(b) { return this[2] = b }
}

/**
 * The Vector4 class represents a vector with two components.
 *
 * @public
 * @class Vector4
 * @implements Vector
 * @extends Vector
 */

export class Vector4 extends Vector {

  /**
   * Vector4 class constructor.
   *
   * @public
   * @constructor
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @param {Number} w
   */

  constructor(x = 0, y = 0, z = 0, w = 0) {
    super(x, y, z, w)
  }

  static swizzles() {
    return VectorSwizzleMap.Vector
  }

  get x() { return this[0] }
  set x(x) { return this[0] = x }

  get y() { return this[1] }
  set y(y) { return this[1] = y }

  get z() { return this[2] }
  set z(z) { return this[2] = z }

  get w() { return this[3] }
  set w(w) { return this[3] = w }

  get r() { return this[0] }
  set r(r) { return this[0] = r }

  get g() { return this[1] }
  set g(g) { return this[1] = g }

  get b() { return this[2] }
  set b(b) { return this[2] = b }

  get a() { return this[3] }
  set a(a) { return this[3] = a }
}
