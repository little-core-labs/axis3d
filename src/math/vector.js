'use strict'

/**
 * Module dependencies.
 */

import { define } from '../utils'
import coalesce from 'defined'
import vec4 from 'gl-vec4'
import vec3 from 'gl-vec3'
import vec2 from 'gl-vec2'

/**
 * Vector class.
 *
 * @public
 * @class Vector
 */

export class Vector {

  /**
   * Vector class contructor.
   *
   * @param {...Mixed} input
   */

  constructor(...input) {
    if (1 == input.length && 'object' == typeof input[0]) {
      const tmp = input[0]
      input[0] = tmp.x || tmp[0] || undefined
      input[1] = tmp.y || tmp[1] || undefined
      input[2] = tmp.z || tmp[2] || undefined
      input[3] = tmp.w || tmp[3] || undefined
      input = input.filter((x) => undefined !== x)
    }

    const elements = new Float32Array([...input])
    define(this, 'elements', { get:() => elements })
    const mappings = [
      [0, 1, 2, 3],
      ['x', 'y', 'z', 'w'],
      ['r', 'g', 'b', 'a'],
    ]

    for (let mapping of mappings) {
      for (let i = 0; i < mapping.length; ++i) {
        if (null == elements[i]) { break }
        define(this, mapping[i], {
          enumerable: null != elements[i],
          get: () => elements[i],
          set: (v) => elements[i] = v
        })
      }
    }
  }

  /**
   * Vector length getter.
   *
   * @type {Number}
   * @public
   */

  get length() {
    return this.elements.length
  }

  /**
   * Dummy length setter.
   *
   * @private
   */

  set length(value) {
    void value
  }

  /**
   * Returns a reference to the underlying
   * vector elements.
   *
   * @getter
   * @type {Float64Array}
   */

  get ref() {
    return this.elements
  }

  /**
   * Returns the component count of the vector
   *
   * @getter
   * @type {Number}
   */

  get componentLength() {
    return this.elements.length
  }

  /**
   * Set components-wise values
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @param {Number} w
   * @return {Vector}
   */

  set(x, y, z, w) {
    if (x instanceof Vector) {
      return this.set(x.x, x.y, x.z, x.w)
    }

    // switch fall through component setter
    switch (arguments.length) {
      case 4: this.elements[3] = coalesce(w, this.elements[3]);
      case 3: this.elements[2] = coalesce(z, this.elements[2]);
      case 2: this.elements[1] = coalesce(y, this.elements[1]);
      case 1: this.elements[0] = coalesce(x, this.elements[0]);
    }
    return this
  }

  /**
   * Converts the vector into
   * a normal Array.
   *
   * @return {Array}
   */

  toArray() {
    return [...this.elements]
  }

  /**
   * Returns a JSON serializable value.
   *
   * @return {Array}
   */

  toJSON() {
    return this.toArray()
  }

  /**
   * Returns the underlying vector
   * array value.
   *
   * @return {Float64Array}
   */

  valueOf() {
    return this.elements
  }

  /**
   * Iterator protocol implementation.
   */

  [Symbol.iterator]() {
    return this.toArray()[Symbol.iterator]()
  }
}

/**
 * Instanced x, y, z vectors
 */

export const XVector3 = new Vector(1, 0, 0)
export const YVector3 = new Vector(0, 1, 0)
export const ZVector3 = new Vector(0, 0, 1)
