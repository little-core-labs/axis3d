import { MissingContextError, BadArgumentError } from '../../../../lib/errors'
import { sharedContext as ctx, hasDiff } from '../../../utils'
import { Object3DRotationMatrixContext } from '../../../../lib/object3d/context/matrix'
import * as defaults from '../../../../lib/object3d/defaults'
import isTypedArray from 'is-typedarray'
import mat4 from 'gl-mat4'
import quat from 'gl-quat'
import test from 'tape'

test("Object3DRotationMatrixContext is 'function'",
  ({ok, end}) => {
    ok('function' == typeof Object3DRotationMatrixContext)
    end()
  })


test("Object3DRotationMatrixContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DRotationMatrixContext(ctx),
      "Object3DRotationMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DRotationMatrixContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DRotationMatrixContext(ctx),
      "Object3DRotationMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DRotationMatrixContext(ctx: undefined|null) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DRotationMatrixContext(), MissingContextError,
      "Object3DRotationMatrixContext without arguments throws 'BadArgumentError'.")

    throws(() => Object3DRotationMatrixContext(null), BadArgumentError,
      "Object3DRotationMatrixContext with null argument throws 'BadArgumentError'.")
    end()
  })


test("Object3DRotationMatrixContext(ctx: Array) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DRotationMatrixContext(Array()), BadArgumentError,
      "Object3DRotationMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DRotationMatrixContext(ctx: Function) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DRotationMatrixContext(Function()), BadArgumentError,
      "Object3DRotationMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DRotationMatrixContext(ctx: Number) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DRotationMatrixContext(Number()), BadArgumentError,
      "Object3DRotationMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DRotationMatrixContext(ctx: Context, initialState: Number|Boolean|String) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DRotationMatrixContext(ctx, 1), BadArgumentError,
      "Object3DRotationMatrixContext with invalid initial state object as number throws 'BadArgumentError'.")

    throws(() => Object3DRotationMatrixContext(ctx, true), BadArgumentError,
      "Object3DRotationMatrixContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    throws(() => Object3DRotationMatrixContext(ctx, "string"), BadArgumentError,
      "Object3DRotationMatrixContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    end()
  })


test("Object3DRotationMatrixContext(ctx: Context) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DRotationMatrixContext(ctx),
       "Object3DRotationMatrixContext constructor returns function.")
    end()
  })


test("Object3DRotationMatrixContext(ctx: Context, initialState: Object) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DRotationMatrixContext(ctx, {}),
       "Object3DRotationMatrixContext constructor returns function.")
    end()
  })


test("Object3DRotationMatrixContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DRotationMatrixContext(ctx), "Without error.")
    end()
  })


test("Object3DRotationMatrixContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DRotationMatrixContext(ctx), "Without error.")
    end()
  })


test("Object3DRotationMatrixContext(ctx: Context) computes " +
  "rotationMatrix from rotation input argument.",
  ({ok, plan, end}) => {
    plan(2)
    const rotation = quat.setAxisAngle([], [0,1,0], Math.PI)
    const expectedRotationMatrix = mat4.identity([])
    mat4.fromQuat(expectedRotationMatrix, rotation)
    Object3DRotationMatrixContext(ctx)({rotation}, ({rotationMatrix}) => {
      ok(isTypedArray(rotationMatrix), "rotationMatrix is typed array.")
      ok(false == hasDiff(rotationMatrix, expectedRotationMatrix),
      "Computed correctly.")
    })
    end()
  })
