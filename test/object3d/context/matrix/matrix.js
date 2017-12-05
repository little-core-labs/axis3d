import { MissingContextError, BadArgumentError } from '../../../../lib/errors'
import { sharedContext as ctx, hasDiff } from '../../../utils'
import { Object3DMatrixContext } from '../../../../lib/object3d/context/matrix'
import * as defaults from '../../../../lib/object3d/defaults'
import isTypedArray from 'is-typedarray'
import mat4 from 'gl-mat4'
import quat from 'gl-quat'
import test from 'tape'

test("Object3DMatrixContext is 'function'",
  ({ok, end}) => {
    ok('function' == typeof Object3DMatrixContext)
    end()
  })


test("Object3DMatrixContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DMatrixContext(ctx),
      "Object3DMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DMatrixContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DMatrixContext(ctx),
      "Object3DMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DMatrixContext(ctx: undefined|null) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DMatrixContext(), MissingContextError,
      "Object3DMatrixContext without arguments throws 'BadArgumentError'.")

    throws(() => Object3DMatrixContext(null), BadArgumentError,
      "Object3DMatrixContext with null argument throws 'BadArgumentError'.")
    end()
  })


test("Object3DMatrixContext(ctx: Array) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DMatrixContext(Array()), BadArgumentError,
      "Object3DMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DMatrixContext(ctx: Function) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DMatrixContext(Function()), BadArgumentError,
      "Object3DMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DMatrixContext(ctx: Number) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DMatrixContext(Number()), BadArgumentError,
      "Object3DMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DMatrixContext(ctx: Context, initialState: Number|Boolean|String) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DMatrixContext(ctx, 1), BadArgumentError,
      "Object3DMatrixContext with invalid initial state object as number throws 'BadArgumentError'.")

    throws(() => Object3DMatrixContext(ctx, true), BadArgumentError,
      "Object3DMatrixContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    throws(() => Object3DMatrixContext(ctx, "string"), BadArgumentError,
      "Object3DMatrixContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    end()
  })


test("Object3DMatrixContext(ctx: Context) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DMatrixContext(ctx),
       "Object3DMatrixContext constructor returns function.")
    end()
  })


test("Object3DMatrixContext(ctx: Context, initialState: Object) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DMatrixContext(ctx, {}),
       "Object3DMatrixContext constructor returns function.")
    end()
  })


test("Object3DMatrixContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DMatrixContext(ctx), "Without error.")
    end()
  })


test("Object3DMatrixContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DMatrixContext(ctx), "Without error.")
    end()
  })

test("Object3DMatrixContext(ctx: Context) exposes localMatrix and " +
  "transformMatrix context variables.",
  ({ok, plan, end}) => {
    plan(6)
    const context = Object3DMatrixContext(ctx)
    context(({localMatrix, transformMatrix}) => {

      ok(localMatrix, "localMatrix context variable is defined.")
      ok(isTypedArray(localMatrix), "localMatrix context variable is typed array.")
      ok(16 == localMatrix.length, "localMatrix context variable has 16 components.")

      ok(transformMatrix, "transformMatrix context variable is defined.")
      ok(isTypedArray(transformMatrix), "transformMatrix context variable is an array.")
      ok(16 == transformMatrix.length, "transformMatrix context variable has 16 components.")

    })
    end()
  })

test("Object3DMatrixContext(ctx: Context) computes localMatrix and transformMatrix " +
  "correctly.",
  ({ok, plan, end}) => {
    plan(6)
    const args = {
      position: [1, 2, 3],
      scale: [2, 2, 2],
      rotation: quat.setAxisAngle([], [1, 0, 0], Math.PI)
    }

    const expected = {
      localMatrix: new Float32Array(16),
      transformMatrix: new Float32Array(16)
    }

    mat4.identity(expected.localMatrix)
    mat4.identity(expected.transformMatrix)

    mat4.scale(expected.localMatrix,
      mat4.fromRotationTranslation([], args.rotation, args.position),
      args.scale)

    mat4.copy(expected.transformMatrix, expected.localMatrix)

    Object3DMatrixContext(ctx)(args, ({localMatrix, transformMatrix}) => {
      ok(false == hasDiff(localMatrix, expected.localMatrix), "loalMatrix value computed correctly.")
      ok(false == hasDiff(transformMatrix, expected.transformMatrix), "transformMatrix value computed correctly.")

      mat4.multiply(expected.transformMatrix, transformMatrix, localMatrix)
      Object3DMatrixContext(ctx)(args, ({localMatrix, transformMatrix}) => {
        ok(false == hasDiff(localMatrix, expected.localMatrix), "Scoped localMatrix value computed correctly.")
        ok(false == hasDiff(transformMatrix, expected.transformMatrix), "Scoped transformMatrix value computed correctly.")

        mat4.multiply(expected.transformMatrix, transformMatrix, localMatrix)
        Object3DMatrixContext(ctx)(args, ({localMatrix, transformMatrix}) => {
          ok(false == hasDiff(localMatrix, expected.localMatrix), "Nested scoped localMatrix value computed correctly.")
          ok(false == hasDiff(transformMatrix, expected.transformMatrix), "Nested scoped transformMatrix value computed correctly.")
        })
      })
    })
    end()
  })
