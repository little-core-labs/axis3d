'use strict'

/**
 * Module symbols.
 */

import {
  $ctx,
  $run,
  $ref,
} from './symbols'

const encode = (fn) => `(${String(fn)})`
const noop = () => this

function commandRunnerWrap(ctx, run, ...args) {
  if (this && 'function' == typeof run) {
    return run.apply(run, [ctx, ...args])
  }
  return this
}

/**
 * Command class.
 *
 * @public
 */

export class Command extends Function {

  /**
   * Generates code executed in an
   * isolated context.
   *
   * @static
   * @param {Function} fn
   * @return {String}
   */

  static codegen(fn) {
    return `
    var fn = ${encode(fn)};
    return fn.apply(this, arguments);
    `
  }

  /**
   * Command class constructor.
   * Assigns a command runner and returns
   * a command function.
   *
   * @constructor
   * @param {Function} run
   */

  constructor(run) {
    super(Command.codegen(commandRunnerWrap))
    run = 'function' == typeof run ? run : noop
    const state = {[$run]: run}
    const ctx = this[$ctx] = new CommandContext(this, state)
    const exec = (...args) => this(ctx, run, ...args)
    const self = this
    return (...args) => exec.call(self, ...args)
  }
}

/**
 * CommandContext class.
 *
 * @public
 */

export class CommandContext {
  constructor(cmd, state) {
    this[$ref] = cmd
    Object.assign(this, state || {})
  }

  get ref() {
    return this[$ref]
  }
}
