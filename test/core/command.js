'use strict'

/**
 * Module dependencies.
 */

import { Command } from '../../src/core/command'
import test from 'tape'

let commandCount = 0
const noop = () => void 0
const createCommandWithoutNew = (f) => Command(f)
const createCommand = (f) => {
  const cmd = new Command(f)
  ++commandCount
  return cmd
}

test('new Command(fn) -> Function', ({
  assert,
  throws,
  plan,
  pass,
  end
}) => {
  plan(5)

  if ('function' == typeof Command) {
    pass('is function.')
  }

  if ('function' == typeof createCommand(noop)) {
    pass('called with new returns a function.')
  }

  throws(() => { createCommandWithoutNew(noop) },
        TypeError,
        'throws TypeError when called without new.')

  throws(() => { assert('function' == typeof createCommand('foo')) },
         TypeError,
         'throws TypeError when called with argument that is not a function.')

  do {
    let called = false
    void createCommand(() => { called = true })()
    if (called) {
      pass('calls runner argument when called as a function.')
    }
  } while(0)

  end()
})

test('Command.count() -> Number', ({
  plan,
  pass,
  end
}) => {
  plan(3)

  if ('function' == typeof Command.count) {
    pass('is function.')
  }

  if ('number' == typeof Command.count()) {
    pass('returns a number.')
  }

  if (commandCount == Command.count()) {
    pass('returns correct Command instance count.')
  }

  end()
})

test('Command.id() -> Number', ({
  plan,
  pass,
  end
}) => {
  plan(2)

  if ('function' == typeof Command.id) {
    pass('is function.')
  }

  if ('number' == typeof Command.id()) {
    pass('returns a number as an id.')
  }

  end()
})
