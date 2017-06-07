'use strict'

/**
 * Internal types symbol.
 *
 * @private
 * @type {Symbol}
 */

const $types = Symbol('types')

/**
 * Assigns a type name to a given instance of anything.
 *
 * @public
 * @param {Mixed} instance
 * @param {String} typeName
 */

export const assignTypeName = (instance, typeName) => {
  if (null == instance) { return instance }
  if (null == typeName) { typeName == typeof instance }
  if (false == Array.isArray(instance[$types])) {
    instance[$types] = []
  }
  instance[$types].unshift(typeName)
  return instance
}

/**
 * Returns the string type of an instance of anything.
 *
 * @public
 * @param {Mixed} instance
 * @return {String}
 */

export const typeOf = (instance) => {
  if (null == instance) {
    return typeof instance
  } else if (Array.isArray(instance[$types])) {
    return instance[$types][0]
  } else {
    return typeof instance
  }
}

/**
 */

export const instanceOf = (instance, Parent) => {
  if (null == instance || null == Parent) {
    return false
  } else if (Array.isArray(instance[$types])) {
      return (
         instance[$types].includes(Parent.name.toLowerCase())
      || instance[$types].includes(Parent.name)
      )
  } else {
    return instance instanceof Parent
  }
}
