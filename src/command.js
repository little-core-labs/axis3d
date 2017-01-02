'use strict'

const encode = (fn) => `(${String(fn)})`
const noop = () => this

function commandRunnerWrap(run, ...args) {
  if (this && 'function' == typeof run) {
    return run.apply(run, args)
  }
  return this
}

function codegen(fn) {
  return `
  var fn = ${encode(fn)};
  return fn.apply(this, arguments);
  `
}

module.exports = exports = (...args) => new Command(...args)

export class Command extends Function {
  constructor(run) {
    super(codegen(commandRunnerWrap))
    run = 'function' == typeof run ? run : noop
    const state = {_run: run}
    const exec = (...args) => this(run, ...args)
    const self = this
    return (...args) => exec.call(self, ...args)
  }
}
