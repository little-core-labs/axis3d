'use strict'

/**
 * Module dependencies.
 */

import { Geometry } from '../../src/core/geometry'
import { PlaneGeometry } from '../../src/geometry/plane'

import test from 'tape'

const noop = () => void 0
const createPlaneGeometry = (o) => {
  return new PlaneGeometry(o)
}

test('new PlaneGeometry(opts) -> Function', ({
  deepEqual,
  assert,
  throws,
  equal,
  plan,
  end
}) => {
  plan(12)

  assert('function' == typeof PlaneGeometry)

  const defaultPlane = { flatten: false,
                         size: { x: 1, y: 1 },
                         quads: false,
                         segments: { x: 5, y: 5 } }

  const nullPlane = createPlaneGeometry(null)
  deepEqual(nullPlane, defaultPlane,
            'creates default Plane when null is passed in as argument.')

  const noopPlane = createPlaneGeometry(noop)
  deepEqual(noopPlane, defaultPlane,
            'creates default Plane when a function is passed in as argument.')

  throws(() => { createPlaneGeometry({size: {x: 'foo', y: 4}}) },
    TypeError,
    'throws TypeError when `size.x` is not a number.'
  )

  throws(() => { createPlaneGeometry({size: {x: 7, y: '4'}}) },
    TypeError,
    'throws TypeError when `size.y` is not a number.'
  )

  throws(() => { createPlaneGeometry({segments: {x: 'foo', y: 4}}) },
    TypeError,
    'throws TypeError when `segments.x` is not a number.'
  )

  throws(() => { createPlaneGeometry({segments: {x: 7, y: '4'}}) },
    TypeError,
    'throws TypeError when `segments.y` is not a number.'
  )

  const planeArgs = { size: {x: 5, y: 18},
                      segments: {x: 56, y: 6},
                      quads: true }

  const anotherPlane = createPlaneGeometry(planeArgs)

  equal(5, anotherPlane.size.x, 'assigns size.x.')
  equal(18, anotherPlane.size.y, 'assigns size.y.')
  equal(56, anotherPlane.segments.x, 'assigns segments.x.')
  equal(6, anotherPlane.segments.y, 'assigns segments.y.')
  equal(true, anotherPlane.quads, 'assigns quads.')

  end()
})