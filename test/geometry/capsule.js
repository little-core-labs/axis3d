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
  plan(11)

  if ('function' == typeof CapsuleGeometry) {
    pass('is function.')
  }

  const defaultCapsule = { flatten: false,
                           radius: 1,
                           height: 0.5,
                           segments: 12,
                           resolution: 24 }

  const nullCapsule = createCapsuleGeometry(null)
  deepEqual(defaultCapsule,
            nullCapsule,
            'creates default Capsule if null is passed in as argument.')

  const noopCapsule = createCapsuleGeometry(noop)
  deepEqual(defaultCapsule,
            noopCapsule,
            'creates default Capsule if function is passed in as argument.')

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

  const anotherCapsule = createCapsuleGeometry({ radius: 3,
                                                 height: 13,
                                                 segments: 23,
                                                 resolution: 34 })
  deepEqual(3,
            anotherCapsule.radius,
            'assigns radius.')
  deepEqual(13,
            anotherCapsule.height,
            'assigns height.')
  deepEqual(23,
            anotherCapsule.segments,
            'assigns segments.')
  deepEqual(34,
            anotherCapsule.resolution,
            'assigns resolution.')

  end()
})
