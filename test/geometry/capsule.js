'use strict'

/**
 * Module dependencies.
 */

import Geometry from '../../src/core/geometry'
import { CapsuleGeometry } from '../../src/geometry/capsule'
import test from 'tape'

const noop = () => void 0
const createCapsuleGeometry = (o) => {
  return new CapsuleGeometry(o)
}


test('new CapsuleGeometry(opts) -> Function', ({
  deepEqual,
  assert,
  throws,
  plan,
  pass,
  end
}) => {
  plan(10)

  if ('function' == typeof CapsuleGeometry) {
    pass('is function.')
  }

  const capsule = createCapsuleGeometry(null)
  deepEqual({ flatten: false,
              radius: 1,
              height: 0.5,
              segments: 12,
              resolution: 24 },
            capsule,
            'creates default Capsule if null is passed in as argument.')

  throws(() => { createCapsuleGeometry({radius: 'foo'}) },
    TypeError,
    'throws TypeError when `radius` is not a number.')

  throws(() => { createCapsuleGeometry({height: '1'}) },
        TypeError,
        'throws TypeError when `height` is not a number.')

  throws(() => { createCapsuleGeometry({segments: 'foo'}) },
    TypeError,
    'throws TypeError when `segments` is not a number.')

  throws(() => { createCapsuleGeometry({resolution: '24'}) },
        TypeError,
        'throws TypeError when `resolution` is not a number.')

  const anotherCapsule = createCapsuleGeometry({radius: 3, resolution: 34})
  deepEqual(3,
            anotherCapsule.radius,
            'assigns radius.')
  deepEqual(0.5,
            anotherCapsule.height,
            'assigns height.')
  deepEqual(12,
            anotherCapsule.segments,
            'assigns segments.')
  deepEqual(34,
            anotherCapsule.resolution,
            'assigns resolution.')

  end()
})
