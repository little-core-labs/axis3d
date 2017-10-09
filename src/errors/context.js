/**
 * The MissingContextError class represents an error that
 * provides information about a component, or construct that
 * requires a Context instance, but was not provided it. The
 * constructor to this class accepts a label used in the error
 * message
 * @public
 * @class MissingContextError
 * @extends TypeError
 */
export class MissingContextError extends TypeError {

  get name() { return this.constructor.name }
  get code() { return this.constructor.name }

  /**
   * MissingContextError class constructor.
   * @public
   * @constructor
   * @param {?(String)} label
   */
  constructor(label) {
    super(`Missing context object for ${label || 'Unknown'}.`)
    if ('function' == typeof Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new (Error(message)).stack
    }
  }
}
