import { MissingContextError, BadArgumentError } from '../../../../lib/errors'
import { sharedContext as ctx, hasDiff } from '../../../utils'
import { Object3DScaleMatrixContext } from '../../../../lib/object3d/context/matrix'
import * as defaults from '../../../../lib/object3d/defaults'
import isTypedArray from 'is-typedarray'
import mat4 from 'gl-mat4'
import test from 'tape'

test("Object3DScaleMatrixContext is 'function'",
  ({ok, end}) => {
    ok('function' == typeof Object3DScaleMatrixContext)
    end()
  })


test("Object3DScaleMatrixContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DScaleMatrixContext(ctx),
      "Object3DScaleMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DScaleMatrixContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DScaleMatrixContext(ctx),
      "Object3DScaleMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DScaleMatrixContext(ctx: undefined|null) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DScaleMatrixContext(), MissingContextError,
      "Object3DScaleMatrixContext without arguments throws 'BadArgumentError'.")

    throws(() => Object3DScaleMatrixContext(null), BadArgumentError,
      "Object3DScaleMatrixContext with null argument throws 'BadArgumentError'.")
    end()
  })


test("Object3DScaleMatrixContext(ctx: Array) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DScaleMatrixContext(Array()), BadArgumentError,
      "Object3DScaleMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DScaleMatrixContext(ctx: Function) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DScaleMatrixContext(Function()), BadArgumentError,
      "Object3DScaleMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DScaleMatrixContext(ctx: Number) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DScaleMatrixContext(Number()), BadArgumentError,
      "Object3DScaleMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DScaleMatrixContext(ctx: Context, initialState: Number|Boolean|String) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DScaleMatrixContext(ctx, 1), BadArgumentError,
      "Object3DScaleMatrixContext with invalid initial state object as number throws 'BadArgumentError'.")

    throws(() => Object3DScaleMatrixContext(ctx, true), BadArgumentError,
      "Object3DScaleMatrixContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    throws(() => Object3DScaleMatrixContext(ctx, "string"), BadArgumentError,
      "Object3DScaleMatrixContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    end()
  })


test("Object3DScaleMatrixContext(ctx: Context) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DScaleMatrixContext(ctx),
       "Object3DScaleMatrixContext constructor returns function.")
    end()
  })


test("Object3DScaleMatrixContext(ctx: Context, initialState: Object) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DScaleMatrixContext(ctx, {}),
       "Object3DScaleMatrixContext constructor returns function.")
    end()
  })


test("Object3DScaleMatrixContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DScaleMatrixContext(ctx), "Without error.")
    end()
  })


test("Object3DScaleMatrixContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DScaleMatrixContext(ctx), "Without error.")
    end()
  })


test("Object3DScaleMatrixContext(ctx: Context) computes " +
  "scaleMatrix from scale input argument.",
  ({ok, plan, end}) => {
    plan(2)
    const scale = [1, 2, 3]
    const expectedScaleMatrix = mat4.identity([])
    mat4.scale(
      expectedScaleMatrix,
      expectedScaleMatrix,
      scale)
    Object3DScaleMatrixContext(ctx)({scale}, ({scaleMatrix}) => {
      ok(isTypedArray(scaleMatrix), "scaleMatrix is typed array.")
      ok(false == hasDiff(scaleMatrix, expectedScaleMatrix),
      "Computed correctly")
    })
    end()
  })
