import compareFloat from 'float-equal'
import isTypedArray from 'is-typedarray'
import { Context } from '../lib/core/context'
import quat from 'gl-quat'

export const sharedContext = new Context()
export const xtest = (name, test) => {
  setTimeout(() => console.warn('\tSkipping test %s', name))
}

export const isIdentityQuaternion = (q) => {
  return false === hasDiff(q, quat.identity([]))
}

export const hasDiff = (a, b) => {
  if (
    (isTypedArray(a) || Array.isArray(a)) &&
    (isTypedArray(b) || Array.isArray(b))
  ) {
    if (isTypedArray(a) && !isTypedArray(b)) {
      b = new a.constructor(b)
    } else if (!isTypedArray(a) && isTypedArray(b)) {
      a = new b.constructor(a)
    }
    return ! a.every((x, i) => compareValue(x, b[i]))
  } else if (a && 'object' == typeof a && b && 'object' == typeof b) {
    return ! Object.keys(a).every((k) => compareValue(a[k], b[k]))
  } else {
    return ! compareValue(a, b)
  }
}

function compareValue(a, b) {
  if ('number' == typeof a && 'number' == typeof b) {
    return compareFloat(a, b)
  } else {
    return a == b
  }
}
