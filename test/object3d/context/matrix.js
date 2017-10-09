import { MissingContextError, BadArgumentError } from '../../../lib/errors'
import { sharedContext as ctx, hasDiff } from '../../utils'
import { Object3DMatrixContext } from '../../../lib/object3d/context/matrix'
import * as defaults from '../../../lib/object3d/defaults'
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

test("Object3DMatrixContext(ctx: Context) exposes matrix and transform "+
  "context variables.",
  ({ok, plan, end}) => {
    plan(6)
    const context = Object3DMatrixContext(ctx)
    context(({matrix, transform}) => {

      ok(matrix, "Matrix context variable is defined.")
      ok(Array.isArray(matrix) || matrix instanceof Float32Array, "Matrix context variable is an array.")
      ok(16 == matrix.length, "Matrix context variable is an array with 16 components.")

      ok(transform, "Transform context variable is defined.")
      ok(Array.isArray(transform) || transform instanceof Float32Array, "Transform context variable is an array.")
      ok(16 == transform.length, "Transform context variable is an array with 16 components.")

    })
    end()
  })

test("Object3DMatrixContext(ctx: Context) computes  matrix and transform " +
  "correctly.",
  ({ok, plan, end}) => {
    plan(6)
    const args = {
      position: [1, 2, 3],
      scale: [2, 2, 2],
      rotation: quat.setAxisAngle([], [1, 0, 0], Math.PI)
    }

    const expected = {
      matrix: new Float32Array(16),
      transform: new Float32Array(16)
    }

    mat4.identity(expected.matrix)
    mat4.identity(expected.transform)

    mat4.scale(expected.matrix,
      mat4.fromRotationTranslation([], args.rotation, args.position),
      args.scale)

    mat4.copy(expected.transform, expected.matrix)

    Object3DMatrixContext(ctx)(args, ({matrix, transform}) => {
      ok(false == hasDiff(matrix, expected.matrix), "Matrix value computed correctly.")
      ok(false == hasDiff(transform, expected.transform), "Transform value computed correctly.")

      mat4.multiply(expected.transform, transform, matrix)
      Object3DMatrixContext(ctx)(args, ({matrix, transform}) => {
        ok(false == hasDiff(matrix, expected.matrix), "Scoped matrix value computed correctly.")
        ok(false == hasDiff(transform, expected.transform), "Scoped transform value computed correctly.")

        mat4.multiply(expected.transform, transform, matrix)
        Object3DMatrixContext(ctx)(args, ({matrix, transform}) => {
          ok(false == hasDiff(matrix, expected.matrix), "Nested scoped matrix value computed correctly.")
          ok(false == hasDiff(transform, expected.transform), "Nested scoped transform value computed correctly.")
        })
      })
    })
    end()
  })
