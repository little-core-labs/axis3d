import { MissingContextError, BadArgumentError } from '../../../lib/errors'
import { sharedContext as ctx, hasDiff } from '../../utils'
import { Object3DTRSContext } from '../../../lib/object3d/context/trs'
import * as defaults from '../../../lib/object3d/defaults'
import isTypedArray from 'is-typedarray'
import test from 'tape'

test("Object3DTRSContext is 'function'",
  ({ok, end}) => {
    ok('function' == typeof Object3DTRSContext)
    end()
  })


test("Object3DTRSContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DTRSContext(ctx),
      "Object3DTRSContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTRSContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DTRSContext(ctx),
      "Object3DTRSContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTRSContext(ctx: undefined|null) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTRSContext(), MissingContextError,
      "Object3DTRSContext without arguments throws 'BadArgumentError'.")

    throws(() => Object3DTRSContext(null), BadArgumentError,
      "Object3DTRSContext with null argument throws 'BadArgumentError'.")
    end()
  })


test("Object3DTRSContext(ctx: Array) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTRSContext(Array()), BadArgumentError,
      "Object3DTRSContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTRSContext(ctx: Function) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTRSContext(Function()), BadArgumentError,
      "Object3DTRSContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTRSContext(ctx: Number) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTRSContext(Number()), BadArgumentError,
      "Object3DTRSContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTRSContext(ctx: Context, initialState: Number|Boolean|String) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTRSContext(ctx, 1), BadArgumentError,
      "Object3DTRSContext with invalid initial state object as number throws 'BadArgumentError'.")

    throws(() => Object3DTRSContext(ctx, true), BadArgumentError,
      "Object3DTRSContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    throws(() => Object3DTRSContext(ctx, "string"), BadArgumentError,
      "Object3DTRSContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    end()
  })


test("Object3DTRSContext(ctx: Context) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DTRSContext(ctx),
       "Object3DTRSContext constructor returns function.")
    end()
  })


test("Object3DTRSContext(ctx: Context, initialState: Object) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DTRSContext(ctx, {}),
       "Object3DTRSContext constructor returns function.")
    end()
  })


test("Object3DTRSContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DTRSContext(ctx), "Without error.")
    end()
  })


test("Object3DTRSContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DTRSContext(ctx), "Without error.")
    end()
  })


test("Object3DTRSContext(ctx: Context) exposes position, rotation, and scale "+
  "context variables with defaults.",
  ({ok, plan, end}) => {
    plan(12) // position, rotation scale (TRS)
    const trs = Object3DTRSContext(ctx)
    trs(({position, rotation, scale}) => {

      ok(position, "Position context variable is defined.")
      ok(isTypedArray(position), "Position context variable is an array.")
      ok(3 == position.length, "Position context variable is an array with 3 components.")
      ok(false == hasDiff(position, defaults.position), "Position context variable has correct default value.")

      ok(scale, "Scale context variable is defined.")
      ok(isTypedArray(scale), "Scale context variable is an array.")
      ok(3 == scale.length, "Scale context variable is an array with 3 components.")
      ok(false == hasDiff(scale, defaults.scale), "Scale context variable has correct default value.")

      ok(rotation, "Rotation context variable is defined.")
      ok(isTypedArray(rotation), "Rotation context variable is an array.")
      ok(4 == rotation.length, "Rotation context variable is an array with 3 components.")
      ok(false == hasDiff(rotation, defaults.rotation), "Rotation context variable has correct default value.")

    })
    end()
  })


test("Object3DTRSContext(ctx: Context) exposes position, rotation, and scale "+
  "with repsect to input arguments.",
  ({ok, plan, end}) => {
    plan(12) // position, rotation scale (TRS)
    const expected = {
      position: [1,2,3], rotation: [1.57,0,0,-1.57], scale: [2,2,2]
    }
    const trs = Object3DTRSContext(ctx)
    trs(expected, ({position, rotation, scale}) => {

      ok(position, "Position context variable is defined.")
      ok(isTypedArray(position), "Position context variable is an array.")
      ok(3 == position.length, "Position context variable is an array with 3 components.")
      ok(false == hasDiff(position, expected.position), "Position context variable has correct value from input arguments.")

      ok(scale, "Scale context variable is defined.")
      ok(isTypedArray(scale), "Scale context variable is an array.")
      ok(3 == scale.length, "Scale context variable is an array with 3 components.")
      ok(false == hasDiff(scale, expected.scale), "Scale context variable has correct value from input arguments.")

      ok(rotation, "Rotation context variable is defined.")
      ok(isTypedArray(rotation), "Rotation context variable is an array.")
      ok(4 == rotation.length, "Rotation context variable is an array with 3 components.")
      ok(false == hasDiff(rotation, expected.rotation), "Rotation context variable has correct value from input arguments.")

    })
    end()
  })


test("Object3DTRSContext(ctx: Context , initialState: Object) uses initial " +
  "state as defaults when called",
  ({ok, plan, end}) => {
    plan(12) // position, rotation scale (TRS)
    const expected = {
      position: [1,2,3], rotation: [1.57,0,0,-1.57], scale: [2,2,2]
    }
    const trs = Object3DTRSContext(ctx, expected)
    trs(({position, rotation, scale}) => {

      ok(position, "Position context variable is defined.")
      ok(isTypedArray(position), "Position context variable is an array.")
      ok(3 == position.length, "Position context variable is an array with 3 components.")
      ok(false == hasDiff(position, expected.position), "Position context variable has correct value from initial state.")

      ok(scale, "Scale context variable is defined.")
      ok(isTypedArray(scale), "Scale context variable is an array.")
      ok(3 == scale.length, "Scale context variable is an array with 3 components.")
      ok(false == hasDiff(scale, expected.scale), "Scale context variable has correct value from initial state.")

      ok(rotation, "Rotation context variable is defined.")
      ok(isTypedArray(rotation), "Rotation context variable is an array.")
      ok(4 == rotation.length, "Rotation context variable is an array with 3 components.")
      ok(false == hasDiff(rotation, expected.rotation), "Rotation context variable has correct value from initial state.")

    })
    end()
  })
