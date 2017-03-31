'use strict'

/**
 * Internal stats object.
 *
 * @type {Object<String, Array<Stat>>}
 * @private
 */

const stats = {}

/**
 * Creates a named stats list, if it does not exists.
 *
 * @public
 * @function
 * @param {!String} name
 * @return {Array}
 * @throws StatNameError
 */

export function createStatList(name) {
  if ('string' != typeof name) {
    throw new StatNameError(name)
  } else if (null == stats[name]) {
    stats[name] = []
  }
  return stats[name]
}

/**
 * Registers a named state with optional information.
 *
 * @public
 * @function
 * @param {!String} name
 * @param {?Mixed} info
 * @return {Stat}
 * @throws StatNameError
 */

export function registerStat(name, info) {
  createStatList(name)
  const stat = new Stat(name, info)
  stats[name].push(stat)
  return stat
}

/**
 * Fetches tail of a named stat and registers a new stat
 * with the tail info incremented if available.
 *
 * @public
 * @function
 * @param {!String} name
 * @param {?Number} inc
 * @return {Number}
 * @throws StatNameError
 */

export function incrementStat(name, inc = 1) {
  createStatList(name)
  const tail = tailStat(name)
  let value = inc
  if (tail) {
    value = (tail.info || 0) + inc
  }
  registerStat(name, value)
  return value
}

/**
 * Fetches tail of a named stat and registers a new stat
 * with the tail info decremented if available.
 *
 * @public
 * @function
 * @param {!String} name
 * @param {?Number} dec
 * @return {Number}
 * @throws StatNameError
 */

export function decrementStat(name, dec = 1) {
  createStatList(name)
  const tail = tailStat(name)
  let value = 0
  if (tail) {
    value = tail.info - dec
  }
  registerStat(name, value)
  return value
}

/**
 * Removes all named stats.
 *
 * @public
 * @function
 * @param {!String} name
 * @throws StatNameError
 */

export function clearStats(name) {
  if ('string' != typeof name) {
    throw new StatNameError(name)
  } else if (stats[name] && Array.isArray(stats[name])) {
    stats[name].splice(stats[name.length])
  } else {
    stats[name] = []
  }
}

/**
 * Returns the first stat by name.
 *
 * @public
 * @function
 * @param {!String} name
 * @return {Mixed}
 * @throws StatNameError
 */

export function headStat(name) {
  if ('string' != typeof name) {
    throw new StatNameError(name)
  } else if (stats[name]) {
    return stats[name][0] || null
  }
  return null
}

/**
 * Returns the first stat by name.
 *
 * @public
 * @function
 * @param {!String} name
 * @return {Mixed}
 * @throws StatNameError
 */

export function tailStat(name) {
  if (stats[name]) {
    const len = stats[name].length || 0
    return stats[name][len - 1] || null
  }
  return null
}

/**
 * Returns an array of stats by name.
 *
 * @public
 * @function
 * @param {!String} name
 * @return {Array|null}
 * @throws StatNameError
 */

export function getStats(name) {
  if ('string' != typeof name) {
    throw new StatNameError(name)
  }
  return stats[name] || null
}

/**
 * The Stat class represents an encapsulation of optional information
 * with a given name and a recorded timstmap.
 *
 * @public
 * @class Stat
 */

export class Stat {

  /**
   * Stat class constructor.
   *
   * @public
   * @constructor
   * @param {!String} name
   * @param {?Mixed} info
   * @throws StatNameError
   */

  constructor(name, info = null) {
    if ('string' != typeof name) {
      throw new StatNameError(name)
    }

    /**
     * The name of the stat.
     *
     * @public
     * @type {String}
     */

    this.name = name

    /**
     * Optional information associated with the stat.
     *
     * @public
     * @type {Mixed}
     */

    this.info = info

    /**
     * Timestamp in milliseconds when the stat was created.
     *
     * @public
     * @type {Number}
     */

    this.timestamp = Date.now()
  }
}

/**
 * StatNameError class.
 *
 * @public
 * @class StatNameError
 * @extends TypeError
 */

export class StatNameError extends TypeError {

  /**
   * StatNameError class constructor.
   *
   * @public
   * @constructor
   * @param {Mixed} name
   */

  constructor(name) {
    super(`Expecting stat name to be a string. Got ${typeof name}`)
  }
}
