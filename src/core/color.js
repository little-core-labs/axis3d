'use strict'

/**
 * Module dependencies.
 */

import * as VectorSwizzleMap from '../math/vector_swizzle_map'
import { assignTypeName } from './types'
import { isArrayLike } from '../utils'
import { Command } from './command'
import { Vector4 } from '../math'

import ColorString from 'color-string'
import space from 'color-space'
import clamp from 'clamp'

/**
 * The Color class represents an abstraction around a
 * RGBA color space. The class supports multiple types of
 * inputs including named colors, color space models,
 * RGB[A] variants, and more. This class implements the valueOf()
 * magic method which serializes the object into an integer that
 * represents the RGBA color value. This makes it possible to add,
 * multiply, subtract, and device color values. This module is compatiable
 * with various color module outputs such as
 * {@link https://www.npmjs.com/package/color-string}.
 *
 * Named colors are supported by the
 * {@link https://www.npmjs.com/package/color-name|color-name}
 * module which provide RGB color values defined by
 * {@link https://drafts.csswg.org/css-color/#named-colors|CSSWG#named-colors}.
 * They are exposed by the {@link TBD|color-string} module.
 *
 * Color space conversions to RGB are handled by the
 * {@link https://www.npmjs.com/package/color-space|color-space} module.
 *
 * @public
 * @class Color
 * @extends Vector4
 * @see {@link https://drafts.csswg.org/css-color/#named-colors}
 * @see {@link https://www.npmjs.com/package/color-string}
 * @see {@link https://www.npmjs.com/package/color-space}
 * @see {@link https://www.npmjs.com/package/color-name}
 */

export class Color extends Vector4 {

  /**
   * Color class constructor.
   *
   * @public
   * @constructor
   * @param {...Number|String|Array|Object} input
   */

  constructor(...input) {
    super(0, 0, 0, 0)
    assignTypeName(this, 'color')
    this.set(input)
  }

  /**
   * Color swizzles.
   *
   * @public
   * @static
   * @method
   * @return {Array<Array<String>>}
   */

  static swizzles() {
    return VectorSwizzleMap.Color
  }

  /**
   * Parses color input to derive a rgba color array
   * that is not normalized.
   *
   * @public
   * @static
   * @method
   * @param {Mixed} input
   * @return {Array}
   */

  static parseInput(input) {
    if (isArrayLike(input) && 1 == input.length) {
      input = input[0]
    }

    if ('string' == typeof input) {
      input = Color.parseString(input)
    } else if ('number' == typeof input) {
      input = Color.parseInt(input)
    }

    if (null == input) {
      return null
    }

    let alpha = input[3] || 0
    if (input && 'object' == typeof input) {
      if ('rgb' == input.model) {
        input = input.value
        alpha = input[3]
      } else {
        alpha = input.value ? input.value[3] : input[3]
        if (space[input.model]) {
          try { input = space[input.model].rgb(input.value) }
          catch (e) { console.warn("Color conversation failed", e) }
        }
      }
    }

    return [...[...input].slice(0, 3), alpha || 1]
  }

  /**
   * Parses input string to derive a color model
   *
   * @public
   * @static
   * @param {String} string
   * @return {Object}
   */

  static parseString(string) {
    if ('string' == typeof string) {
      return ColorString.get(string.replace(/\s+/g, '')) || null
    }
    return null
  }

  /**
   * Parses input integer to derive a color model.
   *
   * @public
   * @static
   * @param {String} int
   * @return {Object}
   */

  static parseInt(int) {
    if ('number' == typeof int) {
      let string = Color.parseString(`#${leftpad(0, 6, int.toString('16'))}`)
      if (string) { return string }
      string = Color.parseString(
        `rgba(${clamp(int >> 24 & 0xff, 0, 255)},`+
             `${clamp(int >> 16 & 0xff, 0, 255)},`+
             `${clamp(int >> 8 & 0xff, 0, 255)},`+
             `${clamp(int & 0xff, 0, 1)})`)
      if (string) { return string }
    }
    return null
  }

  /**
   * Vector onchange implementation that ensures
   * values are normalized.
   *
   * @protected
   * @param {Number} index
   * @param {Number} value
   */

  onchange(index, value) {
    const elements = this.elements
    if (3 == index) { // alpha channel
      elements[index] = clamp(value, 0, 1)
    } else if (value > 255) {
      elements[index] = 1
    } else if (value > 1) {
      elements[index] = value/255
    } else if (value < 0) {
      elements[index] = 0
    }
  }

  /**
   * Set color component values.
   *
   * @public
   * @method
   * @param {...Array|Color|Number} input
   * @return {Color}
   */

  set(...input) {
    if (1 == input.length) { input = input[0] }
    input = Color.parseInput(input)
    return input ? super.set(...input) : this
  }

  /**
   * Converts color to a string.
   *
   * @public
   * @method
   * @param {String} which
   * @return {String}
   */

  toString(which = 'hex', denormalize) {
    if ('hex' == which) { denormalize = true }
    const values = this.toArray(denormalize)
    if ('name' == which) { which = 'keyword' }
    return ColorString.to[which](values)
  }

  /**
   * Converts the color to an array of values that are
   * normalized.
   *
   * @public
   * @method
   * @param {Boolean} denormalize
   * @return {Array}
   */

  toArray(denormalize = false) {
    const values = super.toArray()
    if (denormalize) {
      for (let i = 0; i < 3; ++i) {
        values[i] *= 255
        values[i] |= 0
      }
    }
    return [...values]
  }

  /**
   * Returns the hex number value of this color.
   *
   * @public
   * @method
   * @return {Number}
   */

  valueOf() {
    let string = this.toString('hex', true).replace('#', '')
    string = leftpad(0, 6, string)
    return Function(`return 0x${string}`)()
  }
}

/**
 * Left pad string s with character c while
 * string s length is less than n.
 *
 * @private
 */

function leftpad(c, n, s) {
  while (s.length < n) {
    s = `${c}${s}`
  }
  return s
}
