'use strict'

/**
 * Module dependencies.
 */

import { Object3DContext, Object3D, } from '../../src/core/object3d'
import { sharedContext } from '../utils'

import test from 'tape'

let object3dCount = 0
const createObject3DWithoutNew = (o) => Object3D(sharedContext, o)
const createObject3D = (o) => {
  const obj = new Object3D(sharedContext, o)
  ++object3dCount
  return obj
}

test('new Object3D(ctx, initialState) -> Function', ({
  throws,
  plan,
  pass,
  end
}) => {
  plan(3)

  if ('function' == typeof Object3D) {
    pass('is function.')
  }

  if ('function' == typeof createObject3D()) {
    pass('called with new returns a function.')
  }

  throws(() => createObject3DWithoutNew(),
        TypeError,
        'throws TypeError when called without new.')

  end()
})

test('Object3D.count() -> Number', ({
  plan,
  pass,
  end
}) => {
  plan(3)

  if ('function' == typeof Object3D.count) {
    pass('is function.')
  }

  if ('number' == typeof Object3D.count()) {
    pass('returns a number.')
  }

  if (object3dCount == Object3D.count()) {
    pass('returns correct Object3D instance count.')
  }

  end()
})

test('Object3D.id() -> Number', ({
  plan,
  pass,
  end
}) => {
  plan(2)

  if ('function' == typeof Object3D.id) {
    pass('is function.')
  }

  if ('number' == typeof Object3D.id()) {
    pass('returns a number as an id.')
  }

  end()
})
