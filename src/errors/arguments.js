import { toTypeString } from '../utils'

const kBadIndexArgumentErrorMessage =
  "BadArgumentError(): Expecting first argument index to be a number."

const kBadNameArgumentErrorMessage =
  "BadArgumentError(): Expecting second argument name to be a string."

const kBadExpectedArgumentErrorMessage =
  "BadArgumentError(): Expecting fourth argument name to be a string."

/**
 * The BadArgumentError class represents an error that provides
 * a detailed error message for a value at an argument index in which an
 * expected type is required.
 * @public
 * @class BadArgumentError
 * @extends TypeError
 */
export class BadArgumentError extends TypeError {

  get name() { return this.constructor.name }
  get code() { return this.constructor.name }

  /**
   * BadArgumentError class constructor.
   * @public
   * @constructor
   * @param {Number} index
   * @param {String} name
   * @param {Mixed} value
   * @param {String} expected
   * @throws TypeError
   */
  constructor(index, name, value, expected) {
    if ('number' !== typeof index) {
      throw new TypeError(kBadIndexArgumentErrorMessage)
    } else if ('string' !== typeof name) {
      throw new TypeError(kBadNameArgumentErrorMessage)
    } else if ('string' !== typeof expected) {
      throw new TypeError(kBadExpectedArgumentErrorMessage)
    }

    super(
      `Expecting ${toOrdinalString(index).toLowerCase()} ` +
      `argument ${name} to be ${expected}. Got ${toTypeString(value)} instead.`
    )

    if ('function' == typeof Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new (Error(message)).stack
    }
  }
}

/**
 * Get normalized ordinal value for an index.
 * toOrdinalString(index: Number) -> String
 */
function toOrdinalString(index) {
  switch (index + 1) {
    case 1: return 'First'
    case 2: return 'Second'
    case 3: return 'Third'
    case 4: return 'Fourth'
    case 5: return 'Fifth'
    case 6: return 'Sixth'
    default: return 'Unknown'
  }
}
