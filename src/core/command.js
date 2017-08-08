/**
 * A Command extends the Function class by generating Javascript
 * and passing it directly to the Function (super) constructor.
 */
let commandCount = 0
export class Command extends Function {
  static count() { return count }
  static codegen(fn) {
    if ('function' != typeof fn) { throw new TypeError("Expecting a function") }
    else { return `return (${String(fn)}).apply(this, arguments);` }
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
    this.constructor = exec.constructor = Command
    void commandCount ++
    return Object.assign(exec, {'this': this})
  }
}
