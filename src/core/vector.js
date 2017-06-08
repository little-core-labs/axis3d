'use strict'
/**

 * Module dependencies.
 */

import { define, isArrayLike } from '../utils'
import { assignTypeName } from './types'

import getPermutations from 'get-unique-permutations'
import coalesce from 'defined'
import window from 'global/window'

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
    assignTypeName(this, 'vector')

    if (isArrayLike(input[0]) || input[0] instanceof Vector) {
      input = input[0]
    }

    let elements = null

    if (input.every((i) => isArrayLike(i))) {
      elements = new Float32Array([
        ...input.reduce((x, y) => x.concat([].slice.call(y)), [])
      ])
    } else {
      elements = new Float32Array([].slice.call(input))
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

            return new this.constructor(...values)
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
    if (isArrayLike(args[0]) || args[0] instanceof Vector) {
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

// give a Vector some array functionality
Object.setPrototypeOf(Vector.prototype, Array.prototype)
