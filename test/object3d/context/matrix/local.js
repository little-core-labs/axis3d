import { MissingContextError, BadArgumentError } from '../../../../lib/errors'
import { sharedContext as ctx, hasDiff } from '../../../utils'
import * as defaults from '../../../../lib/object3d/defaults'
import isTypedArray from 'is-typedarray'
import mat4 from 'gl-mat4'
import quat from 'gl-quat'
import test from 'tape'

import {
  Object3DTranslationMatrixContext,
  Object3DScaleMatrixContext,
  Object3DRotationMatrixContext,
  Object3DLocalMatrixContext,
} from '../../../../lib/object3d/context/matrix'

test("Object3DLocalMatrixContext is 'function'",
  ({ok, end}) => {
    ok('function' == typeof Object3DLocalMatrixContext)
    end()
  })


test("Object3DLocalMatrixContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DLocalMatrixContext(ctx),
      "Object3DLocalMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DLocalMatrixContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DLocalMatrixContext(ctx),
      "Object3DLocalMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DLocalMatrixContext(ctx: undefined|null) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DLocalMatrixContext(), MissingContextError,
      "Object3DLocalMatrixContext without arguments throws 'BadArgumentError'.")

    throws(() => Object3DLocalMatrixContext(null), BadArgumentError,
      "Object3DLocalMatrixContext with null argument throws 'BadArgumentError'.")
    end()
  })


test("Object3DLocalMatrixContext(ctx: Array) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DLocalMatrixContext(Array()), BadArgumentError,
      "Object3DLocalMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DLocalMatrixContext(ctx: Function) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DLocalMatrixContext(Function()), BadArgumentError,
      "Object3DLocalMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DLocalMatrixContext(ctx: Number) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DLocalMatrixContext(Number()), BadArgumentError,
      "Object3DLocalMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DLocalMatrixContext(ctx: Context, initialState: Number|Boolean|String) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DLocalMatrixContext(ctx, 1), BadArgumentError,
      "Object3DLocalMatrixContext with invalid initial state object as number throws 'BadArgumentError'.")

    throws(() => Object3DLocalMatrixContext(ctx, true), BadArgumentError,
      "Object3DLocalMatrixContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    throws(() => Object3DLocalMatrixContext(ctx, "string"), BadArgumentError,
      "Object3DLocalMatrixContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    end()
  })


test("Object3DLocalMatrixContext(ctx: Context) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DLocalMatrixContext(ctx),
       "Object3DLocalMatrixContext constructor returns function.")
    end()
  })


test("Object3DLocalMatrixContext(ctx: Context, initialState: Object) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DLocalMatrixContext(ctx, {}),
       "Object3DLocalMatrixContext constructor returns function.")
    end()
  })


test("Object3DLocalMatrixContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DLocalMatrixContext(ctx), "Without error.")
    end()
  })


test("Object3DLocalMatrixContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DLocalMatrixContext(ctx), "Without error.")
    end()
  })

test("Object3DLocalMatrixContext(ctx: Context) computes localMatrix from " +
  "translationMatrix, rotationMatrix, and scaleMatrix",
  ({ok, plan, end}) => {
    plan(2)
    const translationContext = Object3DTranslationMatrixContext(ctx)
    const rotationContext = Object3DRotationMatrixContext(ctx)
    const scaleContext = Object3DScaleMatrixContext(ctx)
    const localContext = Object3DLocalMatrixContext(ctx)

    const position = [1,2,3]
    const scale = [2,2,2]
    const rotation = quat.setAxisAngle([], [1, 0, 0], Math.PI)

    const expectedLocalMatrix = mat4.identity([])
    mat4.translate(expectedLocalMatrix, expectedLocalMatrix, position)
    mat4.multiply(expectedLocalMatrix, expectedLocalMatrix, mat4.fromQuat([], rotation))
    mat4.scale(expectedLocalMatrix, expectedLocalMatrix, scale)

    translationContext({position}, () => {
      rotationContext({rotation}, () => {
        scaleContext({scale}, () => {
          localContext(({localMatrix}) => {
            ok(isTypedArray(localMatrix), "localMatrix is typed array.")
            ok(false == hasDiff(localMatrix, expectedLocalMatrix),
            "Computed correctly.")
          })
        })
      })
    })
    end()
  })
