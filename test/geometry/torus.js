'use strict'

/**
 * Module dependencies.
 */

import { Geometry } from '../../src/core/geometry'
import { TorusGeometry } from '../../src/geometry/torus'

import test from 'tape'

const noop = () => void 0
const createTorusGeometryWithoutNew = (o) => TorusGeometry(o)
const createTorusGeometry = (o) => {
  return new TorusGeometry(o)
}

test('new TorusGeometry(opts) -> Function', ({
  deepEqual,
  assert,
  throws,
  equal,
  plan,
  end
}) => {
  plan(14)

  assert('function' == typeof TorusGeometry)

  throws(() => createTorusGeometryWithoutNew(noop),
        TypeError,
        'throws TypeError when called without new.')

  const defaultTorus = { flatten: false,
                         majorSegments: 32,
                         minorSegments: 64,
                         majorRadius: 1,
                         minorRadius: 0.5,
                         arc: 6.283185307179586 }

  const nullTorus = createTorusGeometry(null)
  deepEqual(nullTorus, defaultTorus,
            'creates default Torus when null is passed in as argument.')

  const noopTorus = createTorusGeometry(noop)
  deepEqual(noopTorus, defaultTorus,
            'creates default Torus when noop is passed in as argument.')

  throws(() => createTorusGeometry({majorSegments: 'null'}),
         TypeError,
         'throws TypeError when `majorSegments` is not a number.'
  )

  throws(() => createTorusGeometry({minorSegments: 'null'}),
         TypeError,
         'throws TypeError when `minorSegments` is not a number.'
  )

  throws(() => createTorusGeometry({majorRadius: 'null'}),
         TypeError,
         'throws TypeError when `majorRadius` is not a number.'
  )

  throws(() => createTorusGeometry({minorRadius: 'null'}),
         TypeError,
         'throws TypeError when `minorRadius` is not a number.'
  )

  const torusArgs = { majorSegments: 82,
                      minorSegments: 84,
                      majorRadius: 81,
                      minorRadius: 0.85,
                      arc: 8*Math.PI }

  const torus = createTorusGeometry(torusArgs)

  assert('object' == typeof torus.complex)

  equal(82, torus.majorSegments, 'assigns majorSegments.')
  equal(84, torus.minorSegments, 'assigns minorSegments.')
  equal(81, torus.majorRadius, 'assigns majorRadius.')
  equal(0.85, torus.minorRadius, 'assigns minorRadius.')
  equal(8*Math.PI, torus.arc, 'assigns arc.')

  end()
})