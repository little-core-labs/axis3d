'use strict'

/**
 * Helper function to filter out rgba cute components on
 * a given vector swizzle map.
 *
 * @private
 */

const filterRgba = (vector) => vector
  .map((v) => v.filter((x) => !/[rgba]/.test(x)))
  .filter((v) => v.length)

/**
 * Helper function to filter out xyzw cute components on
 * a given vector swizzle map.
 *
 * @private
 */

const filterXyzw = (vector) => vector
  .map((v) => v.filter((x) => !/[xyzw]/.test(x)))
  .filter((v) => v.length)

/**
 * Returns the ordinal offset of a given
 * swizzle identifier.
 *
 * @public
 * @function
 * @param {String} identifier Swizzle identifier.
 * @return {Number}
 */

export const offsetOf = (identifier) => {
  for (let i = 0; i < offsets.length; ++i) {
    if (offsets[i].indexOf(identifier) > -1) {
      return i
    }
  }
  return -1
}

/**
 * Swizzle identifier ordinal offsets.
 *
 * @public
 * @const
 * @type {Array<Array<String>>}
 */

export const offsets = [
  ['x', 'r'],
  ['y', 'g'],
  ['z', 'b'],
  ['w', 'a'],
]

/**
 * Vector1 class swizzle mapping.
 *
 * @public
 * @const
 * @type {Array<Array<String>>}
 */

export const Vector1 = [ ]

/**
 * Vector2 class swizzle mapping.
 *
 * @public
 * @const
 * @type {Array<Array<String>>}
 */

export const Vector2 = [
  ['x', 'y'],

  ['x', 'x'],
  ['x', 'y'],

  ['y', 'x'],
  ['y', 'y'],

  ['z', 'x'],
  ['z', 'y'],

  ['w', 'x'],
  ['w', 'y'],
]

/**
 * Vector3 class swizzle mapping.
 *
 * @public
 * @const
 * @type {Array<Array<String>>}
 */

export const Vector3 = [
  ['x', 'y', 'z'],

  ['x', 'x', 'x'],
  ['x', 'x', 'y'],
  ['x', 'x', 'z'],

  ['y', 'y', 'x'],
  ['y', 'y', 'y'],
  ['y', 'y', 'z'],

  ['z', 'z', 'x'],
  ['z', 'z', 'y'],
  ['z', 'z', 'z'],

  ['w', 'w', 'x'],
  ['w', 'w', 'y'],
  ['w', 'w', 'z'],

  ['r', 'g', 'b'],

  ['r', 'r', 'r'],
  ['r', 'r', 'g'],
  ['r', 'r', 'b'],

  ['g', 'g', 'r'],
  ['g', 'g', 'g'],
  ['g', 'g', 'b'],

  ['b', 'b', 'r'],
  ['b', 'b', 'g'],
  ['b', 'b', 'b'],

  ['a', 'a', 'r'],
  ['a', 'a', 'g'],
  ['a', 'a', 'b'],
]

/**
 * Vector4 class swizzle mapping.
 *
 * @public
 * @const
 * @type {Array<Array<String>>}
 */

export const Vector4 = [
  ['x', 'y', 'z', 'w'],

  ['x', 'x', 'x', 'x'],
  ['x', 'x', 'x', 'y'],
  ['x', 'x', 'x', 'z'],
  ['x', 'x', 'x', 'w'],

  ['y', 'y', 'y', 'x'],
  ['y', 'y', 'y', 'y'],
  ['y', 'y', 'y', 'z'],
  ['y', 'y', 'y', 'w'],

  ['z', 'z', 'z', 'x'],
  ['z', 'z', 'z', 'y'],
  ['z', 'z', 'z', 'z'],
  ['z', 'z', 'z', 'w'],

  ['w', 'w', 'w', 'x'],
  ['w', 'w', 'w', 'y'],
  ['w', 'w', 'w', 'z'],
  ['w', 'w', 'w', 'w'],

  ['r', 'g', 'b', 'a'],

  ['r', 'r', 'r', 'r'],
  ['r', 'r', 'r', 'g'],
  ['r', 'r', 'r', 'b'],
  ['r', 'r', 'r', 'a'],

  ['g', 'g', 'g', 'r'],
  ['g', 'g', 'g', 'g'],
  ['g', 'g', 'g', 'b'],
  ['g', 'g', 'g', 'a'],

  ['b', 'b', 'b', 'r'],
  ['b', 'b', 'b', 'g'],
  ['b', 'b', 'b', 'b'],
  ['b', 'b', 'b', 'a'],

  ['a', 'a', 'a', 'r'],
  ['a', 'a', 'a', 'g'],
  ['a', 'a', 'a', 'b'],
  ['a', 'a', 'a', 'a'],
]

/**
 * A combination of all vector swizzles.
 *
 * @public
 * @const
 * @type {Array<Array<String>>}
 */

export const Vector = []
  .concat(Vector1)
  .concat(Vector2)
  .concat(Vector3)
  .concat(Vector4)

/**
 * Euler class swizzle mapping. This map
 * extend Vector3 swizzle mapping and removes
 * rgb swizzles.
 *
 * @public
 * @const
 * @type {Array<Array<String>>}
 */

export const Euler = filterRgba(Vector3)

/**
 * Quaternion class swizzle mapping. This map
 * extends Vector swizzle mapping and removes
 * rgba swizzles.
 *
 * @public
 * @const
 * @type {Array<Array<String>>}
 */

export const Quaternion = filterRgba(Vector)

/**
 * Color class swizzle mapping. This map filters xyzw
 * vector component swizzles.
 *
 * @public
 * @const
 * @type {Array<Array<String>>}
 */

export const Color = filterXyzw(Vector)
