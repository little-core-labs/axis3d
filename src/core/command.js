import { assignTypeName } from './types'

let CORE_COMMAND_NEXT_ID = 0x0

export class Command extends Function {
  static id() { return CORE_COMMAND_NEXT_ID ++ }
  static count() { return CORE_COMMAND_NEXT_ID }
  static codegen(fn) {
    if ('function' != typeof fn) {
      throw new TypeError("Expecting a function.")
    }
    return `return (${String(fn)}).apply(this, arguments);`
  }

  constructor(fn) {
    if ('function' != typeof fn) {
      throw new TypeError("Command constructor expects a function.")
    }
    // initialize underlying function wrap
    super(Command.codegen(function wrap(fn) {
      return fn.apply(fn, Array.prototype.slice.call(arguments, 1))
    }))
    const exec = (...args) => this(fn, ...args)
    const id = Command.id()
    this.constructor = exec.constructor = Command
    return Object.assign(exec, {'this': this, id})
  }
}
