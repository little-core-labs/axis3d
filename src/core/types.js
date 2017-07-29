'use strict'

const $types = Symbol('types')
const registeredTypes = []

/**
 * Assigns a type name to a given instance of anything.
 *
 * @public
 * @param {Mixed} instance
 * @param {String} typeName
 */

export const assignTypeName = (instance, typeName) => {
  if (null == instance) { return instance }
  if (null == typeName) { typeName = typeof instance }
  if (false == Array.isArray(instance[$types])) {
    instance[$types] = []
  }
  typeName = typeName.toLowerCase()
  instance[$types].unshift(typeName)
  if (-1 == registeredTypes.indexOf(typeName)) {
    registeredTypes.push(typeName)
  }
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
 * Returns a boolean indicating whether a given instance is an
 * instance of a given Parent type. This function is useful for
 * classes that extend the {@link Command} class which only provide
 * functions and cause a natural `instanceof` check to fail.
 *
 * @public
 * @param {Mixed} instance
 * @param {Function} Parent
 * @return {Boolean}
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
