'use strict'

/**
 * Module dependencies.
 */

import { Object3DContext, Object3D, } from '../../src/core/object3d'
import { Vector3, Quaternion } from '../../src/math'
import { sharedContext } from '../utils'
import * as stats from '../../src/stats'

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
  assert,
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
  plan(4)

  if ('function' == typeof Object3D.count) {
    pass('is function.')
  }

  if ('number' == typeof Object3D.count()) {
    pass('returns a number.')
  }

  if (object3dCount == Object3D.count()) {
    pass('returns correct Object3D instance count.')
  }

  if (object3dCount == stats.getStats('Object3D').length) {
    pass('counts correct Object3D instance count in internal stats.')
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

test('Object3D -> Object3DContext with no input', ({
  assert,
  plan,
  end
}) => {
  const object = createObject3D()
  plan(5)
  object(({id, scale, position, rotation, transform}) => {
    assert('number' == typeof id,
           '.id in context should be defined.')

    assert(Array.isArray(scale) && 3 == scale.length,
      '.scale in context should be an array with 3 components.')

    assert(Array.isArray(position) && 3 == position.length,
      '.position in context should be an array with 3 components.')

    assert(Array.isArray(rotation) && 4 == rotation.length,
      '.rotation in context should be an array with 4 components.')

    assert(Array.isArray(transform) && 16 == rotation.length,
      '.transform in context should be an array with 16 components.')
  })
  end()
})

test('Object3D -> Object3DContext .id property honors input', ({
  assert,
  plan,
  end
}) => {
  const object = createObject3D()
  plan(1)
  object({id: 'object'}, ({id}) => {
    assert('object' == id,
    '.id in context honors input.')
  })
  end()
})

test('Object3D -> Object3DContext .scale property honors scalar input', ({
  assert,
  plan,
  end
}) => {
  const object = createObject3D()
  plan(2)
  object({scale: 2}, ({scale}) => {
    assert(Array.isArray(scale) && 3 == scale.length,
      '.scale in context should be an array with 3 components.')

    assert(
       2 == scale[0]
    && 2 == scale[1]
    && 2 == scale[2],
    '.scale in context has scalar value for each component in array.')
  })

  object({scale: {}}, ({scale}) => {
    console.log(scale)
  })
  end()
})

test('Object3D -> Object3DContext .scale property honors scalar input', ({
  assert,
  plan,
  end
}) => {
  const object = createObject3D()
  plan(2)
  object({scale: 2}, ({scale}) => {
    assert(Array.isArray(scale) && 3 == scale.length,
      '.scale in context should be an array with 3 components.')

    assert(
       2 == scale[0]
    && 2 == scale[1]
    && 2 == scale[2],
    '.scale in context has scalar value for each component in array.')
  })
  end()
})
