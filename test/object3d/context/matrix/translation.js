import { MissingContextError, BadArgumentError } from '../../../../lib/errors'
import { sharedContext as ctx, hasDiff } from '../../../utils'
import { Object3DTranslationMatrixContext } from '../../../../lib/object3d/context/matrix'
import isTypedArray from 'is-typedarray'
import mat4 from 'gl-mat4'
import test from 'tape'

test("Object3DTranslationMatrixContext is 'function'",
  ({ok, end}) => {
    ok('function' == typeof Object3DTranslationMatrixContext)
    end()
  })


test("Object3DTranslationMatrixContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DTranslationMatrixContext(ctx),
      "Object3DTranslationMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTranslationMatrixContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DTranslationMatrixContext(ctx),
      "Object3DTranslationMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTranslationMatrixContext(ctx: undefined|null) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTranslationMatrixContext(), MissingContextError,
      "Object3DTranslationMatrixContext without arguments throws 'BadArgumentError'.")

    throws(() => Object3DTranslationMatrixContext(null), BadArgumentError,
      "Object3DTranslationMatrixContext with null argument throws 'BadArgumentError'.")
    end()
  })


test("Object3DTranslationMatrixContext(ctx: Array) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTranslationMatrixContext(Array()), BadArgumentError,
      "Object3DTranslationMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTranslationMatrixContext(ctx: Function) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTranslationMatrixContext(Function()), BadArgumentError,
      "Object3DTranslationMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTranslationMatrixContext(ctx: Number) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTranslationMatrixContext(Number()), BadArgumentError,
      "Object3DTranslationMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTranslationMatrixContext(ctx: Context, initialState: Number|Boolean|String) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTranslationMatrixContext(ctx, 1), BadArgumentError,
      "Object3DTranslationMatrixContext with invalid initial state object as number throws 'BadArgumentError'.")

    throws(() => Object3DTranslationMatrixContext(ctx, true), BadArgumentError,
      "Object3DTranslationMatrixContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    throws(() => Object3DTranslationMatrixContext(ctx, "string"), BadArgumentError,
      "Object3DTranslationMatrixContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    end()
  })


test("Object3DTranslationMatrixContext(ctx: Context) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DTranslationMatrixContext(ctx),
       "Object3DTranslationMatrixContext constructor returns function.")
    end()
  })


test("Object3DTranslationMatrixContext(ctx: Context, initialState: Object) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DTranslationMatrixContext(ctx, {}),
       "Object3DTranslationMatrixContext constructor returns function.")
    end()
  })


test("Object3DTranslationMatrixContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DTranslationMatrixContext(ctx), "Without error.")
    end()
  })


test("Object3DTranslationMatrixContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DTranslationMatrixContext(ctx), "Without error.")
    end()
  })


test("Object3DTranslationMatrixContext(ctx: Context) computes " +
  "translationMatrix from position input argument.",
  ({ok, plan, end}) => {
    plan(2)
    const position = [1, 2, 3]
    const expectedTranslationMatrix = mat4.identity([])
    mat4.translate(
      expectedTranslationMatrix,
      expectedTranslationMatrix,
      position)
    Object3DTranslationMatrixContext(ctx)({position}, ({translationMatrix}) => {
      ok(isTypedArray(translationMatrix), "translationMatrix is typed array.")
      ok(false == hasDiff(translationMatrix, expectedTranslationMatrix),
      "Computed correctly")
    })
    end()
  })
