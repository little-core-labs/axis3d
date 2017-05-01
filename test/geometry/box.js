'use strict'

/**
 * Module dependencies.
 */

import { Geometry } from '../../src/core/geometry'
import { BoxGeometry } from '../../src/geometry/box'
import test from 'tape'


let boxCount
const noop = () => void 0
const createBoxGeometryWithoutNew = (o) => BoxGeometry(o)
const createBoxGeometry = (o) => {
  const bx = new BoxGeometry(o)
  ++boxCount
  return bx
}

test('new BoxGeometry(opts) -> Function', ({
  deepEqual,
  assert,
  throws,
  plan,
  pass,
  end
}) => {
  plan(3)

  if ('function' == typeof BoxGeometry) {
    pass('is function.')
  }

  // throws(() => { createBoxGeometry({segments: 'foo'}) },
  //       TypeError,
  //       'throws TypeError when segments is not a number.')

  const nullBox = createBoxGeometry(null)
  deepEqual({
          flatten: false,
          size: { x: 1, y: 1, z: 1 },
          segments: { x: 1, y: 1, z: 1 }
        }, nullBox, 'creates default Box if null is passed in as argument')

  const anotherBox = createBoxGeometry({x: 3})
  deepEqual({
          flatten: false,
          size: { x: 3, y: 1, z: 1 },
          segments: { x: 1, y: 1, z: 1 }
        }, anotherBox, 'creates default Box if incomplete obj is passed in as argument')

  end()
})
