import { isIdentityQuaternion, hasDiff } from '../utils'
import * as defaults from '../../lib/object3d/defaults'
import isTypedArray from 'is-typedarray'
import test from 'tape'

test("Object3D defaults",
  ({ok, end}) => {
    ok('object' == typeof defaults, "Is an object.")
    end()
  })

test("Object3D defaults.rotation",
  ({ok, end}) => {
    const {rotation} = defaults
    ok('rotation' in defaults, "Exists in defaults object.")
    ok(isTypedArray(rotation), "Is an array.")
    ok(4 == rotation.length, "Has 4 components.")
    ok(isIdentityQuaternion(rotation), "Is identity quaternion.")
    end()
  })

test("Object3D defaults.position",
  ({ok, end}) => {
    const {position} = defaults
    ok('position' in defaults, "Exists in defaults object.")
    ok(isTypedArray(position), "Is an array.")
    ok(3 == position.length, "Has 3 components.")
    ok(false == hasDiff(position, [0,0,0]), "Is origin vector.")
    end()
  })

test("Object3D defaults.scale",
  ({ok, end}) => {
    const {scale} = defaults
    ok('scale' in defaults, "Exists in defaults object.")
    ok(isTypedArray(scale), "Is an array.")
    ok(3 == scale.length, "Has 3 components.")
    ok(false == hasDiff(scale, [1,1,1]), "Is identity scale vector.")
    end()
  })
