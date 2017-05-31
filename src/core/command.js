'use strict'

/**
 * Next available Command ID represented
 * as an integer.
 */

let CORE_COMMAND_NEXT_ID = 0x0

/**
 * The Command class is the base type for all functional units in Axis3D.
 * A Command is a direct descendant of the Function type.
 *
 * @public
 * @abstract
 * @class Command
 * @extends Function
 */

export class Command extends Function {

  /**
   * Returns the next Command ID
   *
   * @public
   * @method
   * @static
   * @return {Number}
   */

  static id() {
    return CORE_COMMAND_NEXT_ID ++
  }

  /**
   * Returns the count of Commands created.
   *
   * @public
   * @method
   * @static
   * @return {Number}
   */

  static count() {
    return CORE_COMMAND_NEXT_ID
  }

  /**
   * Returns a string suitable for execution as the body of
   * a function passed to the Function contructor.
   *
   * @protected
   * @static
   * @method
   * @param {Function} fn
   * @return {String}
   * @throws TypeError
   */

  static codegen(fn) {
    if ('function' != typeof fn) {
      throw new TypeError("Expecting a function.")
    }
    return `return (${String(fn)}).apply(this, arguments);`
  }

  /**
   * Command class constructor.
   *
   * @public
   * @constructor
   * @param {Function} fn
   * @throws TypeError
   */

  constructor(fn) {
    if ('function' != typeof fn) {
      throw new TypeError("Command constructor expects a function.")
    }
    // initialize underlying function wrap
    super(Command.codegen(function wrap(fn) {
      return fn.apply(fn, Array.prototype.slice.call(arguments, 1))
    }))
    const self = this
    const exec = (...args) => this(fn, ...args)
    const id = Command.id()
    return Object.assign((...args) => exec.call(self, ...args), {
      ['this']: self, id
    })
  }
}
